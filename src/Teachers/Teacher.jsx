import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Components/Student.css';
import Lottie from "lottie-react";
import text from "../assets/login.json";
import img from "../Images/carousel3.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the authentication credentials
const authCredentials = {
  teacher: {
    email: "priya@gmail.com",
    password: "Pass@123"
  },
  principal: {
    email: "priya@gmail.com",
    password: "Pass@123"
  }
};

const Student = () => {
  const [action, setAction] = useState("Teacher");
  const [formData, setFormData] = useState({
    teacherEmail: '',
    teacherPassword: '',
    principalEmail: '',
    principalPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (action === "Teacher") {
      if (!formData.teacherEmail.trim()) {
        validationErrors.teacherEmail = "email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.teacherEmail)) {
        validationErrors.teacherEmail = "email is not valid";
      }
      if (!formData.teacherPassword.trim()) {
        validationErrors.teacherPassword = "password is required";
      } else if (formData.teacherPassword.length < 8) {
        validationErrors.teacherPassword = "password should be at least 8 char";
      }
    } else if (action === "Principal") {
      if (!formData.principalEmail.trim()) {
        validationErrors.principalEmail = "email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.principalEmail)) {
        validationErrors.principalEmail = "email is not valid";
      }
      if (!formData.principalPassword.trim()) {
        validationErrors.principalPassword = "password is required";
      } else if (formData.principalPassword.length < 8) {
        validationErrors.principalPassword = "password should be at least 8 char";
      }
    }

    setErrors(validationErrors);

    // Check if there are no validation errors
    if (Object.keys(validationErrors).length === 0) {
      // Authenticate the user
      if (action === "Teacher") {
        if (formData.teacherEmail === authCredentials.teacher.email && formData.teacherPassword === authCredentials.teacher.password) {
          toast.success('Logged In Successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => { navigate("/Teacherprofile"); }, 2000);
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
      } else if (action === "Principal") {
        if (formData.principalEmail === authCredentials.principal.email && formData.principalPassword === authCredentials.principal.password) {
          toast.success('Logged In Successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => { navigate("/Principalprofile"); }, 2000);
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
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/Forgot");
  };

  return (
    <form onSubmit={handleSubmit} id="teacher">
      <div className="login-page">
        <div className="box container">
          <div className="login-left">
            <img src={img} className="background-image" />
            <div className="stud">Teachers Login</div>
            <div className="text stud-1">{action}</div>
            <div className="underline"></div>

            <div className="submit-container">
            <div className="hover-effect">
                <div className={action === "Principal" ? "submit gray" : "submit"} onClick={() => { setAction("Teacher") }}>Teacher's Login</div>
              </div>
              <div className="hover-effect">
                <div className={action === "Teacher" ? "submit gray" : "submit"} onClick={() => { setAction("Principal") }}>Principal's Login</div>
              </div>
            </div>

            {action === "Teacher" ? (
              <div>
                <div className="input_box">
                  <img alt="" />
                  <input type="email" name="teacherEmail" placeholder="example@gmail.com" autoComplete='off' onChange={handleChange} />
                  {errors.teacherEmail && <span>{errors.teacherEmail}</span>}
                </div>
                <div className="input_box">
                  <img alt="" />
                  <input type="password" name="teacherPassword" placeholder="Password" onChange={handleChange} />
                  {errors.teacherPassword && <span>{errors.teacherPassword}</span>}
                </div>
                <div className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?<span>Click Here</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="input_box">
                  <img alt="" />
                  <input type="email" name="principalEmail" placeholder="example@gmail.com" autoComplete='off' onChange={handleChange} />
                  {errors.principalEmail && <span>{errors.principalEmail}</span>}
                </div>
                <div className="input_box">
                  <img alt="" />
                  <input type="password" name="principalPassword" placeholder="Password" onChange={handleChange} />
                  {errors.principalPassword && <span>{errors.principalPassword}</span>}
                </div>
                <div className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?<span>Click Here</span>
                </div>
              </div>
            )}
            <div className="submit-container hover-effect">
              <button className={action === "Principal's Login Teacher's Login" ? "submit gray" : "submit1"} type="submit">Submit</button>
            </div>
          </div>
          <div className="login-right">
            <Lottie animationData={text} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Student;