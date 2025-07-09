import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import { FaFacebookSquare, FaGoogle, FaApple, FaArrowLeft } from "react-icons/fa";

type LoginFormInputs = {
  email: string;
};

export default function HomePage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Submitted data:", data);
    navigate('/login');
  };

  return (
    <div className={styles.frame}>
      {/* Nút back */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-white text-xl hover:text-green-300 transition"
      >
        <FaArrowLeft />
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black bg-opacity-60 p-6 rounded-lg w-full max-w-sm"
      >
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">Hi!</h2>

        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format'
            }
          })}
          className="w-full p-3 rounded mb-1 focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mb-3">{errors.email.message}</p>
        )}

        <button
          type="submit"
          className="bg-green-500 w-full py-3 text-white font-semibold rounded hover:bg-green-600 transition"
        >
          Continue
        </button>

        <p className="text-white text-center mt-4">or</p>

        <button className="flex items-center pl-3 gap-2 bg-white w-full py-3 mt-2 rounded text-gray-800 font-medium hover:bg-gray-200 transition">
          <FaFacebookSquare /> Continue with Facebook
        </button>
        <button className="flex items-center pl-3 gap-2 bg-white w-full py-3 mt-2 rounded text-gray-800 font-medium hover:bg-gray-200 transition">
          <FaGoogle /> Continue with Google
        </button>
        <button className="flex items-center pl-3 gap-2 bg-white w-full py-3 mt-2 rounded text-gray-800 font-medium hover:bg-gray-200 transition">
          <FaApple /> Continue with Apple
        </button>

        <p className="text-white mt-6 text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate('/signup')}
            className="text-green-400 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

        <p className="text-green-300 mt-2 text-sm text-center cursor-pointer hover:underline">
          Forgot your password?
        </p>
      </form>
    </div>
  );
}
