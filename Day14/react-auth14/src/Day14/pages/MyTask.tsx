import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskFilterForm from '../components/TaskFilterForm';
import TaskList from '../components/TaskList';
import { searchTasks } from '../utils/index';

import type { Filter, Task } from '../types';
import { getTasksByAssignee } from '../libs/task-api';
// import { login } from '../libs/client-api';

export default function MyTask() {
  const assigneeId = 1;
  const navigate = useNavigate();
  // Mock data for demonstration
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filters, setFilters] = React.useState<Filter>({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByAssignee(assigneeId);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleEdit = (taskId: string | number | undefined) => {
    navigate(`/update/${taskId}`);
  };

  const handleDelete = async (taskId: string | number | undefined) => {
    if (!taskId) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;
  };

  // Filter tasks based on current filter criteria
  const filteredTasks = React.useMemo(() => {
    return searchTasks(tasks, filters);
  }, [tasks, filters]);

  const handleSearch = (newFilters: Filter) => {
    setFilters(newFilters);
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
              <h2 className="text-2xl font-bold text-gray-800">Your tasks</h2>
              <p className="text-gray-600 mt-1">Manage and track all your tasks</p>
            </div>
          </div>
        </section>

        <section> 
            <TaskList tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </section>
    </div>
  );
}