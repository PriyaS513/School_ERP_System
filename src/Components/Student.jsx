import React, { useState } from "react";
import "./Student.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import text from "../assets/login.json";
import img from "../Images/carousel3.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Student = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "UserId is required";
    }else if (!formData.username.includes('@pahmv.com')) {
      validationErrors.username = "UserId must be in the format of userId@pahmv.com";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password should be at least 8 characters";
    }

    setErrors(validationErrors);

    // If there are no validation errors, check if the credentials match
    if (Object.keys(validationErrors).length === 0) {
      if (formData.username === 'S513@pahmv.com' && formData.password === 'Pass@123') {
        toast.success('Logged In Successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/Studentprofile");
        }, 2000);
      } else {
        toast.error('Invalid username or password!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error('Invalid username or password!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} id="student">
      <div id="studentlogin">
      <div className="login-page">
        <img src={img} className="background-image" />
        <div className="box container">
          <div className="login-left">
          <div className="stud">Student Login</div>
          <div className="text stud-1">{action}</div>
          <div className="underline"></div>

          <div className="input_box">
            <img alt="" /> 
            <input
              type="text"
              name="username"
              placeholder="UserId@pahmv.com"
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.username && <span>{errors.username}</span>}
          </div>

          <div className="input_box">
            <img alt="" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div className="submit-container">
            <button
              className={action === "Login" ? "submit1" : "submit gray"}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="login-right">
        <Lottie animationData={text} />
        </div>
        </div>
      </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Student;