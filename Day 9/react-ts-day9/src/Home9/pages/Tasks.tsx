import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import TaskFilterForm from '../components/TaskFilterForm';
import TaskList from '../components/TaskList';
import { searchTasks } from '../utils/index';

import type { Filter, Task } from '../types';
import { deleteTask, getTasks } from '../services/index';

export default function Tasks() {
  const navigate = useNavigate();
  // Mock data for demonstration
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filters, setFilters] = React.useState<Filter>({});

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
      // Cập nhật lại danh sách task sau khi xóa
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  return (
    <div>
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
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
            <TaskList tasks={searchTasks(tasks, filters)} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </section>
    </div>
  );
}