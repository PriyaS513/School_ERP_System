import React, { useState, useRef } from 'react';
import axios from "axios";
import '../Components/Studprofile.css';
import './TimeTable.css';
import img from '../Images/TimeTable.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import imgLogo from '../Images/student1.jpeg';
function StudentTimeTable() {
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
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
  // Validation for addin time table 
  const [SelfTimeTable, setSelfTimeTable] = useState({
    image:null
  });

  const [errors, setErrors] = useState({});

  const handleInputChangePhoto = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    const fileSize = file.size;

    if (!['image/jpeg', 'image/gif', 'image/png'].includes(fileType)) {
      alert('Only JPG, GIF and PNG files are allowed');
      return;
    }
  
    if (fileSize > 819200) {
      alert('File size exceeds 800KB');
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
      setSelfTimeTable({
      ...SelfTimeTable,
      image: event.target.files[0], // Set the image file
      });
      setErrors({});
    };
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (Object.keys(errors).length === 0) {
        // Form is valid, submit the data
        const confirmResult = await confirmAlert({
          title: 'Confirm to upload',
          message: 'Are you sure to upload your time table?',
          buttons: [
            {
              label: 'Yes',
              onClick: async () => {
                // Yes button clicked, proceed with uploading
                const formDataToSend = new FormData();
                // Append all form data to formDataToSend
                Object.keys(SelfTimeTable).forEach((key) => {
                  formDataToSend.append(key, SelfTimeTable[key]);
                });
                await axios.post(
                  "http://localhost:8000/teacher/add_student/",
                  formDataToSend,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
                    },
                  }
                );
              },
            },
            {
              label: "No",
              onClick: () => {
                // No button clicked, do nothing
              },
            },
          ],
        });
        // Wait for confirmAlert to resolve before proceeding
        if (confirmResult) {
          // Yes button clicked, proceed with uploading
        } else {
          // No button clicked, do nothing
        }
      } else {
        setErrors(errors);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error("Error adding student data: Forbidden");
      } else {
        console.error("Error adding student data:", error);
      }
    }
    resetFormPhoto();
  };

  const fileInputRef = useRef(null);
  const boxSize = 500; 
        const resetFormPhoto = () => {
          setImage(null); // reset the image state variable to null
          fileInputRef.current.value = null;
        };

  return (
    <div id="SelfTT" className="containerTT" onClick={handleOutsideClick}>
      <div className="student-info-container">
      <div className="student-navbar">
        <div className="student-details">
          <h2 className="student-name">John Doe</h2>
          <p className="student-reg-no">Reg No: 123456789</p>
          <p className="student-reg-no">Teacher</p>
        </div>
        <div className="student-photo-container">
        <img
              src={imgLogo}
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
                    <a onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
      </div>
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate('/Teacherprofile/TimeTablepage')}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>
      <h2 className="text-center mb-4">Upload Student Time Table</h2>
      <form onSubmit={handleSubmit} id="self-tt" className="form-container">
  <div className="form-group d-flex flex-column align-items-center">
    <label htmlFor="file-input" className="btn btn-outline-primary upload-button">
      Upload new photo
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
    <button type="button" className="btn btn-default reset-button" onClick={resetFormPhoto}>
      Reset
    </button>
  </div>
  <div className="small mt-1 allowed-types">
    Allowed JPG, GIF or PNG. Max size of 800K
  </div>
  <div className="image-preview">
    <img
      src={image || img}
      alt="preview"
      className="preview-image"
    />
  </div>
  <button type="submit" className="btn btn-primary submit-button mt-4">
    Upload
  </button>
</form>

    </div>
    <ToastContainer />
  </div>
  );
}

export default StudentTimeTable;