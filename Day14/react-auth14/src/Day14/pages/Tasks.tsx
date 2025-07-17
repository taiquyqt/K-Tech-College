import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskFilterForm from '../components/TaskFilterForm';
import TaskList from '../components/TaskList';
import { searchTasks } from '../utils/index';
import type { Filter, Task } from '../types';
import { deleteTask, getTasks } from '../services/index';
import { useAuthStore } from '../auth-store';

export default function Tasks() {
  const navigate = useNavigate();
  const { logOut, access_token, refresh_token, changeAccessToken, changeRefreshToken, loggedInUser } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<Filter>({});

  // Kiểm tra login
  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  }, [loggedInUser, navigate]);

  // Fetch task data
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error('Tasks response is not an array:', data);
          setTasks([]);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Event handlers
  const handleSearch = (newFilters: Filter) => {
    setFilters(newFilters);
  };

  const handleEdit = (taskId: string | number | undefined) => {
    navigate(`/update/${taskId}`);
  };

  const handleDelete = async (taskId: string | number | undefined) => {
    if (!taskId) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      await deleteTask(Number(taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  const handleChangeAccessToken = async () => {
    await changeAccessToken();
  };

  const handleChangeRefreshToken = async () => {
    await changeRefreshToken();
  };

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <div className="p-6">
      {/* Token & Logout */}
      <section className="bg-gray-100 p-4 rounded-md mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex flex-wrap">Tokens</h3>
        <div className="text-sm text-gray-700 break-all">
          <p><strong>Access Token:</strong> {access_token}</p>
          <p className="mt-2"><strong>Refresh Token:</strong> {refresh_token}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={handleChangeAccessToken} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Change Access Token
          </button>
          <button onClick={handleChangeRefreshToken} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Change Refresh Token
          </button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </section>

      {/* Filter Form */}
      <section className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <TaskFilterForm onSearch={handleSearch} />
      </section>

      <div className="my-4" />

      {/* Task List */}
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
        <section className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Our tasks</h2>
              <p className="text-gray-600 mt-1">Manage and track all our tasks</p>
            </div>
          </div>
        </section>

        <section>
          <TaskList
            tasks={searchTasks(tasks, filters)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </section>
    </div>
  );
}
