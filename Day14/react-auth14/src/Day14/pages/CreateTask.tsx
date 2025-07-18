import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../libs/task-api';
import type { Task } from '../types';

interface TaskFormData {
  title: string;
  start_date: string;
  due_date?: string;
  description?: string;
  status: 'to_do' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee_id?: number;
}

const schema: yup.ObjectSchema<TaskFormData> = yup.object({
  title: yup.string().required('Title is required').min(3).max(100),
  start_date: yup.string().required().matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date'),
  due_date: yup.string().optional().matches(/^\d{4}-\d{2}-\d{2}$/)
    .test('is-after-start', 'Due date must be after start date', function (value) {
      if (!value) return true;
      return new Date(value) >= new Date(this.parent.start_date);
    }),
  description: yup.string().optional().max(500),

  status: yup
    .mixed<'to_do' | 'in_progress' | 'done'>()
    .oneOf(['to_do', 'in_progress', 'done'], 'Invalid status')
    .required('Status is required'),

  priority: yup
    .mixed<'low' | 'medium' | 'high'>()
    .oneOf(['low', 'medium', 'high'], 'Invalid priority')
    .required('Priority is required'),

  assignee_id: yup.number().optional().min(1),
});


export default function CreateTask() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      start_date: new Date().toISOString().split('T')[0],
      due_date: '',
      description: '',
      status: 'to_do',
      priority: 'medium',
      assignee_id: undefined,
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      const task: Task = {
        id: undefined,
        title: data.title,
        start_date: new Date(data.start_date),
        due_date: data.due_date ? new Date(data.due_date) : undefined,
        description: data.description,
        status: data.status,
        priority: data.priority,
        assignee_id: data.assignee_id,
        completed_date: data.status === 'done' ? new Date() : undefined,
        created_time: new Date(),
        updated_time: new Date(),
      };

      await createTask(task);
      alert('Task created successfully!');
      reset();
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      alert('Failed to create task.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 Create Task</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium">Title *</label>
            <input
              {...register('title')}
              placeholder="Enter task title"
              className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Start Date *</label>
              <input type="date" {...register('start_date')} className="w-full p-3 border rounded-md" />
              {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date.message}</p>}
            </div>
            <div>
              <label className="block font-medium">Due Date</label>
              <input type="date" {...register('due_date')} className="w-full p-3 border rounded-md" />
              {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date.message}</p>}
            </div>
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Status *</label>
              <select {...register('status')} className="w-full p-3 border rounded-md">
                <option value="to_do">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>
            <div>
              <label className="block font-medium">Priority *</label>
              <select {...register('priority')} className="w-full p-3 border rounded-md">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              placeholder="Optional task description"
              className="w-full mt-1 p-3 border rounded-md resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Assignee ID */}
          <div>
            <label className="block font-medium">Assignee ID</label>
            <input type="number" {...register('assignee_id')} className="w-full p-3 border rounded-md" />
            {errors.assignee_id && <p className="text-red-500 text-sm">{errors.assignee_id.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`px-6 py-2 rounded-md text-white ${
                isSubmitting || !isValid ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
