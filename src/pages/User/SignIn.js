import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from '../../Api/UserApi';
import { LocalStorage } from "../../utils/LocalStorage";


export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "esssmmkkee@wmai.com",
    password: "000000s00"
  })

  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href
    if (!url.startsWith(`${process.env.REACT_APP_CLIENT_URL}/sign_in?token=`)) return
    const jwtToken = url.split(`${process.env.REACT_APP_CLIENT_URL}/sign_in?token=`).pop()
    LocalStorage.setAuthToken(jwtToken)
    navigate('/');
  }, [])


  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSignUpClick = (e) => {
    e.preventDefault()
    // console.log('form')
    UserApi.signIn(formData)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  const handleGoogleSignInClick = () => {
    UserApi.signWithGoogle()
  }
  return (
    <div className='signup mb-3 mt-3 template d-flex align-items-center row flex-column'>
      <div className="col-md-5 mb-3">
        <form action="">
          <h3>登入</h3>
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Enter Email' onChange={handleDataChange} className='form-control' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='Enter password' onChange={handleDataChange} className='form-control' />
          </div>
          <div className="d-grid">
            <button className='btn btn-primary text-white' onClick={handleSignUpClick}>登入</button>
          </div>
        </form>
      </div>
      <p>還沒有帳號？<Link to={'/sign_up'} className='text-decoration-none'>註冊</Link></p>
      <div className="">or</div>
      <div className="d-grid col-md-5">
        <button className='btn btn-outline-primary' onClick={handleGoogleSignInClick}>google 登入</button>
      </div>
    </div>
  )
}