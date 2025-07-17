import { useForm } from 'react-hook-form';
import type { Filter } from '@/types';

interface FormData {
  query: string;
  status: string;
  priority: string;
}

type Props = {
  onSearch: (filters: Filter) => void;
};

export default function TaskFilterForm({ onSearch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      query: '',
      status: '',
      priority: '',
    },
  });

  const onSubmit = (data: FormData) => {
    const filters: Filter = {};
    if (data.query.trim() !== '') {
      filters.query = data.query.trim();
    }
    if (data.status) {
      filters.status = data.status;
    }
    if (data.priority) {
      filters.priority = data.priority;
    }
    onSearch(filters);
  };

  return (
    <div className="bg-white px-6 py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="flex-1">
          <input
            type="text"
            {...register('query')}
            placeholder="Search tasks by title or description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
          />
        </div>

        <div className="w-full sm:w-40">
          <select
            {...register('status')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">All Statuses</option>
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="w-full sm:w-40">
          <select
            {...register('priority')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
}
