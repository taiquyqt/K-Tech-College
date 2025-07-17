'use client'

import { useEffect, useState } from 'react';
import { getTasksByAssignee } from '@/lib/api';
import { useSession } from 'next-auth/react';
import TaskList from '@/components/ui/TaskList';
import { useRouter } from 'next/navigation';
import type { Task } from '@/types';

export default function MyTaskPage() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      if (session?.user?.id) {
        try {
          const data = await getTasksByAssignee(Number(session.user.id));
          setTasks(data);
        } catch (err) {
          console.error('Failed to fetch my tasks', err);
        }
      }
    };
    fetchTasks();
  }, [session]);

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}
