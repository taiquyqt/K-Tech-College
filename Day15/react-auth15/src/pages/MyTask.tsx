
import { useState, useEffect } from 'react';
import { useAuthStore } from '../auth-store';
import { apiClient } from '../libs/api-client';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority?: string;
  assigneeId: number;
  assignee?: { username: string };
  startDate?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { loggedInUser } = useAuthStore();

  useEffect(() => {
    if (loggedInUser?.id) {
      fetchMyTasks();
    }
  }, []);

  const fetchMyTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(`/workspaces/tasks/assignee/${loggedInUser?.id}`);
      setTasks(response.data || response);
    } catch (err) {
      console.error('Error fetching my tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch my tasks');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading my tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">Error: {error}</div>
        <button 
          onClick={fetchMyTasks}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <div className="text-sm text-gray-600">
          Welcome, {loggedInUser?.username}
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">No tasks assigned to you</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-gray-600 mb-2">{task.description}</p>

              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">Status: </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      task.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {task.status?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Priority: </span>
                  <span className="text-sm uppercase text-gray-700">
                    {task.priority || 'MEDIUM'}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-1 mb-3">
                <div>
                  <span className="font-medium">Created:</span>{' '}
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : 'Not set'}
                </div>
                <div>
                  <span className="font-medium">Start:</span>{' '}
                  {task.startDate
                    ? new Date(task.startDate).toLocaleDateString()
                    : 'Not set'}
                </div>
                <div>
                  <span className="font-medium">Due:</span>{' '}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : 'Not set'}
                </div>
                <div>
                  <span className="font-medium">Assignee:</span>{' '}
                  {task.assignee?.username || 'Unassigned'}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
