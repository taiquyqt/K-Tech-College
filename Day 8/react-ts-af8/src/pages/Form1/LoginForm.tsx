import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

type LoginInputs = {
  password: string;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginInputs) => {
    console.log("Password entered:", data.password);
    // navigate or auth here
  };

  return (
    <div className={styles.framelogin}>
      {/* Nút Back */}
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
        <h2 className="text-white text-xl font-bold mb-4">Log in</h2>

        {/* Thông tin giả lập */}
        <div className="bg-white/20 backdrop-blur p-4 rounded-md mb-4 text-left">
          <p className="text-white font-semibold">Jane Doe</p>
          <p className="text-white text-sm">jane.doe@gmail.com</p>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            className="w-full p-3 mb-1 rounded pr-10 focus:outline-none"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-400 text-sm mb-3">{errors.password.message}</p>
        )}

        <button type="submit" className="bg-green-500 w-full py-3 text-white rounded hover:bg-green-600 transition">
          Continue
        </button>

        <p className="text-green-300 mt-4 text-center cursor-pointer hover:underline">
          Forgot your password?
        </p>
      </form>
    </div>
  );
}
