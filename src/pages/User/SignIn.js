import React, { useState, useEffect, useContext } from 'react'
import { useForm, useWatch } from "react-hook-form"; //useWatch 監聽 register 且可以搭配useEffect
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from '../../Api/UserApi';
import { LocalStorage } from "../../utils/LocalStorage";
import { AuthContext } from "../../context/authContext"
import { LoadingBtn } from '../../components/loader/LoadingBtn';


export default function SignIn() {
  const [loadingBtn, setLoadingBtn] = useState({
    isLoading: false,
    type: ''
  })

  const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // const url = window.location.href
    // if (!url.startsWith(`${process.env.REACT_APP_CLIENT_URL}/sign_in?token=`)) return
    // const jwtToken = url.split(`${process.env.REACT_APP_CLIENT_URL}/sign_in?token=`).pop()
    // LocalStorage.setAuthToken(jwtToken)
    // setIsAuthenticate(true)
    // navigate('/');
    const url = new URL(window.location.href);
    const jwtToken = url.searchParams.get("token");
    LocalStorage.setAuthToken(jwtToken)
    setIsAuthenticate(true)
  }, [])


  const handleGoogleSignInClick = () => {
    setLoadingBtn({
      isLoading: true,
      type: 'googleSignIn'
    })
    UserApi.signWithGoogle()
  }


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
  //   const { email, password } = getValues()
  //   console.log('getValues', email, password)
  // }, [watchForm])

  const onSubmit = (data) => {
    const { email, password } = getValues()

    setLoadingBtn({
      isLoading: true,
      type: 'signIn'
    })
    UserApi.signIn({ email, password })
      .then((result) => {
        if (result.status !== 'success') {
          setLoadingBtn({
            isLoading: false,
            type: 'signIn',
            errorMessage: result.message
          })
          return console.log('result', result.message)
        }
        LocalStorage.setAuthToken(result.user.token)
        setIsAuthenticate(true)
        setLoadingBtn({
          isLoading: false,
          type: 'signIn'
        })

        navigate('/');
      })
      .catch((error) => { console.error(error) });
  }

  const resetForm = () => {
    setValue('email', '')
    setValue('password', '')
  }
  return (
    <div className="d-flex h-100 w-100 ">
      <div className='signup mb-3 mt-3 template d-flex align-items-center row flex-column h-100 w-100'>
        <>
          <div className="col-md-5 mb-3">
            <h3>登入</h3>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    }
                  })} //註冊欄位
                  placeholder='Please Enter Email'
                  className={`form-control ${errors.email && 'is-invalid'}`}
                />
                <div className="invalid-feedback text-start">
                  Email未填寫或格式錯誤
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: true,
                    pattern: {
                      // value: /^[a-zA-Z0-9]{8,}$/,
                      value: /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/,
                    }
                  })}
                  placeholder='Please Enter password'
                  className={`form-control ${errors.password && 'is-invalid'}`}
                />
                <div className="invalid-feedback text-start">
                  請填入至少八位數的密碼
                </div>
              </div>
              <div className="d-grid">
                {!loadingBtn.isLoading ?
                  <button type="submit" className='btn btn-primary text-white'>登入</button>
                  : loadingBtn.isLoading && loadingBtn.type === 'signIn' && <LoadingBtn />}
              </div>
            </form>
            {loadingBtn.errorMessage && <p className='text-danger text-start'>{loadingBtn.errorMessage}</p>}
          </div>

          <p>還沒有帳號？<Link to={'/sign_up'} className='text-decoration-none'>註冊</Link></p>
          <div className="">or</div>
          <div className="d-grid col-md-5">
            {!loadingBtn.isLoading ?
              <button className='btn btn-outline-primary' onClick={handleGoogleSignInClick}>google 登入</button>
              : loadingBtn.isLoading && loadingBtn.type === 'googleSignIn' && <LoadingBtn />}
          </div>
        </>
      </div>
    </div>
  )
}
