
'use client'

import { useEffect, useState } from 'react';
import { getTasks } from '@/lib/api';
import TaskList from '@/components/ui/TaskList';
import type { Task } from '@/types';
import { useRouter } from 'next/navigation';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleEdit = (id: string | number | undefined) => {
    if (!id) return;
    router.push(`/update/${id}`);
  };

  const handleDelete = async (id: string | number | undefined) => {
    if (!id) return;
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    await fetch(`https://server.aptech.io/workspaces/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
