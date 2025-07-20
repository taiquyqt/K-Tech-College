
import { useState, useEffect } from 'react';
// import { useAuthStore } from '../auth-store';
import { apiClient } from '../libs/api-client';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority?: string;
  assigneeId: number;
  assignee?: {
    id: number;
    username: string;
    email: string;
  };
  start_date?: string;
  due_date?: string;
  completed_date?: string;
  createdAt: string;
  updatedAt: string;
}

// Component con cho hiển thị title và description
function TaskTitle({ task }: { task: { title: string; description: string } }) {
  return (
    <div>
      <h3 className="font-semibold text-lg text-gray-800 mb-1">{task.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
    </div>
  );
}

// Component con cho hiển thị status
function TaskStatus({ task }: { task: Task }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
      {task.status.replace('_', ' ').toUpperCase()}
    </span>
  );
}

// Component con cho hiển thị priority
function TaskPriority({ priority }: { priority?: string }) {
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(priority || 'low')}`}>
      {priority?.toUpperCase() || 'LOW'}
    </span>
  );
}

// Component con cho hiển thị date
function TaskDate({ date }: { date?: string }) {
  if (!date) return <span className="text-gray-400">Not set</span>;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return <span>{formatDate(date)}</span>;
}

function TaskList({ 
  tasks, 
  onEdit, 
  onDelete, 
}: { 
  tasks: Task[]; 
  onEdit?: (taskId: number) => void;
  onDelete?: (taskId: number) => void;
}) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow"
        >
          {/* Title & Description */}
          <div className="mb-3">
            <TaskTitle task={{ title: task.title, description: task.description }} />
          </div>

          {/* Status, Priority */}
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <strong>Status:</strong>
              <TaskStatus task={task} />
            </span>
            <span className="flex items-center gap-1">
              <strong>Priority:</strong>
              <TaskPriority priority={task.priority} />
            </span>
          </div>

          {/* Dates */}
          <div className="text-sm text-gray-700 mb-2">
            <p>
              <strong>Created:</strong> <TaskDate date={task.createdAt} />
            </p>
            {task.start_date && (
              <p>
                <strong>Start:</strong> <TaskDate date={task.start_date} />
              </p>
            )}
            {task.due_date && (
              <p>
                <strong>Due:</strong> <TaskDate date={task.due_date} />
              </p>
            )}
            {task.completed_date && (
              <p>
                <strong>Completed:</strong> <TaskDate date={task.completed_date} />
              </p>
            )}
          </div>

          {/* Assignee */}
          <div className="text-sm text-gray-700 mb-3">
            <strong>Assignee:</strong> 
            {task.assignee ? (
              <span className="ml-1">
                {task.assignee.username}
                <span className="text-gray-500 text-xs block">{task.assignee.email}</span>
              </span>
            ) : (
              <span className="text-gray-500 ml-1">Unassigned</span>
            )}
          </div> 

          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit?.(task.id)}
              className="px-4 py-1.5 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(task.id)}
              className="px-4 py-1.5 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { loggedInUser } = useAuthStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/workspaces/tasks');
      console.log('Tasks response:', response);
      setTasks(response.data || response);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    try {
      await apiClient.delete(`/workspaces/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };


  const handleEditTask = (taskId: number) => {
    console.log('Edit task:', taskId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">Error: {error}</div>
        <button 
          onClick={fetchTasks}
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
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add New Task
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">No tasks found</div>
        </div>
      ) : (
        <TaskList 
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}