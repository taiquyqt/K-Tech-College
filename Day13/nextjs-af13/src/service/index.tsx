
import type { Task } from '../types';

const baseUrl = 'https://server.aptech.io';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
});

// Helper function to handle API responses
const handleApiResponse = async (response: Response) => {
  console.log('API Response Status:', response.status);
  console.log('API Response OK:', response.ok);
  console.log('API Response Headers:', Object.fromEntries(response.headers.entries()));
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response:', errorText);
    throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
  }
  
  const data = await response.json();
  console.log('API Response Data:', data);
  return data;
};

export const getTasks = async () => {
  try {
    console.log('🔄 Fetching tasks...');
    console.log('📋 Request URL:', `${baseUrl}/workspaces/tasks`);
    console.log('📋 Request Headers:', getHeaders());
    
    const response = await fetch(`${baseUrl}/workspaces/tasks`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    const data = await handleApiResponse(response);
    
    // Handle different response formats
    if (Array.isArray(data)) {
      console.log('✅ Tasks loaded (direct array):', data.length);
      return data;
    } else if (data && Array.isArray(data.data)) {
      console.log('✅ Tasks loaded (data.data):', data.data.length);
      return data.data;
    } else if (data && Array.isArray(data.tasks)) {
      console.log('✅ Tasks loaded (data.tasks):', data.tasks.length);
      return data.tasks;
    } else {
      console.error('❌ Unexpected response format:', data);
      return [];
    }
  } catch (error) {
    console.error('❌ getTasks error:', error);
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    console.log('🔄 Logging in...');
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    });
    
    const data = await handleApiResponse(response);
    
    // Save token if login successful
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      console.log('✅ Login successful, token saved');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Login error:', error);
    throw error;
  }
};

export const getTaskById = async (id: number) => {
  try {
    console.log('🔄 Fetching task by ID:', id);
    const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    return await handleApiResponse(response);
  } catch (error) {
    console.error('❌ getTaskById error:', error);
    throw error;
  }
};

export const createTask = async (task: Task) => {
  try {
    console.log('🔄 Creating task:', task);
    const response = await fetch(`${baseUrl}/workspaces/tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(task),
    });
    
    return await handleApiResponse(response);
  } catch (error) {
    console.error('❌ createTask error:', error);
    throw error;
  }
};

export const updateTask = async (id: number, task: Task) => {
  try {
    console.log('🔄 Updating task:', id, task);
    const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
      method: 'PATCH',
      headers: getHeaders(), // Use getHeaders() consistently
      body: JSON.stringify(task),
    });
    
    return await handleApiResponse(response);
  } catch (error) {
    console.error('❌ updateTask error:', error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    console.log('🔄 Deleting task:', id);
    const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(), // Use getHeaders() consistently
    });
    
    return await handleApiResponse(response);
  } catch (error) {
    console.error('❌ deleteTask error:', error);
    throw error;
  }
};

export const getTasksByAssignee = async (assigneeId: number): Promise<Task[]> => {
  try {
    console.log('🔄 Fetching tasks by assignee:', assigneeId);
    const response = await fetch(`${baseUrl}/workspaces/tasks/assignee/${assigneeId}`, {
      method: 'GET',
      headers: getHeaders(), // Use getHeaders() consistently
    });
    
    const data = await handleApiResponse(response);
    
    // Handle different response formats
    let tasks: Task[];
    if (Array.isArray(data)) {
      tasks = data;
    } else if (data && Array.isArray(data.tasks)) {
      tasks = data.tasks;
    } else if (data && Array.isArray(data.data)) {
      tasks = data.data;
    } else {
      console.error('❌ getTasksByAssignee response is not an array:', data);
      return [];
    }
    
    console.log('✅ Tasks by assignee loaded:', tasks.length);
    return tasks;
  } catch (error) {
    console.error('❌ getTasksByAssignee error:', error);
    throw error;
  }
};

// Utility function to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  return token !== null && token !== '';
};

// Utility function to logout
export const logout = () => {
  localStorage.removeItem('access_token');
  console.log('✅ Logged out, token removed');
};