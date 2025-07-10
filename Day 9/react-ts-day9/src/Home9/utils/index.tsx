import type { Filter, Task } from '../types';

export const searchTasks = (tasks: Task[], filters: Filter): Task[] => {
  if (!Array.isArray(tasks)) {
    console.warn('Invalid tasks data:', tasks);
    return [];
  }

  return tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });
};
