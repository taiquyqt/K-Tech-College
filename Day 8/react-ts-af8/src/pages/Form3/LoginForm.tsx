import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./LoginForm.module.css";

type LoginData = {
  username: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginData) => {
    if (data.remember) {
      console.log("Saving user to localStorage:", data.username);
      localStorage.setItem("rememberedUser", data.username);
    }
    console.log("Login data:", data);
  };

  return (
    <div className={styles.container}>
      {/* Sidebar Image + Text */}
      <div className={styles.sidebar}>
        <img src="./src/assets/images/sidebar.png" alt="Sidebar" />
        <h2 className={styles.sidebarText}>
          Set Your Partner <br /> Recruitment on Auto-Pilot
        </h2>
      </div>

      {/* Login Form */}
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-2 text-red-600">Login</h2>
          <p className="text-gray-600 text-sm mb-6">
            Login to your account<br />
            Thank you for coming back to Grovia...
          </p>

          {/* Username */}
          <div className="mb-3">
            <input
              {...register("username", {
                required: "Username is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
                validate: value =>
                  /^\S+@\S+\.\S+$/.test(value) || /^[0-9]{9,15}$/.test(value) || "Invalid email or phone"
              })}
              placeholder="Email or Phone Number"
              className="w-full p-2 border rounded"
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>

          {/* Password */}
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
                validate: val =>
                  !/\s/.test(val) && /[a-zA-Z]/.test(val) || "No spaces and must include at least 1 letter"
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

          {/* Remember me + Reset password */}
          <div className="flex justify-between items-center text-sm mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("remember")} />
              Remember me
            </label>
            <a href="#" className="text-red-500 hover:underline">Reset Password?</a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 w-full text-white py-2 rounded font-semibold"
          >
            SIGN IN
          </button>

          <p className="text-center mt-4 text-sm">
            Don’t have an account yet?{" "}
            <a href="/register" className="text-red-500 hover:underline">Join Grovia Now!</a>
          </p>
        </form>
      </div>
    </div>
  );
}
