import React, { useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LocalStorage } from "../utils/LocalStorage"
import { AuthContext } from "../context/authContext"

const PhoneNavbar = () => {
  let lightMode = false
  const thirdTextColor = lightMode ? 'text-primary' : 'text-info';
  const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext)

  const handleSignOutClick = () => {
    LocalStorage.removeAuthToken()
    window.location.reload()
  }
  return (
    <ul className='navbar-nav d-flex flex-row justify-content-evenly '>
      <li className='navbar-item '>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? thirdTextColor : ''}` }} to='/'>
          <span className="material-symbols-outlined phoneNav-icon-size">
            home
          </span>
          <h5>首頁</h5>
        </NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? thirdTextColor : ''}` }} to='/search'>
          <span className="material-symbols-outlined phoneNav-icon-size">
            search
          </span>
          <h5>搜尋</h5>
        </NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? thirdTextColor : ''}` }} to='/sounds_search'>
          <span className="material-symbols-outlined phoneNav-icon-size">
            graphic_eq
          </span>
          <h5>音源搜尋</h5>
        </NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? thirdTextColor : ''}` }} to='/collection'>
          <span className="material-symbols-outlined phoneNav-icon-size">
            queue_music
          </span>
          <h5>播放清單</h5>
        </NavLink>
      </li>
    </ul>
  )
};

export default PhoneNavbar;
