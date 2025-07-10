import { defaultHeaders } from '../constants';
import type { Task } from '../types';

const baseUrl = 'https://server.aptech.io';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
});

export const getTasks = async () => {
  const response = await fetch(`${baseUrl}/workspaces/tasks`, {
    headers: getHeaders(),
  });
  return response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};


export const getTaskById = async (id: number) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
    headers: getHeaders(),
  });
  return response.json();
};

export const createTask = async (task: Task) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (id: number, task: Task) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify(task),
  });
  return response.json();
};

export const getTasksByAssignee = async (assigneeId: number) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/assignee/${assigneeId}`, {
    headers: defaultHeaders,
  });
  return response.json();
};