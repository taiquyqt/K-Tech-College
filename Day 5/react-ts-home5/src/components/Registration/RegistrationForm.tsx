// src/components/RegistrationForm.tsx
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styles from "./RegistrationForm.module.css";

type Gender = "Male" | "Female" | "Other";
type Hobby = string;

interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: Gender | "";
  dob: string;
  country: string;
  hobbies: Hobby[];
  profilePicture: File | null;
  bio: string;
}

interface FormErrors {
  [k: string]: string;
}

interface RegistrationFormProps {
  countryList: string[];
  hobbyList: Hobby[];
  defaultValues?: Partial<FormState>;
}

const initialState: FormState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  gender: "",
  dob: "",
  country: "",
  hobbies: [],
  profilePicture: null,
  bio: "",
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  countryList,
  hobbyList,
  defaultValues = {},
}) => {
  const [form, setForm] = useState<FormState>({ ...initialState, ...defaultValues });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (state: FormState): FormErrors => {
    const errors: FormErrors = {};
    if (state.fullName.trim().length < 3) {
      errors.fullName = "Full Name must be at least 3 characters.";
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(state.email)) {
      errors.email = "Email is not valid.";
    }
    if (
      state.password.length < 8 ||
      !/[A-Za-z]/.test(state.password) ||
      !/[0-9]/.test(state.password)
    ) {
      errors.password = "Password must be at least 8 characters and contain both letters and numbers.";
    }
    if (state.confirmPassword !== state.password) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!/^[0-9]{10,}$/.test(state.phone)) {
      errors.phone = "Phone number must be at least 10 digits.";
    }
    if (!state.gender) {
      errors.gender = "Gender is required.";
    }
    if (!state.dob) {
      errors.dob = "Date of birth is required.";
    } else {
      const dobDate = new Date(state.dob);
      const now = new Date();
      const age = now.getFullYear() - dobDate.getFullYear();
      const hasBirthdayPassed =
        now.getMonth() > dobDate.getMonth() ||
        (now.getMonth() === dobDate.getMonth() && now.getDate() >= dobDate.getDate());
      if (age < 18 || (age === 18 && !hasBirthdayPassed)) {
        errors.dob = "You must be at least 18 years old.";
      }
    }
    if (!state.country) {
      errors.country = "Country is required.";
    }
    if (state.hobbies.length === 0) {
      errors.hobbies = "Select at least one hobby.";
    }
    if (!state.profilePicture) {
      errors.profilePicture = "Profile picture is required.";
    } else if (
      !["image/jpeg", "image/jpg", "image/png"].includes(state.profilePicture.type)
    ) {
      errors.profilePicture = "Profile picture must be .jpg, .jpeg, or .png file.";
    }
    if (state.bio.length > 300) {
      errors.bio = "Bio must be at most 300 characters.";
    }
    return errors;
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && name === "hobbies") {
      const hobby = (e.target as HTMLInputElement).value as Hobby;
      setForm((prev) => ({
        ...prev,
        hobbies: prev.hobbies.includes(hobby)
          ? prev.hobbies.filter((h) => h !== hobby)
          : [...prev.hobbies, hobby],
      }));
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm((prev) => ({ ...prev, profilePicture: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    setSubmitted(true);
    if (Object.keys(newErrors).length === 0) {
      alert("Registration successful!\n" + JSON.stringify(form, null, 2));
      setForm({ ...initialState, ...defaultValues });
      setSubmitted(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>User Registration</h2>
      {/* Full Name */}
      <label className={styles.label}>Full Name</label>
      <input
        className={styles.input}
        type="text"
        name="fullName"
        value={form.fullName}
        onChange={handleInput}
        autoComplete="off"
      />
      {errors.fullName && <div className={styles.error}>{errors.fullName}</div>}

      {/* Email */}
      <label className={styles.label}>Email</label>
      <input
        className={styles.input}
        type="email"
        name="email"
        value={form.email}
        onChange={handleInput}
        autoComplete="off"
      />
      {errors.email && <div className={styles.error}>{errors.email}</div>}

      {/* Password */}
      <label className={styles.label}>Password</label>
      <input
        className={styles.input}
        type="password"
        name="password"
        value={form.password}
        onChange={handleInput}
      />
      {errors.password && <div className={styles.error}>{errors.password}</div>}

      {/* Confirm Password */}
      <label className={styles.label}>Confirm Password</label>
      <input
        className={styles.input}
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleInput}
      />
      {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}

      {/* Phone */}
      <label className={styles.label}>Phone Number</label>
      <input
        className={styles.input}
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleInput}
      />
      {errors.phone && <div className={styles.error}>{errors.phone}</div>}

      {/* Gender */}
      <label className={styles.label}>Gender</label>
      <div className={styles.radioGroup}>
        {["Male", "Female", "Other"].map((g) => (
          <label key={g} className={styles.radioLabel}>
            <input
              type="radio"
              name="gender"
              value={g}
              checked={form.gender === g}
              onChange={handleInput}
            />{" "}
            {g}
          </label>
        ))}
      </div>
      {errors.gender && <div className={styles.error}>{errors.gender}</div>}

      {/* Date of Birth */}
      <label className={styles.label}>Date of Birth</label>
      <input
        className={styles.input}
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleInput}
        max={new Date().toISOString().split("T")[0]}
      />
      {errors.dob && <div className={styles.error}>{errors.dob}</div>}

      {/* Country */}
      <label className={styles.label}>Country</label>
      <select
        className={styles.input}
        name="country"
        value={form.country}
        onChange={handleInput}
      >
        <option value="">Select country</option>
        {countryList.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      {errors.country && <div className={styles.error}>{errors.country}</div>}

      {/* Hobbies */}
      <label className={styles.label}>Hobbies</label>
      <div className={styles.checkboxGroup}>
        {hobbyList.map((h) => (
          <label key={h} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="hobbies"
              value={h}
              checked={form.hobbies.includes(h)}
              onChange={handleInput}
            />{" "}
            {h}
          </label>
        ))}
      </div>
      {errors.hobbies && <div className={styles.error}>{errors.hobbies}</div>}

      {/* Profile Picture */}
      <label className={styles.label}>Profile Picture</label>
      <input
        className={styles.input}
        type="file"
        name="profilePicture"
        accept=".jpg,.jpeg,.png"
        onChange={handleInput}
      />
      {errors.profilePicture && <div className={styles.error}>{errors.profilePicture}</div>}

      {/* Bio */}
      <label className={styles.label}>Bio (optional)</label>
      <textarea
        className={styles.textarea}
        name="bio"
        value={form.bio}
        onChange={handleInput}
        maxLength={300}
        rows={4}
      />
      <div className={styles.bioCount}>
        {form.bio.length}/300 characters
      </div>
      {errors.bio && <div className={styles.error}>{errors.bio}</div>}

      <button className={styles.button} type="submit">Register</button>
      {submitted && Object.keys(errors).length === 0 && (
        <div className={styles.success}>Registration successful!</div>
      )}
    </form>
  );
};

export default RegistrationForm;