import React from 'react'
import { Link } from 'react-router-dom'; 
import hostel from "../assets/hotel_mess.png";

const AdminRegister = () => {
  return (
    <>
     <nav>
        <ul>
        <li><Link to="/admin">Home</Link></li>
          <li><Link to="/home">Scanner</Link></li>
          <li><Link to="/hostel">members</Link></li>
        
        </ul>
      </nav>
    <div>

      <img src={hostel} alt="" />



    </div>
    </>
   
  )
}

export default AdminRegister