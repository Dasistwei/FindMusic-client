import React, { useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LocalStorage } from "../utils/LocalStorage"
import { AuthContext } from "../context/authContext"

const Navbar = () => {
  let lightMode = false
  const textColor = lightMode ? 'text-primary' : 'text-info';
  const logoColor = lightMode ? 'text-secondary' : 'text-white';
  const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext)

  const handleSignOutClick = () => {
    LocalStorage.removeAuthToken()
    setIsAuthenticate(false)
    window.location.reload()
  }
  return (
    <ul className='navbar-nav'>
      {/* <li className='navbar-item'>
        <NavLink className={`nav-link fs-4 ${logoColor}`}>Find Music</NavLink>
      </li> */}
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/'>
          <i class="fa-solid fa-house fa-lg"></i>
          <span className='ms-2'>首頁</span>
        </NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/search'>
          <i class="fa-solid fa-magnifying-glass fa-lg"></i>
          <span className='ms-2'>搜尋</span>
        </NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/sounds_search' >
          <i class="fa-solid fa-microphone fa-lg"></i>
          <span className='ms-2'>音源搜尋</span>
        </NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/likeList'>
          <i class="fa-regular fa-heart fa-lg"></i>
          <span className='ms-2'>已按讚的歌曲</span>
        </NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/collection'>
          <i class="fa-solid fa-list-ul"></i>
          <span className='ms-2'>播放清單</span>
        </NavLink>
      </li>
      <li className='navbar-item'>
        {!isAuthenticate ?
          <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/sign_in'>登入</NavLink> :
          <div className='cursor mt-3' onClick={handleSignOutClick}><i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i></div>}
      </li>
    </ul>
  )
};

export default Navbar;
