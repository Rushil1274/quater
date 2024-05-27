import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "Doctor", // Default role
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data.status === "Success") {
            // Store user data in local storage
            localStorage.setItem("user", JSON.stringify(res.data.user));

            if (values.role === "Doctor") {
              navigate("/doctor-home");
            } else if (values.role === "Receptionist") {
              navigate("/receptionist-home");
            } else {
              navigate("/home");
            }
          } else {
            alert("No record exist");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              onChange={handleInput}
              className="form-control rounded-0"
            >
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
              <option value="Receptionist">Receptionist</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            <strong>Log In</strong>
          </button>
          <p>You agree to TnC</p>
          <Link to="/signup" className="btn btn-default border w-100 bg-light">
            <strong>Create Account</strong>
          </Link>
          <br />
          <br />
          <Link
            to="/forgotpassword"
            className="btn btn-default border w-100 bg-light"
          >
            <strong>Forgot Password</strong>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
