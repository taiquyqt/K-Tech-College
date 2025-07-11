// src/pages/Login.tsx

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../services/index';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { LoginContext } from '../context';

// Strong typed interface for form data
interface IFormInput {
  username: string;
  password: string;
}

// Yup validation schema with strong typing
const validationSchema: yup.ObjectSchema<IFormInput> = yup.object({
  username: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
});

const Login = () => {
  const { setUser } = useContext(LoginContext);
  const navigate = useNavigate(); // Use navigate from react-router-dom for redirection
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange', // Validate on change for better UX
    defaultValues: {
      username: 'tungnt@softech.vn',
      password: '123456789', // Example default value
    },
  });

  const onSubmit = async (data: IFormInput): Promise<void> => {
    try {
      const user = await login(data.username, data.password);
  
      // 💡 Lưu token vào localStorage
      localStorage.setItem('access_token', user.access_token);
  
      setUser(user); 
      navigate('/tasks'); 
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
  onSubmit={handleSubmit(onSubmit)}
  className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg border-2 border-gray-300"
>
  <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

  {/* Username */}
  <div className="mb-5">
    <label htmlFor="username" className="block text-base font-medium text-gray-700 mb-1">
      Username
    </label>
    <input
      id="username"
      type="text"
      {...register('username')}
      className={`w-full p-3 text-base border rounded-md focus:outline-none focus:ring-2 transition-colors ${
        errors.username
          ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
          : !errors.username && dirtyFields.username
          ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      }`}
      placeholder="Enter your username"
    />
    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
  </div>

  {/* Password */}
  <div className="mb-6">
    <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">
      Password
    </label>
    <input
      id="password"
      type="password"
      {...register('password')}
      className={`w-full p-3 text-base border rounded-md focus:outline-none focus:ring-2 transition-colors ${
        errors.password
          ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
          : !errors.password && dirtyFields.password
          ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      }`} 
      placeholder="Enter your password"
    />
    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
  </div>

  {/* Submit */}
  <button
    type="submit"
    disabled={isSubmitting || !isValid}
    className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 text-lg rounded-md font-semibold transition-colors ${
      isSubmitting || !isValid
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 text-white'
    }`}
  >
    {isSubmitting ? 'Logging in...' : 'Login'}
  </button>

  {/* Form status */}
  <div className="mt-5 text-center">
    <p className={`text-sm ${isValid ? 'text-green-500' : 'text-red-500'}`}>
      {isValid ? 'Form is valid' : 'Please fill in all required fields correctly'}
    </p>
  </div>
</form>

    </div>
  );
};

export default Login;