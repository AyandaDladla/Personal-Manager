import { useState } from "react";
import { useFormik } from "formik";
import RegistrationForm from "./RegistrationForm";
import { useAppContext } from "./AppContext";

// Removed unused LoginComponent and misplaced login logic

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

const SignupForm = ({ onLogin, onShowRegister, registeredUser }) => {
  const { setUser } = useAppContext();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const errors = validate(values);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find(
        (u) => u.email === values.email && u.password === values.password
      );
      if (foundUser) {
        setUser(foundUser);
        sessionStorage.setItem("user", JSON.stringify(foundUser));
        onLogin(values); // App will compare with registeredUser
      } else {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="Header">
        <h1>Welcome to the Personal Manager</h1>
      </div>
      <div className="login-wrapper">
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}

          <button type="submit">Submit</button>
          <button type="button" onClick={onShowRegister}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
