
import type { Task, Filter } from '../types';

export function searchTasks(tasks: Task[], filters: Filter): Task[] {
  return tasks.filter((task) => {
    const matchesQuery =
      !filters.query ||
      task.title.toLowerCase().includes(filters.query.toLowerCase()) ||
      task.description?.toLowerCase().includes(filters.query.toLowerCase());

    const matchesStatus =
      !filters.status || task.status === filters.status;

    const matchesPriority =
      !filters.priority || task.priority === filters.priority;

    return matchesQuery && matchesStatus && matchesPriority;
  });
}
