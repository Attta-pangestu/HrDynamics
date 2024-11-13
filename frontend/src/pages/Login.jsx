import React, { useState } from 'react'
import axios from 'axios'
import style from './css/Login.module.css'
// import loginMain from './assets/svg/login-main'
import loginMain from '../assets/svg/login-Main.svg'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

        
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
           if(response.data.success===true){
            // console.log(response); // for debugging
            // alert("ok")
            login(response.data.user)
            localStorage.setItem('token',response.data.token)
            if (response.data.user.role === "admin") {
                navigate('/admin-dashboard')
            }else{
                navigate('/employee-dashboard')
            }
           }
           else if(response.data.success===false){
            setError(response.data.error)  //messege
        }
        } catch (error) {
            console.log("Error received:", error);
            if(error.response && error.response.data.error ){
                setError(error.response.data.error)
            } else{
                setError("server error")
            }
        }
    }

  return (
    <>
      <div className={style.container}>
        {/* Left Section */}
        <div className={style.left_section}>
          <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 420 150" className={style.leftLogo}>
            {/* <!-- Background --> */}
            <rect width="100%" height="100%" fill="#ffffff" rx="20" ry="20" />

            {/* <!-- Stylized circle as part of the logo --> */}
            <circle cx="60" cy="75" r="50" fill="#6a28d9" />

            {/* <!-- Inner circle for accent --> */}
            <circle cx="60" cy="75" r="30" fill="#ffffff" />

            {/* <!-- HR Dynamics Text --> */}
            <text
              x="120"
              y="85"
              fontFamily="Arial, sans-serif"
              fontSize="40"
              fill="#6a28d9"
              fontWeight="bold"
            >
              HR Dynamics
            </text>

            {/* <!-- Tagline below the logo (optional) --> */}
            <text
              x="120"
              y="115"
              fontFamily="Arial, sans-serif"
              fontSize="20"
              fill="#6a28d9"
              fontStyle="italic"
            >
              Empowering Workforce Solutions
            </text>
          </svg>

          <div className={style.testimonial_info}>
            <img
              src={loginMain}
              alt="Login-main"
              className={style.loginMainSvg}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className={style.right_section}>
            
          <form className={style.sign_in_box} onSubmit={handleSubmit}>
          <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 420 150" className={style.right_logo}>
            {/* <!-- Background --> */}
            <rect width="100%" height="100%" fill="#ffffff" rx="20" ry="20" />

            {/* <!-- Stylized circle as part of the logo --> */}
            <circle cx="60" cy="75" r="50" fill="#6a28d9" />

            {/* <!-- Inner circle for accent --> */}
            <circle cx="60" cy="75" r="30" fill="#ffffff" />

            {/* <!-- HR Dynamics Text --> */}
            <text
              x="120"
              y="85"
              fontFamily="Arial, sans-serif"
              fontSize="40"
              fill="#6a28d9"
              fontWeight="bold"
            >
              HR Dynamics
            </text>

           
          </svg>
            <h2 >Log in</h2>
            <p>Welcome back! Please enter your details.</p>
            {error && <span className="text-red-500 font-bold">{error}</span>}
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="true"
              autoFocus
            />

            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="true"
            />

            <div className={style.checkAndForgotContainer}>
              <label className={style.custom_checkbox}>
                <input type="checkbox" id="rememberMe_checkbox" />
                <span className={style.checkmark}></span>
                <span className={style.checkboxText}>Remember Me</span>
              </label>
              <a href="">Forgot Passoword?</a>
            </div>
            <button className={style.sign_in_btn} typeof="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login