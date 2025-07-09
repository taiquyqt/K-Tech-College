import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from './FormRegister.module.css';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
  terms: boolean;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const password = watch("password");

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
  };

  return (
    <div className={styles.container}> 
      <div className={styles.sidebar}>
        <img
          src="./src/assets/images/sidebar.jpg"   
          alt="Sidebar"
        />
        <h2 className={styles.sidebarText}>
          A few clicks away <br />
          from creating your Lottery Display
        </h2>
      </div>

      {/* Register Form */}
      <div className={styles.formWrapper}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl"
        >
          <h2 className="text-2xl font-bold mb-1">Register</h2>
          <p className="text-gray-600 mb-6">
            Manage all your lottery efficiently
            <br />
            Let’s get you all set up...
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <input
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Must be 10–15 digits",
                  },
                })}
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/,
                    message: "Min 8 chars, 1 uppercase, 1 lowercase, 1 number",
                  },
                })}
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords must match",
                })}
                placeholder="Confirm Password"
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mt-4 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("newsletter")} />
              Yes, I want to receive Lottery Display emails.
            </label>

            <label className="flex items-start gap-2">
              <input type="checkbox" {...register("terms", { required: true })} />
              <span>
                I agree to all the <a href="#" className="text-blue-500 underline">Term</a>,{" "}
                <a href="#" className="text-blue-500 underline">Privacy Policy</a> and{" "}
                <a href="#" className="text-blue-500 underline">Fees</a>.
              </span>
            </label>
            {errors.terms && <p className="text-sm text-red-500">You must agree to continue</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className={`mt-6 w-full py-2 rounded text-white font-semibold ${
              isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Create Account
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 underline">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
