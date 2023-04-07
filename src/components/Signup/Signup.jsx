import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Signup.css'
const Signup = () => {
    const [signupData, setSignupData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null)
    const onBlurHandler = (e) => {
        setErrors(null)
        const { name, value } = e.target
        setSignupData({ ...signupData, [name]: value })
        console.log(signupData)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        fetch(import.meta.env.VITE_BACKEND + '/auth/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
        }).then((res) => {
            console.log(res)
            if (res.status === 'ok'||res.status === 201) {
                setErrors(null)
                setIsLoading(false)
                setSignupData({})
                return navigate('/auth/login')
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
        <div className="signup-form">
            {errors&&<div className="alert alert-danger" role="alert">{errors}</div>}
            <form action="/auth/signup" onSubmit={submitHandler} className='bg-light'>
                <div className="form-header">
                    <h2>Sign Up</h2>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name="name" value={errors&&signupData.name} onBlur={onBlurHandler} required="required" />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" name="email" value={errors&&signupData.email} onBlur={onBlurHandler} required="required" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onBlur={onBlurHandler} required="required" />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword"  onBlur={onBlurHandler} required="required" />
                </div>
                <div className="form-group">
                    <label className="checkbox-inline"><input type="checkbox" /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block btn-lg">Sign Up</button>
                </div>
            </form>
            <div className="text-center small">Already have an account? <a href="/auth/login">Login here</a></div>
        </div>
    )
}


export default Signup