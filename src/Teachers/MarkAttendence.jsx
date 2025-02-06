import React, { useState } from 'react';
import './MarkAttendence.css';
import axios from "axios";
import {QrReader} from 'react-qr-reader';
import QrScanner from "qr-scanner";
import { useNavigate } from 'react-router-dom';
import img from '../Images/student1.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Teachnav from "./teachernav.jsx";



function MarkAttendance() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

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

  const [result, setResult] = useState("");

  const readCode = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then(result => setResult(result.data))
      .catch(e => console.log(e));
  };

  const [webCamResult, setWebCamResult] = useState();

  const webcamError = (error) => {
    if (error) {
      console.log(error);
    }
  };

  const webcamScan = (result) => {
    if (result) {
      const [mobile, regId] = result.split("-");
      setWebCamResult(mobile);
      sendSMS(mobile, regId);
      toast.success('Attendance marked successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
   
  const sendSMS = (mobile, regId) => {
    console.log(mobile);
     console.log(regId);
    axios.post(`https://school-erp-system-ufbu.onrender.com/Teachers/sendsms/`, {
      mobile_number: mobile,
      regid: regId,
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const isMobileDevice = () => {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };

  return (
    <div id="MarkAttendance" onClick={handleOutsideClick}>
      <div id="teachnav">
    <Teachnav/>
    </div>
           <div className="home-button-container">
        <button className="home-button" onClick={() => navigate('/Teacherprofile/Attendancepage')}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>
      <div className="attendence">
        <div className='webcam'>
          <div>
            <div>
              <h3>Webcam</h3>
            </div>
            <div>
              <QrReader
                delay={300}
                onError={webcamError}
                onScan={webcamScan}
                legacyMode={false}
                facingMode={isMobileDevice() ? "environment" : "user"}
              />
            </div>
            <div>
              <h6>Mob No : {webCamResult}</h6>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MarkAttendance;
