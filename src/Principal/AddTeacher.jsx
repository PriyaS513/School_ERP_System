import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Teachers/Form.css";
import axios from "axios";
import img from "../Images/student1.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Principal = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePhotoClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Add logout logic here
    toast.success('Logout Successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container')) {
      setShowDropdown(false);
    }
  };

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    regid:"",
    email: "",
    mobile: "",
    education: "",
    post: "",
    passw: "",
    confirmPass: "",
    image: null, //Add image property to formData
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      // If the input is an image, set the image property in formData
      setFormData({
        ...formData,
        image: event.target.files[0], // Set the image file
      });
    } else {
      // For other inputs, update the formData as usual
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
    setErrors({});
  };

  const handleInputChangePhoto = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    const fileSize = file.size;

    if (!["image/jpeg", "image/gif", "image/png"].includes(fileType)) {
      alert("Only JPG, GIF and PNG files are allowed");
      return;
    }

    if (fileSize > 819200) {
      alert("File size exceeds 800KB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        const response = await axios.post(
          "http://localhost:8000/principal/add_teacher/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);
        toast.success('Teacher saved successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        resetForm();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error("Error adding teacher data: Forbidden");
        } else {
          console.error("Error adding teacher data:", error);
        }
      }
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.regid) {
      errors.regid = "ID is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number is invalid";
    }
    if (!formData.education) {
      errors.education = "Education is required";
    }
    if (!formData.post) {
      errors.post = "Post is required";
    }
    if (!formData.passw.trim()) {
      errors.passw = "Password is required";
    } else if (formData.passw.length < 8) {
      errors.passw = "password should be at least 8 char";
    }
    if (!formData.confirmPass.trim()) {
      errors.confirmPass = "Confirm Password is required";
    } else if (formData.confirmPass !== formData.passw) {
      errors.confirmPass = "Password and Confirm Password should be same";
    }
    return errors;
  };
  const boxSize = 80;

  const fileInputRef = useRef(null);

const resetForm = () => {
  setImage(null);
  // Reset the form data and errors
  setFormData({
    name: "",
    regid: "",
    email: "",
    mobile: "",
    education: "",
    post: "",
    passw: "",
    confirmPass: "",
    image: null,
  });
  setErrors({});
  fileInputRef.current.value = "";
  fileInputRef.current.files = null;
  fileInputRef.current = null; // Create a new reference to the file input element
};
  const resetFormPhoto = () => {
    setImage(null); // reset the image state variable to null
    fileInputRef.current.value = null;
  };

  return (
    <div id="AddTeacher" onClick={handleOutsideClick}>
      <div className="student-info-container">
        <div className="student-navbar">
          <div className="student-details">
            <h2 className="student-name">John Doe</h2>
            <p className="student-reg-no">Reg No: 123456789</p>
            <p className="student-reg-no">Principal</p>
          </div>
          <div className="student-photo-container">
            <img
              src={img}
              alt="Student"
              className="student-photo"
              onClick={handlePhotoClick}
            />
            {showDropdown && (
              <div
                className="dropdown-menu"
              >
                <ul>
                  <li>
                    <a >John Doe</a>
                  </li>
                  <li>
                    <a >Reg No: 123456789</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* < div className="format"> */}
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate("/Principalprofile")}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>
      <h2 className="heading-teac">Add Teacher details</h2>
      <form
        onSubmit={handleSubmit}
        action="teacher"
        method="post"
        id="teacher-form"
      >
        <div className="card-body media align-items-center">
          <img
            src={image || "https://bootdey.com/img/Content/avatar/avatar1.png"}
            alt="teacher"
            className="d-block ui-w-80"
            style={{
              width: `${boxSize}px`,
              height: `${boxSize}px`,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <div className="media-body ml-4">
            <label htmlFor="file-input" className="btn btn-outline-primary">
              Upload new photo
              <input
                type="file"
                className="account-settings-fileinput"
                id="file-input"
                name="image"
                onChange={handleInputChangePhoto}
                accept="image/*"
                ref={fileInputRef}
                aria-label="Upload new photo"
                required
              />
            </label>{" "}
            <button
              type="button"
              className="btn btn-default md-btn-flat"
              onClick={resetFormPhoto}
            >
              Reset
            </button>
            <div className="small mt-1">
              Allowed JPG,GIF or PNG. Max size of 800K
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
          <label>Name</label>
            <input
              type="text"
              className="form-control mb-1"
              id="name-input"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              required
            />
                        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          </div>
          <div className="form-group col-md-6">
          <label>Registration Id</label>
            <input
              type="text"
              className="form-control"
              id="id-input"
              name="regid"
              value={formData.regid}
              onChange={handleInputChange}
              placeholder="Enter Teacher Id"
              required
            />
            {errors.regid && <div style={{ color: "red" }}>{errors.regid}</div>}
          </div>
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
          <label>Email Id</label>
            <input
              type="email"
              className="form-control mb-1"
              id="email-input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
          </div>
          <div className="form-group col-md-6">
          <label>Mobile No</label>
            <input
              type="tel"
              className="form-control"
              id="mobile-input"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
              required
            />
            {errors.mobile && <div style={{ color: "red" }}>{errors.mobile}</div>}
          </div>
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
          <label>Education</label>
            <input
              type="text"
              className="form-control mb-1"
              id="education-input"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="Enter education"
              required
            />
            {errors.education && <div style={{ color: "red" }}>{errors.education}</div>}
          </div>
          <div className="form-group col-md-6">
          <label>Post</label>
            <input
              type="text"
              className="form-control"
              id="post-input"
              name="post"
              value={formData.post}
              onChange={handleInputChange}
              placeholder="Enter post"
              required
            />
            {errors.post && <div style={{ color: "red" }}>{errors.post}</div>}
          </div>
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
          <label>Enter Password</label>
            <input
              type="password"
              className="form-control mb-1"
              id="post-input"
              name="passw"
              value={formData.passw}
              onChange={handleInputChange}
              placeholder="Enter Password"
              required
            />
            {errors.passw && <div style={{ color: "red" }}>{errors.passw}</div>}
          </div>
          <div className="form-group col-md-6">
          <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirm-input"
              name="confirmPass"
              value={formData.confirmPass}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPass && <div style={{ color: "red" }}>{errors.confirmPass}</div>}
          </div>
        </div>
        <div className="form-row">
        <div className="form-group col-md-6">
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
          <button type="button" className="btn btn-default" onClick={resetForm}>
            Reset From
          </button>
        </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Principal;