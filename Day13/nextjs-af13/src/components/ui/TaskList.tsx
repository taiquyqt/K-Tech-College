import type { Task } from '@/types';
import TaskDate from './TaskDate';
import TaskPriority from './TaskPriority';
import TaskStatus from './TaskStatus';
import TaskTitle from './TaskTitle';

type Props = {
  tasks: Task[];
  onEdit?: (taskId: string | number | undefined) => void;
  onDelete?: (taskId: string | number | undefined) => void;
};

export default function TaskList({ tasks, onEdit, onDelete }: Props) {
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
              <strong>Start:</strong> <TaskDate date={task.start_date} />
            </p>
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
          <div className="text-sm text-gray-700 mb-4">
            <strong>Assignee:</strong> {task.assignee_id || 'Unassigned'}
          </div>

          {/* Actions */}
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
