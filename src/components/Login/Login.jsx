import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import './Login.css'
const Login = () => {
    const [loginData, seLoginData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null)
    const onBlurHandler = (e) => {
        setErrors(null)
        const { name, value } = e.target
        seLoginData({ ...loginData, [name]: value })
        console.log(loginData)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        fetch(import.meta.env.VITE_BACKEND + '/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        }).then((res) => {
            console.log(res)
            if (res.status === 'ok'||res.status === 200) {
                res.json().then((data) => {
                    console.log(data)
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('Name', data.name);
                    localStorage.setItem('userId', data.userId);
                    setErrors(null)
                    setIsLoading(false)
                    seLoginData({})
                    //localStorage.setItem('Name', 'Rahul');
                    navigate('/')
                })
            }
            return res.json()
        }).then((data) => {
            console.log(data)
            if (data.message) {
                setIsLoading(false)
                setErrors(data.message+" "+data.output)
            }
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
            setErrors(err)
        })
        
    }
    if (isLoading) {
        return (
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    
    return (
        <div className="login-form">
            {errors&&<div className="alert alert-danger" role="alert">{errors}</div>}
            <form className="responsive bg-light" method="post" onSubmit={submitHandler}>
                <div className="form-header">
                    <h2>Login</h2>
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" name="email" onBlur={onBlurHandler} required="required" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onBlur={onBlurHandler} required="required" />
                </div>
                <div className="form-group">
                    <label className="checkbox-inline"><input type="checkbox"/> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                </div>
                <div className="form-group">
                    <button type="submit"  className="btn btn-primary btn-block btn-lg">Login</button>
                </div>
            </form>
            <div className="text-center small">Already have an account? <a href="/auth/login">Sign Up</a></div>
        </div>
    )
}

export default Login