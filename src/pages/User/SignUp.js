import React, { useState, useEffect, useContext } from 'react'
import { useForm, useWatch } from "react-hook-form"; //useWatch 監聽 register 且可以搭配useEffect
import { LoadingBtn } from '../../components/loader/LoadingBtn';
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from '../../Api/UserApi';
import { LocalStorage } from "../../utils/LocalStorage";
import { AuthContext } from "../../context/authContext"


export default function SignUp() {
  const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext)
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState({
    isLoading: false,
    type: ''
  })

  useEffect(() => {
    const url = window.location.href
    if (!url.startsWith(`${process.env.REACT_APP_CLIENT_URL}/sign_in?token=`)) return
    const jwtToken = url.split(`${process.env.REACT_APP_CLIENT_URL}/sign_in?token=`).pop()
    LocalStorage.setAuthToken(jwtToken)
  }, [])

  // React hook From
  const {
    register, //狀態 state /綁定input
    handleSubmit, //觸發onSubmit
    watch, //取出register 的值 /只能監聽
    control, //了解當前運作的register是哪個
    getValues, //取得當前值
    setValue, //寫入値
    formState: { errors }, //錯誤狀態
  } = useForm({
    mode: 'onTouched' //點擊時觸發
  })

  //查看目前表單狀態
  const watchForm = useWatch({
    control
  })
  // console.log('getValues', getValues())
  // useEffect(() => {
  //   // const { email, password } = getValues()
  //   console.log('getValues', getValues())
  // }, [watchForm])

  const onSubmit = (data) => {
    const { name, email, password, confirmPassword } = getValues()
    setLoadingBtn({
      isLoading: true,
      type: 'signUp'
    })
    UserApi.signUp({ name, email, password, confirmPassword })
      .then((result) => {
        if (result.status !== 'success') {
          setLoadingBtn({
            isLoading: false,
            type: 'signUp',
            errorMessage: result.message
          })
          return console.log('result', result.message)
        }
        LocalStorage.setAuthToken(result.user.token)
        setIsAuthenticate(true)
        setLoadingBtn({
          isLoading: false,
          type: 'signUp'
        })
        navigate('/');
      })
      .catch((error) => console.error(error));
  }
  const handleGoogleSignInClick = () => {
    setLoadingBtn({
      isLoading: true,
      type: 'googleSignIn'
    })
    UserApi.signWithGoogle()
  }
  return (
    <div className='signup mb-3 mt-3 template d-flex align-items-center row flex-column'>
      <div className="col-md-5 mb-3">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3>註冊</h3>
            <div className='mb-3'>
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                type="text"
                placeholder='Enter Name'
                {...register('name', {
                  required: true
                })} //註冊欄位
                className={`form-control ${errors.name && 'is-invalid'}`}
              />
              <div className="invalid-feedback text-start">
                name未填寫
              </div>
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              placeholder='Enter Email'
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                }
              })} //註冊欄位
              className={`form-control ${errors.email && 'is-invalid'}`}
            />
            <div className="invalid-feedback text-start">
              Email未填寫或格式不符
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              placeholder='Enter password'
              {...register('password', {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/,
                }
              })}
              className={`form-control ${errors.password && 'is-invalid'}`} />
            <div className="invalid-feedback text-start">
              請輸入八位以上密碼
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder='Enter password again'
              {...register('confirmPassword', {
                required: true,
                validate: value => {
                  return value === getValues('password') || '請確認兩次輸入相同密碼'
                },
                pattern: {
                  value: /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/,
                }
              })}
              className={`form-control ${errors.confirmPassword && 'is-invalid'}`} />
            <div className="invalid-feedback text-start">
              {errors.confirmPassword && errors.confirmPassword.message}
            </div>
          </div>
          <div className="d-grid">
            {!loadingBtn.isLoading ?
              <button type="submit" className='btn btn-primary text-white'>註冊</button>
              : loadingBtn.isLoading && loadingBtn.type === 'signUp' && <LoadingBtn />}
          </div>
        </form>
        {loadingBtn.errorMessage && <p className='text-danger text-start'>{loadingBtn.errorMessage}</p>}
      </div>
      <p>已經有帳號了？<Link to={'/sign_in'} className='text-decoration-none'>登入</Link></p>
      <div className="">or</div>
      <div className="d-grid col-md-5">
        {!loadingBtn.isLoading ?
          <button className='btn btn-outline-primary' onClick={handleGoogleSignInClick}>google 登入</button>
          : loadingBtn.isLoading && loadingBtn.type === 'googleSignIn' && <LoadingBtn />}
      </div>
    </div>
  )
}
