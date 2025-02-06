import React, { useState, useRef } from "react";
import "./Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import img from "../Images/student1.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudent() {

  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const handlePhotoClick = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    toast.success('Logout Successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => navigate('/'), 2000);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container')) setShowDropdown(false);
  };

  const [inputValue, setInputValue] = useState("");


  const download = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${inputValue}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const [StudformData, setStudFormData] = useState({
    name: "",
    sclass: "",
    regid: "",
    rollNo: "",
    add: "",
    father: "",
    mother: "",
    mobno: "",
    passw: "",
    confirmPass: "",
    adhar:"",
    image: null,
    qrcode: "",
  });

  const [errors, setErrors] = useState({});

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
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      setStudFormData({
        ...StudformData,
        image: event.target.files[0],
      });
    } else {
      setStudFormData({
        ...StudformData,
        [event.target.name]: event.target.value,
      });
    }
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const errors = validateForm(StudformData);
      if (Object.keys(errors).length === 0) {
        const formDataToSend = new FormData();
        Object.keys(StudformData).forEach((key) => {
          formDataToSend.append(key, StudformData[key]);
        });
        await axios.post(
          "http://localhost:8000/teacher/add_student/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        resetForm();
        toast.success('Student saved successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setErrors(errors);
      }
    } catch (error) {
      console.error("Error adding student data:", error);
    }
  };

  const validateForm = (StudformData) => {
    const errors = {};
    if (!StudformData.name) errors.name = "Name is required";
    if (!StudformData.sclass) {
      errors.sclass = "Class is required";
    } else if (!/^[1-9]$|^10$/.test(StudformData.sclass)) {
      errors.sclass = "Class should be a number between 1 to 10";
    }
    if (!StudformData.regid) errors.regid = "ID is required";
    if (!StudformData.mobno) {
      errors.mobno = "Mobile number is required";
    } else if (!/^\d{10}$/.test(StudformData.mobno)) {
      errors.mobno = "Mobile number is invalid";
    }
    if (!StudformData.rollNo) {
      errors.rollNo = "Roll number is required";
    } else if (!/^\d+$/.test(StudformData.rollNo)) {
      errors.rollNo = "Roll number should have numbers only";
    }
    if (!StudformData.add) errors.add = "Address is required";
    if (!StudformData.father) errors.father = "Father Name is required";
    if (!StudformData.mother) errors.mother = "Mother Name is required";
    if (!StudformData.adhar) {
      errors.adhar = "Adhar No is required";
    } else if (StudformData.adhar.length !== 12){
      errors.adhar = "Adhar No must be 12 digit";
    }
    if (!StudformData.passw.trim()) {
      errors.passw = "Password is required";
    } else if (StudformData.passw.length < 8) {
      errors.passw = "Password should be at least 8 characters";
    }
    if (!StudformData.confirmPass.trim()) {
      errors.confirmPass = "Confirm Password is required";
    } else if (StudformData.confirmPass !== StudformData.passw) {
      errors.confirmPass = "Password and Confirm Password should be the same";
    }
    return errors;
  };

  const fileInputRef = useRef(null);
  const boxSize = 80;

  const resetForm = () => {
    setImage(null);
    setInputValue("");
    setStudFormData({
      name: "",
      sclass: "",
      regid: "",
      rollNo: "",
      add: "",
      father: "",
      mother: "",
      mobno: "",
      passw: "",
      confirmPass: "",
      image: null,
      qrcode: "",
      adhar: "",
    });
    setErrors({});
    fileInputRef.current.value = "";
  };

  const resetFormPhoto = () => {
    setImage(null);
    fileInputRef.current.value = null;
  };


  return (
    <div id="Addstud" onClick={handleOutsideClick}>

      <div className="student-info-container">
        <div className="student-navbar">
          <div className="student-details">
            <h2 className="student-name">John Doe</h2>
            <p className="student-reg-no">Reg No: 123456789</p>
            <p className="student-reg-no">Teacher</p>
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
              className="dropdown-menu">
                <ul>
                  <li>
                    <a>John Doe</a>
                  </li>
                  <li>
                    <a>Reg No: 123456789</a>
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

      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate("/Teacherprofile/Studentpage")}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>

      <h2 className="heading-teac">Add Student details</h2>
      <form
        onSubmit={handleSubmit}
        action="student"
        method="post"
        id="student-form"
      >
        <div className="card-body media align-items-center">
          <img
            src={image || "https://bootdey.com/img/Content/avatar/avatar1.png"}
            alt="student"
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
                className="student-form-input-file"
                id="file-input"
                name="image"
                onChange={handleInputChangePhoto}
                ref={fileInputRef}
                accept="image/*"
                aria-label="Upload new photo"
                required
              />
            </label>
            <button
              type="button"
              className="btn btn-default md-btn-flat"
              onClick={resetFormPhoto}
            >
              Reset
            </button>
            <div className="small mt-1">
              Allowed JPG, GIF or PNG. Max size of 800K
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Name"
              name="name"
              required
              value={StudformData.name}
              onChange={handleInputChange}
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="sclass">Class</label>


            <input
              type="text"
              className={`form-control ${errors.sclass ? "is-invalid" : ""}`}
              id="sclass"
              placeholder="Class"
              name="sclass"
              value={StudformData.sclass}
              onChange={handleInputChange}
              required
            />
            {errors.sclass && (
                <div style={{ color: "red" }}>{errors.sclass}</div>
              )}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="regid">Student ID</label>




            <input
              type="text"
              className={`form-control ${errors.regid ? "is-invalid" : ""}`}
              id="regid"
              placeholder="ID"
              name="regid"
              required
              value={StudformData.regid}
              onChange={handleInputChange}
            />
            {errors.regid && (
                <div style={{ color: "red" }}>{errors.regid}</div>
              )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="rollNo">Roll No</label>
            <input
              type="text"
              className={`form-control ${errors.rollNo ? "is-invalid" : ""}`}
              id="rollNo"
              placeholder="Roll No"
              name="rollNo"
              value={StudformData.rollNo}
              required
              onChange={handleInputChange}
            />
            {errors.rollNo && (
                <div style={{ color: "red" }}>{errors.rollNo}</div>
              )}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="father">Father's Name</label>




            <input
              type="text"
              className={`form-control ${errors.father ? "is-invalid" : ""}`}
              id="father"
              placeholder="Father's Name"
              name="father"
              value={StudformData.father}
              onChange={handleInputChange}
              required
            />
            {errors.father && (
                <div style={{ color: "red" }}>{errors.father}</div>
              )}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mother">Mother's Name</label>
            <input
              type="text"
              className={`form-control ${errors.mother ? "is-invalid" : ""}`}
              id="mother"
              placeholder="Mother's Name"
              name="mother"
              value={StudformData.mother}
              onChange={handleInputChange}
              required
            />
            {errors.mother && (
                <div style={{ color: "red" }}>{errors.mother}</div>
              )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="add">Address</label>
            <input
              type="text"
              className={`form-control ${errors.add ? "is-invalid" : ""}`}
              id="add"
              placeholder="Address"
              name="add"
              value={StudformData.add}
              onChange={handleInputChange}
              required
            />
            {errors.add && <div style={{ color: "red" }}>{errors.add}</div>}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mobno">Mobile No</label>






            <input
              type="text"
              className={`form-control ${errors.mobno ? "is-invalid" : ""}`}
              id="mobno"
              placeholder="Mobile No"
              name="mobno"
              value={StudformData.mobno}
              onChange={handleInputChange}
              required
            />
            {errors.mobno && (
                <div style={{ color: "red" }}>{errors.mobno}</div>
              )}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="adhar">Adhar No</label>
            <input
              type="text"
              className={`form-control ${errors.adhar ? "is-invalid" : ""}`}
              id="adhar"
              placeholder="Adhar No"
              name="adhar"
              value={StudformData.adhar}
              onChange={handleInputChange}
              required
            />
            {errors.adhar && (
                <div style={{ color: "red" }}>{errors.adhar}</div>
              )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="passw">Password</label>
            <input
              type="password"
              className={`form-control ${errors.passw ? "is-invalid" : ""}`}
              id="passw"
              placeholder="Password"
              name="passw"
              value={StudformData.passw}
              onChange={handleInputChange}
              required
            />
            {errors.passw && (
                <div style={{ color: "red" }}>{errors.passw}</div>
              )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="confirmPass">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPass ? "is-invalid" : ""}`}
              id="confirmPass"
              placeholder="Confirm Password"
              name="confirmPass"
              value={StudformData.confirmPass}
              onChange={handleInputChange}
              required
            />
            {errors.confirmPass && (
                <div style={{ color: "red" }}>{errors.confirmPass}</div>
              )}
          </div>
        </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Mobile Number-Student ID</label>
              <input
                type="text"
                name="qrcode"
                placeholder="Enter Mobile Number-Student ID"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <div
                    style={{
                      height: "200px",
                      margin: "auto",
                      maxWidth: 120,
                      width: "100%",
                    }}
                  >

              <QRCode
                id="QRCode"
                style={{ height: "200px", maxwidth: "100%", width: "100%" }}
                value={inputValue}
                size={250}
                level={"H"}
                includeMargin={true}
                
              />
            </div>
          </div>
          <div className="form-group col-md-4">
            <button type="button" style={{marginTop: "100px", maxWidth: "80"}} className="btn btn-success" onClick={download} value="Download">
              Download QR Code
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
                  type="button"
                  className="btn btn-default"
                  onClick={resetForm}
                >
                  Cancel
                </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddStudent;
