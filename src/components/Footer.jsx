
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import {motion} from "framer-motion"

export default function Footer() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOutUser= ()=>{
    Swal.fire({
      title: 'You want to go?',
      width: 400,
      showDenyButton: true,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        logOutUser() 
        navigate('/')
      } 
    }) 
  }
  return (
    <motion.div className='footer'
        animate={{
          y:[200,-100,0], 
          transition:{duration:1.5}   
        }}
      >    
      <div>
        {isLoggedIn && <li><button onClick={() => navigate(-1)} className="styleIcon"></button></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/User"><h3>{user.username}⚙️</h3></NavLink></li>}
        {isLoggedIn && <li><button onClick={() => handleLogOutUser()}>Log out</button></li>}
      </div>
    </motion.div>
  )
}