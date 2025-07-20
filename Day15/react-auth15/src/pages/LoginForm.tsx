import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthStore } from '../auth-store';
import { User, Lock } from 'lucide-react';

interface IFormInput {
  username: string;
  password: string;
}

const validationSchema: yup.ObjectSchema<IFormInput> = yup.object({
  username: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Minimum 6 characters'),
});

export default function LoginForm() {
  const { login, loading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '123456789',
    },
  });

  const onSubmit = async (data: IFormInput): Promise<void> => {
    await login({
      username: data.username,
      password: data.password,
    });
  };

  console.log('Login error:', error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Task Manager</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to manage your tasks</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="username"
                  type="email"
                  {...register('username')}
                  placeholder="you@example.com"
                  className={`pl-10 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${errors.username
                    ? 'border-red-500 focus:ring-red-300'
                    : dirtyFields.username
                      ? 'border-green-500 focus:ring-green-200'
                      : 'border-gray-300 focus:ring-blue-200'
                    }`}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className={`pl-10 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${errors.password
                    ? 'border-red-500 focus:ring-red-300'
                    : dirtyFields.password
                      ? 'border-green-500 focus:ring-green-200'
                      : 'border-gray-300 focus:ring-blue-200'
                    }`}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isValid || isSubmitting}
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${loading || isSubmitting || !isValid
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {loading || isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Status */}
            <div className="text-center text-sm mt-2">
              {error && (
                <p className="text-red-500">
                  {typeof error === 'string' ? error : error?.message || 'Login failed'}
                </p>
              )}
              {!error && isValid && (
                <p className="text-green-500">✅ Form is valid</p>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}