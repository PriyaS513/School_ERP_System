import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as defaults } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Circle } from "rc-progress";
import CountUp from "react-countup";
import "./Attendance.css";
import img from '../Images/student1.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Chart.register(BarElement, CategoryScale, LinearScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const StudentProfile = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(5);

  const handlePhotoClick = () => {
    setShowDropdown(!showDropdown);
  };

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
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container')) {
      setShowDropdown(false);
    }
  };

  // Mock attendance data for demonstration
  const attendanceData = [
    // July 2024
    { date: '2024-07-01', attendance: 'Present' },
    { date: '2024-07-02', attendance: 'Absent' },
    { date: '2024-07-03', attendance: 'Present' },
    { date: '2024-07-04', attendance: 'Present' },
    { date: '2024-07-05', attendance: 'Absent' },
    { date: '2024-07-06', attendance: 'Present' },
    { date: '2024-07-07', attendance: 'Present' },
    { date: '2024-07-08', attendance: 'Absent' },
    { date: '2024-07-09', attendance: 'Present' },
    { date: '2024-07-10', attendance: 'Present' },
  
    // August 2024
    { date: '2024-08-01', attendance: 'Present' },
    { date: '2024-08-02', attendance: 'Absent' },
    { date: '2024-08-03', attendance: 'Present' },
    { date: '2024-08-04', attendance: 'Present' },
    { date: '2024-08-05', attendance: 'Present' },
    { date: '2024-08-06', attendance: 'Absent' },
    { date: '2024-08-07', attendance: 'Present' },
    { date: '2024-08-08', attendance: 'Present' },
  
    // September 2024
    { date: '2024-09-01', attendance: 'Absent' },
    { date: '2024-09-02', attendance: 'Present' },
    { date: '2024-09-03', attendance: 'Present' },
    { date: '2024-09-04', attendance: 'Absent' },
    { date: '2024-09-05', attendance: 'Present' },
    { date: '2024-09-06', attendance: 'Present' },
    { date: '2024-09-07', attendance: 'Absent' },
    { date: '2024-09-08', attendance: 'Present' },
  
    // October 2024
    { date: '2024-10-01', attendance: 'Present' },
    { date: '2024-10-02', attendance: 'Present' },
    { date: '2024-10-03', attendance: 'Absent' },
    { date: '2024-10-04', attendance: 'Present' },
    { date: '2024-10-05', attendance: 'Present' },
    { date: '2024-10-06', attendance: 'Absent' },
    { date: '2024-10-07', attendance: 'Present' },
    { date: '2024-10-08', attendance: 'Present' },
  
    // November 2024
    { date: '2024-11-01', attendance: 'Absent' },
    { date: '2024-11-02', attendance: 'Present' },
    { date: '2024-11-03', attendance: 'Present' },
    { date: '2024-11-04', attendance: 'Absent' },
    { date: '2024-11-05', attendance: 'Present' },
    { date: '2024-11-06', attendance: 'Present' },
    { date: '2024-11-07', attendance: 'Absent' },
    { date: '2024-11-08', attendance: 'Present' },
  
    // December 2024
    { date: '2024-12-01', attendance: 'Present' },
    { date: '2024-12-02', attendance: 'Absent' },
    { date: '2024-12-03', attendance: 'Present' },
    { date: '2024-12-04', attendance: 'Present' },
    { date: '2024-12-05', attendance: 'Absent' },
    { date: '2024-12-06', attendance: 'Present' },
    { date: '2024-12-07', attendance: 'Present' },
    { date: '2024-12-08', attendance: 'Absent' },
  ];
  


  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Determine the academic year start and end
  const isAfterApril = currentMonth > 3; // After April (May and beyond)
  const startYear = isAfterApril ? currentYear : currentYear - 1; // June of the same year or previous year
  const endYear = startYear + 1; // Ends in April of the next year

  const startDate = new Date(currentYear, selectedMonth, 1);
  const endDate = new Date(currentYear, selectedMonth + 1, 0);
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

  const presentDays = attendanceData.filter(
    (attendance) =>
      new Date(attendance.date).getMonth() === selectedMonth &&
      attendance.attendance === "Present"
  ).length;
  const percentage = (presentDays / totalDays) * 100;


  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  return (
    <div id="attendance" onClick={handleOutsideClick}>
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
            <div className="dropdown-menu">
              <ul>
                <li>
                  <a>John Doe</a>
                </li>
                <li>
                  <a>Reg No: 123456789</a>
                </li>
                <li>
                  <a>Seventh</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="format">
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate('/Studentprofile')}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
          </button>
        </div>

        <div className="selectMenu">
      <h2>
        Attendance for the Academic Year: {`June ${startYear} - April ${endYear}`}
      </h2>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {Array.from({ length: 11 }, (_, index) => {
          const month = (index + 5) % 12; // Loop from June (5) to April (4)
          const year = month < 5 ? endYear : startYear; // Months Jan-Apr are in the next year
          return (
            <option key={index} value={month}>
              {new Date(year, month, 1).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </option>
          );
        })}
      </select>
    </div>
        
        <div className="container-attendance">
          <div className="information">
            <h3>
              Total Days: <CountUp start={0} end={totalDays} delay={3} />
              <div className="roundProgress">
                <Circle
                  percent={100}
                  strokeWidth={10}
                  trailWidth={8}
                  strokeColor="blue"
                  trailColor="#b3a4f3"
                />
                <span className="circle-text">{totalDays} Days</span>
              </div>
            </h3>
          </div>
          <div className="information">
            <h3>
              Present Days: <CountUp start={0} end={presentDays} delay={3} />
              <div className="roundProgress">
                <Circle
                  percent={(presentDays / totalDays) * 100}
                  strokeWidth={10}
                  trailWidth={8}
                  strokeColor="blue"
                  trailColor="#b3a4f3"
                />
                <span className="circle-text">{presentDays} Days</span>
              </div>
            </h3>
          </div>
          <div className="information">
            <h3>
              Percentage:{" "}
              <CountUp start={0} end={percentage.toFixed(2)} delay={3} />
              <div className="roundProgress">
                <Circle
                  percent={percentage.toFixed(2)}
                  strokeWidth={10}
                  trailWidth={8}
                  strokeColor="blue"
                  trailColor="#b3a4f3"
                />
                <span className="circle-text">{percentage.toFixed(2)}%</span>
              </div>
            </h3>
          </div>
        </div>

        <div className="App1">
          <div className="dataCard revenueCard">
            <div className="cardHeader">
              <div className="barGraph">
                <Bar
                  data={{
                    labels: [
                      "June", "July", "August", "September", "October", 
                      "November", "December", "January", "February", "March", "April",
                    ],
                    datasets: [
                      {
                        label: "Attendance",
                        data: [23, 31, 30, 23, 23, 23, 23, 23, 23, 23, 23],
                        backgroundColor: [
                          "rgba(43, 63, 229, 0.8)",
                          "rgba(250, 192, 19, 0.8)",
                          "rgba(253, 135, 135, 0.8)",
                        ],
                        borderRadius: 5,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        type: "category",
                      },
                      y: {
                        type: "linear",
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentProfile;
