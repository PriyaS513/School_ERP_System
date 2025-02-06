import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import img from '../Images/student1.jpeg';
import "./TimeTable.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Studenttimetable = () => {
  const [timetableUrl, setTimetableUrl] = useState(null);
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

  return (
    <div id="displayStudTT" onClick={handleOutsideClick}>
        <div className="student-navbar">
        <div className="student-details">
          <h2 className="student-name">John Doe</h2>
          <p className="student-reg-no">Reg No: 123456789</p>
          <p className="student-reg-no">Seventh</p>
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

      <div div className="format">
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate('/Studentprofile')}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
        Back
        </button>
      </div>
      </div>
      <div className="container-fluid">
        <h2>Time Table</h2>
        <div className="table-responsive">
        {timetableUrl ? (
                        <img src={timetableUrl} alt="Timetable" className="uploaded-timetable" />
                    ) : (
                        <p>No timetable uploaded yet.</p>
                    )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Studenttimetable;
