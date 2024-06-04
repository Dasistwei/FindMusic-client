import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const textColor = 'text-danger';
  return (
    <div className="">
      <ul className='navbar-nav'>
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
          <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/collection'>已按讚的歌曲</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink className={({ isActive }) => { return `nav-link ${isActive ? textColor : ''}` }} to='/sign_in'>登入</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink className='nav-link text-success' to='/artist/:id'>歌手</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink className='nav-link text-success' to='/track/:id'>歌曲</NavLink>
        </li>
      </ul>
    </div>
  )
};

export default Navbar;
