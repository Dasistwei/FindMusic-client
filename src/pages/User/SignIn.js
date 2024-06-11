import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from '../../Api/UserApi';
import { LocalStorage } from "../../utils/LocalStorage";
import { AuthContext } from "../../context/authContext"

export default function SignIn() {
  const [formData, setFormData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href
    if (!url.startsWith(`${process.env.REACT_APP_CLIENT_URL}/sign_in?token=`)) return
    const jwtToken = url.split(`${process.env.REACT_APP_CLIENT_URL}/sign_in?token=`).pop()
    LocalStorage.setAuthToken(jwtToken)
    setIsAuthenticate(true)
    navigate('/');
  }, [])


  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSignInClick = (e) => {
    e.preventDefault()
    setIsLoading(true)
    UserApi.signIn(formData)
      .then((response) => response.json())
      .then((result) => {
        LocalStorage.setAuthToken(result.user.token)
        setIsAuthenticate(true)
        setIsLoading(false)
        setFormData('')
        navigate('/');
      })
      .catch((error) => console.error(error));
  }
  const handleGoogleSignInClick = () => {
    UserApi.signWithGoogle()
  }
  return (
    <div className="d-flex h-100 w-100 ">
      <div className='signup mb-3 mt-3 template d-flex align-items-center row flex-column border h-100 w-100'>
        {!isLoading ?
          <>
            <div className="col-md-5 mb-3">
              <h3>登入</h3>
              <form action="">
                <div className='mb-3'>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder='Enter Email' onChange={handleDataChange} className='form-control' />
                </div>
                <div className='mb-3'>
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder='Enter password' onChange={handleDataChange} className='form-control' />
                </div>
                <div className="d-grid">
                  <button className='btn btn-primary text-white' onClick={handleSignInClick}>登入</button>
                </div>
              </form>
            </div>

            <p>還沒有帳號？<Link to={'/sign_up'} className='text-decoration-none'>註冊</Link></p>
            <div className="">or</div>
            <div className="d-grid col-md-5">
              <button className='btn btn-outline-primary' onClick={handleGoogleSignInClick}>google 登入</button>
            </div>
          </>
          : <div className="api-loader"></div>}
      </div>
    </div>
  )
}