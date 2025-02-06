import React, { useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import img from "../Images/student1.jpeg";
import axios from "axios";
import "./Form.css";
const EditStudent = () => {

  const { state } = useLocation();
  const [name, setName] = useState(state.name);
  const [sclass, setSclass] = useState(state.sclass);
  const [regid, setRegid] = useState(state.regid);
  const [rollNo, setRollNo] = useState(state.rollNo);
  const [add, setAdd] = useState(state.add);
  const [father, setFather] = useState(state.father);
  const [mother, setMother] = useState(state.mother);
  const [mobno, setMobno] = useState(state.mobno);
  const [passw, setPassw] = useState(state.passw);
  const [confirmPass, setConfirmPass] = useState(state.confirmPass);
  const [adhar, setAdhar] = useState(state.adhar);
  const [StudformData, setStudformData] = useState(state);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState('');

  const [inputValue, setInputValue] = useState("");

  const handleInputChangeName = (event) => {
    setName(event.target.value);
    setStudformData({ ...StudformData, name: event.target.value });
  };

  const handleInputChangeSclass = (event) => {
    setSclass(event.target.value);
    setStudformData({ ...StudformData, sclass: event.target.value });
  };

  const handleInputChangeRegid = (event) => {
    setRegid(event.target.value);
    setStudformData({ ...StudformData, regid: event.target.value });
  };

  const handleInputChangeRollNo = (event) => {
    setRollNo(event.target.value);
    setStudformData({ ...StudformData, rollNo: event.target.value });
  };

  const handleInputChangeAdd = (event) => {
    setAdd(event.target.value);
    setStudformData({ ...StudformData, add: event.target.value });
  };

  const handleInputChangeFather = (event) => {
    setFather(event.target.value);
    setStudformData({ ...StudformData, father: event.target.value });
  };

  const handleInputChangeMother = (event) => {
    setMother(event.target.value);
    setStudformData({ ...StudformData, mother: event.target.value });
  };

  const handleInputChangeMobno = (event) => {
    setMobno(event.target.value);
    setStudformData({ ...StudformData, mobno: event.target.value });
  };

  const handleInputChangePassw = (event) => {
    setPassw(event.target.value);
    setStudformData({ ...StudformData, passw: event.target.value });
  };

  const handleInputChangeConfirmPass = (event) => {
    setConfirmPass(event.target.value);
    setStudformData({ ...StudformData, confirmPass: event.target.value });
  };

  const handleInputChangeAdhar = (event) => {
    setAdhar(event.target.value);
    setStudformData({ ...StudformData, adhar: event.target.value });
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

  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      // If the input is an image, set the image property in formData
      setStudformData({
        ...StudformData,
        image: event.target.files[0], // Set the image file
      });
    } else {
      // For other inputs, update the formData as usual
      setStudformData({
        ...StudformData,
        [event.target.name]: event.target.value,
      });
    }
    setErrors({});
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(StudformData);
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit the data
      try {
        const formDataToSend = new FormData();
        // Append all form data to formDataToSend
        Object.keys(StudformData).forEach((key) => {
          formDataToSend.append(key, StudformData[key]);
        });
        const response = await axios.post(
          "http://localhost:8000/teacher/add_student/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
            },
          }
        );
        console.log(response.data);
        // Reset the form data and errors
        resetForm();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error("Error adding student data: Forbidden");
        } else {
          console.error("Error adding student data:", error);
        }
      }
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (StudformData) => {
    const errors = {};
    if (!StudformData.name) {
      errors.name = "Name is required";
    }
    if (!StudformData.sclass) {
      errors.sclass = "Class is required";
    } else if (!/^[1-9]$|^10$/.test(StudformData.sclass)) {
      errors.sclass = "Class should be a number between 1 to 10";
    }
    if (!StudformData.regid) {
      errors.regid = "ID is required";
    }

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

    if (!StudformData.add) {
      errors.add = "Address is required";
    }

    if (!StudformData.father) {
      errors.father = "Father Name is required";
    }

    if (!StudformData.mother) {
      errors.mother = "Mother Name is required";
    }
    if(!StudformData.adhar) {
      errors.adhar = "Adhar No is required";
    } else if (StudformData.adhar.length != 12){
      errors.adhar = "Adhar No must be 12 digit";
    }
    if (!StudformData.passw.trim()) {
      errors.passw = "Password is required";
    } else if (StudformData.passw.length < 8) {
      errors.passw = "password should be at least 8 char";
    }
    if (!StudformData.confirmPass.trim()) {
      errors.confirmPass = "Confirm Password is required";
    } else if (StudformData.confirmPass !== StudformData.passw) {
      errors.confirmPass = "Password and Confirm Password should be same";
    }

    return errors;
  };

  const fileInputRef = useRef(null);
  const boxSize = 80;

  const resetForm = () => {
    setName(state.name);
    setSclass(state.sclass);
    setRegid(state.regid);
    setRollNo(state.rollNo);
    setAdd(state.add);
    setFather(state.father);
    setMother(state.mother);
    setMobno(state.mobno);
    setPassw(state.passw);
    setConfirmPass(state.confirmPass);
    setAdhar(state.adhar);
    setImage('');
    setInputValue("");
    setErrors({});
    fileInputRef.current.value = "";
  };

  const resetFormPhoto = () => {
    setImage('');
    fileInputRef.current.value = null;
  };

  //download
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

      //name of image
      downloadLink.download = `${inputValue}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePhotoClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container')) {
      setShowDropdown(false);
    }
  };
  return (
    <div id="EditStud" onClick={handleOutsideClick}>
        <div className="student-info-container">
        <div className="student-navbar">
          <div className="student-details">
            <h2 className="student-name">John Doe</h2>
            <p className="student-reg-no">Reg No: 123456789</p>
            <p className="student-reg-no">Seventh - A</p>
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
                    <a >John Doe</a>
                  </li>
                  <li>
                    <a >Reg No: 123456789</a>
                  </li>
                  <li>
                    <a >Seventh</a>
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
      <button className="home-button" onClick={() => window.history.back()}>
      <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
</button>
      </div>
      <h2 className="heading-teac">Edit Student details</h2>
      <form onSubmit={handleSubmit} action="student" method="post" id="student-form">
        <div className="card-body media align-items-center">
          <img
            src={image || "https://bootdey.com/img/Content/avatar/avatar1.png"}
            alt="student"
            className="d-block ui-w-80"
            style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div className="media-body ml-4">
              <label htmlFor="file-input" className="btn btn-outline-primary">
                Upload New Photo
                <input
                type="file"
                className="account-settings-fileinput"
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
                Reset Photo
              </button>
              <div className="small mt-1">
              Allowed JPG, GIF or PNG. Max size of 800K
            </div>
            </div>
          </div>
        
          <div className="form-row">
          <div className="form-group col-md-4">
          
            <label>Name</label>
            <input
              type="text"
              className="form-control mb-1"
                id="name-input"
                name="name"
                required
              value={name}
              onChange={handleInputChangeName}
               placeholder="Enter Name"
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          
            </div>
            <div className=" form-group col-md-4">
            <label>Class</label>
            <input
              type="text"
              value={sclass}
              onChange={handleInputChangeSclass}
              className="form-control"
                id="class-input"
                name="sclass"
                required
                placeholder="Enter Class"
            />
            {errors.sclass && (
                <div style={{ color: "red" }}>{errors.sclass}</div>
              )}
         
          </div>
          

          <div className="form-group col-md-4">
            <label>Registration ID</label>
            <input
              type="text"
              className="form-control mb-1"
              id="id-input"
              name="regid"
              required
              value={regid}
              onChange={handleInputChangeRegid}
              placeholder="Enter Registration ID"
            />
            {errors.regid && (
                <div style={{ color: "red" }}>{errors.regid}</div>
              )}
        </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-4">
          
            <label>Roll No</label>
            <input
              type="text"
              className="form-control mb-1"
                id="roll-input"
                name="rollNo"
                required
              value={rollNo}
              onChange={handleInputChangeRollNo}
              placeholder="Enter Roll No"
            />
            {errors.rollNo && (
                <div style={{ color: "red" }}>{errors.rollNo}</div>
              )}
            </div>
         

          
          <div className="form-group col-md-4">
          
            <label>Address</label>
            <input
              type="text"
              className="form-control"
                id="add-input"
                name="add"
                required
              value={add}
              onChange={handleInputChangeAdd}
              placeholder="Enter Address"
            />
            {errors.add && <div style={{ color: "red" }}>{errors.add}</div>}
            </div>
      
          <div className="form-group col-md-4">
          
            <label>Father's Name</label>
            <input
              type="text"
              className="form-control mb-1"
                id="father-input"
                name="father"
                required
              value={father}
              onChange={handleInputChangeFather}
              placeholder="Enter Father's Name"
            />
            {errors.father && (
                <div style={{ color: "red" }}>{errors.father}</div>
              )}
            </div>
         
        </div>

          <div className="form-row">
          <div className="form-group col-md-4">
        
            <label>Mother's Name</label>
            <input
              type="text"
              className="form-control mb-1"
                id="mother-input"
                name="mother"
                required
              value={mother}
              onChange={handleInputChangeMother}
              placeholder="Enter Mother's Name"
            />
            {errors.mother && (
                <div style={{ color: "red" }}>{errors.mother}</div>
              )}
            </div>
        

         
          <div className="form-group col-md-4">
          
            <label>Mobile No</label>
            <input
              type="tel"
              className="form-control mb-1"
              id="mobile-input"
              name="mobno"
              required
              value={mobno}
              onChange={handleInputChangeMobno}
              placeholder="Enter Mobile No"
            />
            {errors.mobno && (
                <div style={{ color: "red" }}>{errors.mobno}</div>
              )}
            </div>

          
          
            <div className="form-group col-md-4">
          
          <label>Aadhar No</label>
          <input
            type="text"
            className="form-control mb-1"
              id="adhar-input"
              name="adhar"
              required
            value={adhar}
            onChange={handleInputChangeAdhar}
            placeholder="Enter Adhar No"
          />
          {errors.adhar && (
              <div style={{ color: "red" }}>{errors.adhar}</div>
            )}
        </div>

         </div>
         <div className="form-row">
            <div className="form-group col-md-6">
          
            <label>Password</label>
            <input
              type="password"
              className="form-control mb-1"
                id="pass-input"
                name="passw"
            required
              value={passw}
              onChange={handleInputChangePassw}
              placeholder="Enter Password"
            />
            {errors.passw && (
                <div style={{ color: "red" }}>{errors.passw}</div>
              )}
            </div>
            
            <div className="form-group col-md-6">
         
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mb-1"
                id="confirm-input"
                name="confirmPass"
                required
              value={confirmPass}
              onChange={handleInputChangeConfirmPass}
              placeholder="Confirm Password"
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
                value={inputValue}
                placeholder="Enter Mobile Number-Student ID"
                onChange={(e) => setInputValue(e.target.value)}
              />
          </div>

          <div className="form-group col-md-4">
        
            <div className="gen">
                <div
                      style={{
                        height: "200px",
                      margin: "auto",
                      maxWidth: 120,
                      width: "100%",
                      }}
                    >
                    <QRCode
                    size={250}
                    style={{ height: "200px", maxwidth: "100%", width: "100%" }}
                    value={inputValue}
                    viewBox={`0 0 256 256`}
                    id="QRCode"
                    includeMargin={true}
                  />
                </div>
            </div>
          </div>

          <div className="form-group col-md-4">
          <button type="button" style={{marginTop: "100px", maxWidth: "80"}} className="btn btn-success" onClick={download} value="Download">
              Download QR Code
            </button>
          </div>

       </div>

          <div className="form-row">
            <div className="form-group col-md-6">
            <div className="save">
            <button type="submit" className="btn btn-primary">
              Update Student
            </button>
            <button type="button" className="btn btn-default" onClick={resetForm}>
              Reset Form
            </button>
            </div>
            </div>
          </div>
 
        </form>
      </div>
    );
  };
  
  export default EditStudent;