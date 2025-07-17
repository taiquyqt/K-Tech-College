'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TaskFilterForm from '@/components/ui/TaskFilterForm';
import TaskList from '@/components/ui/TaskList';
import type { Filter, Task } from '@/types';
import { getTasks, deleteTask, isAuthenticated } from '@/service';

export default function Tasks() {
  const router = useRouter();
  
  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<Filter>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check authentication first
        if (!isAuthenticated()) {
          setError('Please login to access tasks');
          setLoading(false);
          return;
        }
        
        console.log('Fetching tasks from API...');
        
        const data = await getTasks();
        console.log('Raw API response:', data);
        console.log('Response status:', data?.status);
        console.log('Response type:', typeof data);
        
        // Handle different response formats
        if (Array.isArray(data)) {
          setTasks(data);
          setFilteredTasks(data);
          console.log('Tasks loaded successfully (array):', data.length);
        } else if (data && typeof data === 'object') {
          // Check for common API response patterns
          if (Array.isArray(data.data)) {
            setTasks(data.data);
            setFilteredTasks(data.data);
            console.log('Tasks loaded from data.data:', data.data.length);
          } else if (Array.isArray(data.tasks)) {
            setTasks(data.tasks);
            setFilteredTasks(data.tasks);
            console.log('Tasks loaded from data.tasks:', data.tasks.length);
          } else if (Array.isArray(data.results)) {
            setTasks(data.results);
            setFilteredTasks(data.results);
            console.log('Tasks loaded from data.results:', data.results.length);
          } else {
            console.error('Unexpected API response structure:', data);
            setTasks([]);
            setFilteredTasks([]);
            setError(`Unexpected response format: ${JSON.stringify(data)}`);
          }
        } else {
          console.error('Tasks response is not valid:', data);
          setTasks([]);
          setFilteredTasks([]);
          setError('Invalid response format from server');
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error fetching tasks:', error);
        
        // More detailed error handling
        if (error.response) {
          const statusCode = error.response.status;
          const statusText = error.response.statusText;
          console.error('HTTP Error:', statusCode, statusText);
          console.error('Response data:', error.response.data);
          
          switch (statusCode) {
            case 400:
              setError('Bad Request - Please check your request parameters');
              break;
            case 401:
              setError('Unauthorized - Please login again');
              break;
            case 403:
              setError('Forbidden - You do not have permission to access this resource');
              break;
            case 404:
              setError('Not Found - The API endpoint does not exist');
              break;
            case 500:
              setError('Internal Server Error - Please try again later');
              break;
            default:
              setError(`Server Error (${statusCode}): ${statusText}`);
          }
        } else if (error.request) {
          console.error('Network Error:', error.request);
          setError('Network Error - Unable to connect to server');
        } else {
          console.error('Error:', error.message);
          setError(`Error: ${error.message}`);
        }
        
        setTasks([]);
        setFilteredTasks([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);

  // Apply filters whenever filters or tasks change
  useEffect(() => {
    let filtered = [...tasks];
    
    // Apply search filter (using query from Filter interface)
    if (filters.query) {
      filtered = filtered.filter(task => 
        task.title?.toLowerCase().includes(filters.query?.toLowerCase() || '') ||
        task.description?.toLowerCase().includes(filters.query?.toLowerCase() || '')
      );
    }
    
    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }
    
    // Apply priority filter
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }
    
    setFilteredTasks(filtered);
    console.log('Filtered tasks:', filtered.length);
  }, [filters, tasks]);

  // Handle search/filter
  const handleSearch = (newFilters: Filter) => {
    console.log('New filters applied:', newFilters);
    setFilters(newFilters);
  };

  // Handle edit task
  const handleEdit = (taskId: string | number | undefined) => {
    if (!taskId) {
      console.error('Task ID is undefined');
      return;
    }
    console.log('Editing task:', taskId);
    router.push(`/update/${taskId}`);
  };

  // Handle delete task
  const handleDelete = async (taskId: string | number | undefined) => {
    if (!taskId) {
      console.error('Task ID is undefined');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      console.log('Deleting task:', taskId);
      await deleteTask(Number(taskId));
      
      // Update tasks list after successful deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  // Handle refresh
  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      if (Array.isArray(data)) {
        setTasks(data);
        setFilteredTasks(data);
      } else if (data && Array.isArray(data.data)) {
        setTasks(data.data);
        setFilteredTasks(data.data);
      } else {
        setError('Invalid data format');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Failed to refresh tasks');
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading tasks...</span>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
          <button 
            onClick={handleRefresh}
            className="ml-auto bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Filter Tasks</h3>
        </div>
        <div className="p-6">
          <TaskFilterForm onSearch={handleSearch} />
        </div>
      </section>

      {/* Task List Section */}
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Our Tasks</h2>
              <p className="text-gray-600 mt-1">
                Manage and track all tasks ({filteredTasks.length} of {tasks.length})
              </p>
            </div>
            <button 
              onClick={handleRefresh}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="p-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-500">
                {tasks.length === 0 
                  ? "No tasks available. Create your first task to get started." 
                  : "No tasks match your current filters. Try adjusting your search criteria."
                }
              </p>
            </div>
          ) : (
            <TaskList 
              tasks={filteredTasks} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
        </div>
      </section>

      {/* Debug Information (Remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <section className="bg-gray-50 rounded-lg p-4 text-sm">
          <h4 className="font-semibold mb-2">Debug Info:</h4>
          <div className="space-y-1 text-gray-600">
            <p>Total tasks: {tasks.length}</p>
            <p>Filtered tasks: {filteredTasks.length}</p>
            <p>Active filters: {Object.keys(filters).length}</p>
            <p>Loading: {loading ? 'true' : 'false'}</p>
            <p>Error: {error || 'none'}</p>
          </div>
        </section>
      )}
    </div>
  );
}