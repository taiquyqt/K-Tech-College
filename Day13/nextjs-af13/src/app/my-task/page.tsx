'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import TaskFilterForm from '@/components/ui/TaskFilterForm';
import TaskList from '@/components/ui/TaskList';
import type { Filter, Task } from '@/types';
import { deleteTask, getTasksByAssignee } from '@/service';

export default function MyTask() {
  const assigneeId = 1;
  const router = useRouter();
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
    router.push(`/update/${taskId}`);
  };

  const handleDelete = async (taskId: string | number | undefined) => {
    if (!taskId) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;
    
    try {
      await deleteTask(Number(taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };  


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
            <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </section>
    </div>
  );
}