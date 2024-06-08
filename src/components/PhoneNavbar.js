import React, { useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LocalStorage } from "../utils/LocalStorage"
import { AuthContext } from "../context/authContext"

const PhoneNavbar = () => {
  const textColor = 'text-danger';
  const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext)

  const handleSignOutClick = () => {
    LocalStorage.removeAuthToken()
    window.location.reload()
  }
  return (
    <ul className='nav d-flex justify-content-evenly bg-light'>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/'>
          <span className="material-symbols-outlined phoneNav-icon-size">
            home
          </span>
          <h5>首頁</h5>
        </NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/search'>
          <span className="material-symbols-outlined phoneNav-icon-size">
            search
          </span>
          <h5>搜尋</h5>
        </NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/sounds_search'>
          <span className="material-symbols-outlined phoneNav-icon-size">
            graphic_eq
          </span>
          <h5>音源搜尋</h5>
        </NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/collection'>
          <span className="material-symbols-outlined phoneNav-icon-size">
            queue_music
          </span>
          <h5>播放清單</h5>
        </NavLink>
      </li>
      {/* <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/likeList'>已按讚的歌曲</NavLink>
      </li> */}
      {/* <li className='navbar-item'>
        {!isAuthenticate ?
          <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/sign_in'>登入</NavLink> :
          <button className="btn btn-outline-none" onClick={handleSignOutClick}>登出</button>}
      </li>
      <li className='navbar-item'>
        <NavLink className='nav-link text-success' to='/artist/:id'>歌手</NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className='nav-link text-success' to='/track/:id'>歌曲</NavLink>
      </li> */}
    </ul>
  )
};

export default PhoneNavbar;
