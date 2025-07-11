import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../services/index';
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { LoginContext } from '../context';

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

const Login = () => {
  const { setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      username: 'tungnt@softech.vn',
      password: '123456789',
    },
  });

  useEffect(() => {
    const savedUsername = localStorage.getItem('remembered_username');
    if (savedUsername) {
      setValue('username', savedUsername);
    }
  }, [setValue]);

  const onSubmit = async (data: IFormInput): Promise<void> => {
    try {
      const user = await login(data.username, data.password);
      localStorage.setItem('access_token', user.access_token);

      setUser(user);
      navigate('/tasks');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left image section */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-10 relative ">
        <h1 className="text-4xl font-bold mb-4 z-10">Welcome Back</h1>
        <p className="text-lg z-10 text-center max-w-md mb-80">
          Sign in to continue and manage your tasks efficiently.
        </p>
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
      </div>

      {/* Right form section */}
      <div className="flex items-center justify-center p-8 bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Login to your account</h2>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              id="username"
              {...register('username')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.username
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="example@domain.com"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`w-full py-3 rounded-md text-white font-medium transition-colors ${
              isSubmitting || !isValid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          {/* Status */}
          <p className={`text-sm text-center ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? 'Form is valid' : 'Please fill all fields correctly'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
