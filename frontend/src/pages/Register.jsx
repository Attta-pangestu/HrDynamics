import React, { useState } from 'react';
import axios from 'axios';
import style from './css/Login.module.css'; // You can reuse the same CSS or create a new one
import loginMain from '../assets/svg/login-Main.svg';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'employee' // default role
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Password validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            const response = await axios.post("/api/auth/register", {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            if (response.data.success) {
                navigate('/login'); // Redirect to login after successful registration
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.log("Error received:", error);
            if (error.response && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className={style.container}>
            {/* Left Section */}
            <div className={style.left_section}>
                <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 420 150" className={style.leftLogo}>
                    <rect width="100%" height="100%" fill="#ffffff" rx="20" ry="20" />
                    <circle cx="60" cy="75" r="50" fill="#6a28d9" />
                    <circle cx="60" cy="75" r="30" fill="#ffffff" />
                    <text x="120" y="85" fontFamily="Arial, sans-serif" fontSize="40" fill="#6a28d9" fontWeight="bold">
                        HR Dynamics
                    </text>
                    <text x="120" y="115" fontFamily="Arial, sans-serif" fontSize="20" fill="#6a28d9" fontStyle="italic">
                        Empowering Workforce Solutions
                    </text>
                </svg>

                <div className={style.testimonial_info}>
                    <img src={loginMain} alt="Register-main" className={style.loginMainSvg} />
                </div>
            </div>

            {/* Right Section */}
            <div className={style.right_section}>
                <form className={style.sign_in_box} onSubmit={handleSubmit}>
                    <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 420 150" className={style.right_logo}>
                        <rect width="100%" height="100%" fill="#ffffff" rx="20" ry="20" />
                        <circle cx="60" cy="75" r="50" fill="#6a28d9" />
                        <circle cx="60" cy="75" r="30" fill="#ffffff" />
                        <text x="120" y="85" fontFamily="Arial, sans-serif" fontSize="40" fill="#6a28d9" fontWeight="bold">
                            HR Dynamics
                        </text>
                    </svg>

                    <h2>Register</h2>
                    <p>Create your account</p>
                    {error && <span className="text-red-500 font-bold">{error}</span>}

                    <input
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        autoFocus
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={style.select_role}
                    >
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button className={style.sign_in_btn} type="submit">
                        Register
                    </button>

                    <p className={style.login_link}>
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;