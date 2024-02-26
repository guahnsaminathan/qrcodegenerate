import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import '../styles/AdminRegister.css';
import { Link } from 'react-router-dom'; // Import CSS file for styling

function AdminRegister() {
  const videoRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false); // State variable to track camera status
  const [scannedData, setScannedData] = useState(new Set()); // Use a Set to store unique scanned data
  const [attendance, setAttendance] = useState({}); // State variable to track attendance status

  useEffect(() => {
    if (cameraOn) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [cameraOn]);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => console.error('Error accessing the camera:', err));
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    }
    videoRef.current.srcObject = null; // Set srcObject to null to prevent black screen
  };

  const toggleCamera = () => {
    setCameraOn(prevState => !prevState); // Toggle camera status
  };

  const scan = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const scanInterval = setInterval(() => {
      if (!video || !cameraOn) return;

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      context.drawImage(video, 0, 0, videoWidth, videoHeight);
      const imageData = context.getImageData(0, 0, videoWidth, videoHeight);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code && !scannedData.has(code.data)) { // Check if the code is not already scanned
        console.log('Found QR code:', code.data);
        setScannedData(prevData => new Set(prevData).add(code.data)); // Add scanned data to the Set
        setAttendance(prevAttendance => ({
          ...prevAttendance,
          [code.data]: { present: true }, // Mark attendee as present
        }));
      }
    }, 1000);

    return () => clearInterval(scanInterval);
  };

  useEffect(() => {
    const scanInterval = scan();
    return () => clearInterval(scanInterval);
  }, [cameraOn]); // Trigger scanning when camera status changes

  return (
    <>
      <nav>
        <ul>
        <li><Link to="/admin">Home</Link></li>
          <li><Link to="/home">Scanner</Link></li>
          <li><Link to="/hostel">members</Link></li>
        </ul>
      </nav>
      <div className="camera-container">
        <video ref={videoRef} className="camera" playsInline></video>
        <div className="scanned-values">
          <h2>Attendance:</h2>
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>QR Code</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {[...scannedData].map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data}</td>
               <div>
               <td>{attendance[data] && attendance[data].present ? 'Present' : 'Absent'}</td>

               </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="status-bar">
          <button onClick={toggleCamera}>{cameraOn ? 'Turn off camera' : 'Turn on camera'}</button>
        </div>
      </div>
    </>
  );
}

export default AdminRegister;
