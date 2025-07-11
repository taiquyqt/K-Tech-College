import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getTaskById, deleteTask } from '../services/index';
import type { Task } from '../types';

export default function DeleteTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getTaskById(Number(id))
        .then(setTask)
        .catch(() => alert('Failed to fetch task'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteTask(Number(id));
      alert('Task deleted successfully');
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      alert('Failed to delete task');
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading task...</div>;
  }

  if (!task) {
    return <div className="text-center py-10 text-red-500">Task not found</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Delete Task</h2>
      <p className="text-gray-700 mb-6">
        Are you sure you want to delete the task{' '}
        <span className="font-bold text-red-600">"{task.title}"</span>?
      </p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
