import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from '../../Api/UserApi';
import { LocalStorage } from "../../utils/LocalStorage";
import { AuthContext } from "../../context/authContext"
// const response = {
//   "status": "success",
//   "user": {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjA3NDIwZGI1OWI5ZDVjZWMzYTIzZiIsImlhdCI6MTcxNzU5NzIxNiwiZXhwIjoxNzE3NzcwMDE2fQ.Htj7tYUPzi98qa8rmwOOy9d1BAhX9JblOQazG25m734",
//     "name": "kㄍi"
//   }
// }
// console.log()
export default function SignUp() {
  const [formData, setFormData] = useState()
  const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext)
  const navigate = useNavigate();
  console.log('isAuthenticate', isAuthenticate)
  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  useEffect(() => {
    const url = window.location.href
    if (!url.startsWith(`${process.env.REACT_APP_CLIENT_URL}/sign_in?token=`)) return
    const jwtToken = url.split(`${process.env.REACT_APP_CLIENT_URL}/sign_in?token=`).pop()
    LocalStorage.setAuthToken(jwtToken)
  }, [])
  const handleSignUpClick = (e) => {
    e.preventDefault()
    UserApi.signUp(formData)
      .then((response) => response.json())
      .then((result) => {
        LocalStorage.setAuthToken(result.user.token)
        setIsAuthenticate(true)
        setFormData('')
        navigate('/');
      })
      .catch((error) => console.error(error));
  }
  const handleGoogleSignInClick = () => {
    UserApi.signWithGoogle()
  }
  return (
    <div className='signup mb-3 mt-3 template d-flex align-items-center row flex-column'>
      <div className="col-md-5 mb-3">
        <form action="">
          <div>
            <h3>註冊</h3>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder='Enter Name' className='form-control' onChange={handleDataChange} />
          </div>
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Enter Email' onChange={handleDataChange} className='form-control' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='Enter password' onChange={handleDataChange} className='form-control' />
          </div>
          <div className='mb-3'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder='Enter password again' onChange={handleDataChange} className='form-control' />
          </div>
          <div className="d-grid">
            <button className='btn btn-primary text-white' onClick={handleSignUpClick}>註冊</button>
          </div>
        </form>
      </div>
      <p>已經有帳號了？<Link to={'/sign_in'} className='text-decoration-none'>登入</Link></p>
      <div className="">or</div>
      <div className="d-grid col-md-5">
        <button className='btn btn-primary text-white' onClick={handleGoogleSignInClick}>google 登入</button>
      </div>
    </div>
  )
}
