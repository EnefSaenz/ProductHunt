import React, { useEffect, useState } from "react";

const useValidator = (initialState, validate, fn) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSumbitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const notErrors = Object.keys(errors).length === 0;

      if (notErrors) {
        fn(); // Function to be called
      }
      setSumbitted(false);
    }
  }, [errors]);

  // Function to be called while user is writing on Form
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Function to be called when user is submitting Form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSumbitted(true);
  };

  // Function for handling blur
  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export default useValidator;
