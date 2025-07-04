import React, { useState } from "react";
import styles from "./FormSubmissionAlert.module.css";

const FormSubmissionAlert: React.FC = () => {
  const [value, setValue] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`You submitted: ${value}`);
    setValue("");
  };
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter something"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
export default FormSubmissionAlert;