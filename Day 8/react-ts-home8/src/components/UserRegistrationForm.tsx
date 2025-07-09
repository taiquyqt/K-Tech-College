import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  dob: string;
  country: string;
  hobbies: string[];
  profilePic: FileList;
  bio?: string;
}

const UserRegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' });

  const [charCount, setCharCount] = useState(0);

  const onSubmit = (data: FormData) => {
    console.log('Submitted:', data);
  };

  const watchPassword = watch('password');
  // const watchDOB = watch('dob');

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('fullName', {
              required: 'Full Name must be at least 3 characters.',
              minLength: { value: 3, message: 'Full Name must be at least 3 characters.' },
            })}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        <div>
          <input
            type="email"
            {...register('email', {
              required: 'Invalid email address',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email format',
              },
            })}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            {...register('password', {
              required: 'Password must be at least 8 characters with letters and numbers.',
              minLength: { value: 8, message: 'At least 8 characters' },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                message: 'Password must contain letters and numbers',
              },
            })}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) => value === watchPassword || 'Passwords do not match',
            })}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <div>
          <input
            type="tel"
            {...register('phone', {
              required: 'Phone Number must be at least 10 digits.',
              pattern: {
                value: /^\d{10,}$/,
                message: 'Must be at least 10 digits',
              },
            })}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div className="space-x-4">
          <label><input type="radio" value="male" {...register('gender', { required: 'Please select your gender' })} /> Male</label>
          <label><input type="radio" value="female" {...register('gender', { required: 'Please select your gender' })} /> Female</label>
          <label><input type="radio" value="other" {...register('gender', { required: 'Please select your gender' })} /> Other</label>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>

        <div>
          <input
            type="date"
            {...register('dob', {
              required: 'Date of Birth is required',
              validate: (value) => calculateAge(value) >= 18 || 'Must be at least 18 years old',
            })}
            className="w-full p-2 border rounded"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
        </div>

        <div>
          <select {...register('country', { required: 'Country is required' })} className="w-full p-2 border rounded">
            <option value="">Select Country</option>
            <option value="Vietnam">Vietnam</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Japan">Japan</option>
          </select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
        </div>

        <div className="space-x-4">
          <label><input type="checkbox" value="Reading" {...register('hobbies', { required: 'Select at least one hobby' })} /> Reading</label>
          <label><input type="checkbox" value="Traveling" {...register('hobbies', { required: 'Select at least one hobby' })} /> Traveling</label>
          <label><input type="checkbox" value="Gaming" {...register('hobbies', { required: 'Select at least one hobby' })} /> Gaming</label>
          {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies.message}</p>}
        </div>

        <div>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            {...register('profilePic', {
              required: 'Profile picture is required',
              validate: (fileList) => {
                const file = fileList?.[0];
                return (
                  file && ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
                ) || 'Invalid file type';
              },
            })}
            className="w-full"
          />
          {errors.profilePic && <p className="text-red-500 text-sm">{errors.profilePic.message}</p>}
        </div>

        <div>
          <textarea
            maxLength={300}
            {...register('bio')}
            onChange={(e) => setCharCount(e.target.value.length)}
            placeholder="Tell us something about yourself (optional)"
            className="w-full p-2 border rounded"
          />
          <p className="text-sm text-gray-500 text-right">{300 - charCount} characters left</p>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
