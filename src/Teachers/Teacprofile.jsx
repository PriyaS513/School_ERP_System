import React, {useState} from 'react';
import './Teacprofile.css';
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
    <div id = "Teacprofile" onClick={handleOutsideClick}>
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

      <div className="cards-container">
        <div className="card3">
          <div className="box add-student">
            <div className="content">
              <i className="fas fa-user-plus"></i>
              <h3>Student</h3>
              <p>Add a new student to the system.</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage')}>Add Student</a>
            </div>
          </div>
        </div>

        <div className="card3">
          <div className="box add-notice">
            <div className="content">
              <i className="fas fa-bullhorn"></i>
              <h3>Add Notice</h3>
              <p>Create and publish a new notice.</p>
              <a onClick={() => navigate('/Teacherprofile/Noticepage')}>Add Notice</a>
            </div>
          </div>
        </div>

        <div className="card3">
          <div className="box add-timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>Add Time Table</h3>
              <p>Set up a new class schedule.</p>
              <a onClick={() => navigate('/Teacherprofile/TimeTablepage')}>Add Time Table</a>
            </div>
          </div>
        </div>

        <div className="card3">
          <div className="box add-achievement">
            <div className="content">
              <i className="fas fa-trophy"></i>
              <h3>Add Achievement</h3>
              <p>Record a new student achievement.</p>
              <a onClick={() => navigate('/Teacherprofile/Achivementpage')}>Add Achievement</a>
            </div>
          </div>
        </div>

        <div className="card3">
          <div className="box add-attendance">
            <div className="content">
              <i className="fas fa-check-circle"></i>
              <h3>Add Attendance</h3>
              <p>Mark or update student attendance.</p>
              <a onClick={() => navigate('/Teacherprofile/Attendancepage')}>Add Attendance</a>
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