import React, {useState} from 'react';
import './Studprofile.css';
import img from '../Images/student1.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentInfo = () => {
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
    <div id="Studprofile" onClick={handleOutsideClick}>
    <div className="student-info-container">
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

      <div className="cards-container">
        <div className="card3">
          <div className="box attendance">
            <div className="content">
              <i className="fas fa-calendar-check"></i>
              <h3>Attendance</h3>
              <p>Your attendance details.</p>
              <a onClick={() => navigate('/Studentprofile/Attendance')}>View Attendance</a>
            </div>
          </div>
        </div>

        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>Time Table</h3>
              <p>Your class schedule.</p>
              <a onClick={() => navigate('/Studentprofile/TimeTable')}>View Time Table</a>
            </div>
          </div>
        </div>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StudentInfo;