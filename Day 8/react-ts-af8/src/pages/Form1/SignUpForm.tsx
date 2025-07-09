import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.css';

type FormValues = {
  email: string;
  password: string;
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log('Submitted data:', data);
    // Xử lý lưu trữ hoặc điều hướng
  };

  return (
    <div className={styles.framesignup}>
      <button
        className="absolute top-4 left-4 text-white text-xl hover:text-green-300 transition"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black bg-opacity-60 p-6 rounded-lg w-full max-w-sm"
      >
        <h2 className="text-left text-white text-xl font-bold mb-4">Sign up</h2>
        <p className="text-white mb-2">
          Let&apos;s create a new account for jane.doe@gmail.com
        </p>



        {/* Email */}
        <input
          placeholder="Email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format',
            },
          })}
          className="w-full p-3 mb-1 rounded focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Password */}
        <div className="relative">
          <input
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            className="w-full p-3 mb-1 pr-10 rounded focus:outline-none"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-400 text-sm mb-3">{errors.password.message}</p>
        )}

        {/* Terms */}
        <p className="text-white text-sm mb-4">
          By selecting <strong>Agree and continue</strong>, I agree to{' '}
          <span className="text-green-400 underline cursor-pointer">
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="text-green-400 underline cursor-pointer">
            Privacy Policy
          </span>
        </p>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-500 w-full py-3 text-white rounded hover:bg-green-600 transition"
        >
          Agree and continue
        </button>
      </form>
    </div>
  );
}
