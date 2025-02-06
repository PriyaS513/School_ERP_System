import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./TimeTableTeacher.css";
import img from '../Images/student1.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Studentprofile = () => {
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

  return(               
        <div id="displayStudTT">
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

      <div div className="format">
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate('/Teacherprofile/TimeTablepage')}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>
      </div>
                            <div className="container-fluid">
                                    <h2>Time Table</h2>
                                    <div className="table-responsive">
                                    <table className="table time-table">
                                        <thead>
                                            <tr>
                                                <th>Day</th>
                                                <th>9:30-10:20</th>
                                                <th>10:20-11:10</th>
                                                <th>11:10-12:00</th>
                                                <th>12:00-12:40</th>
                                                <th>12:40-1:30</th>
                                                <th>1:30-2:20</th>
                                                <th>2:20-3:10</th>
                                                <th>3:10-4:00</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="highlight"><b>Monday</b></td>
                                                <td>English</td>
                                                <td>Math</td>
                                                <td>Chemistry</td>
                                                <td rowSpan="6" className="special"><b>LUNCH</b></td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>Physics</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Tuesday</b></td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>English</td>
                                                <td>Chemistry</td>
                                                <td>Math</td>
                                                <td className="special">SPORTS</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Wednesday</b></td>
                                                <td>Math</td>
                                                <td>Physics</td>
                                                <td>English</td>
                                                <td>Chemistry</td>
                                                <td colSpan="3">LIBRARY</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Thursday</b></td>
                                                <td>Physics</td>
                                                <td>English</td>
                                                <td>Chemistry</td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>Math</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Friday</b></td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>Math</td>
                                                <td>Chemistry</td>
                                                <td>English</td>
                                                <td>Physics</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Saturday</b></td>
                                                <td>English</td>
                                                <td>Chemistry</td>
                                                <td>Math</td>
                                                <td colSpan="3">SEMINAR</td>
                                                <td className="special">SPORTS</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <ToastContainer />
                        </div>

  );
};

export default Studentprofile;