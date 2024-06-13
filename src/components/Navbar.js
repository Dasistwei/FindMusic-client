import React, { useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LocalStorage } from "../utils/LocalStorage"
import { AuthContext } from "../context/authContext"

const Navbar = () => {
  const textColor = 'text-primary';
  const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext)

  const handleSignOutClick = () => {
    LocalStorage.removeAuthToken()
    setIsAuthenticate(false)
    window.location.reload()
  }
  return (
    <ul className='navbar-nav '>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/'>首頁</NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/search'>搜尋</NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/sounds_search'>音源搜尋</NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/likeList'>已按讚的歌曲</NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/collection'>管理播放清單</NavLink>
      </li>
      <li className='navbar-item'>
        {!isAuthenticate ?
          <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/sign_in'>登入</NavLink> :
          <button className="btn btn-outline-none" onClick={handleSignOutClick}>登出</button>}
      </li>
    </ul>
  )
};

export default Navbar;
