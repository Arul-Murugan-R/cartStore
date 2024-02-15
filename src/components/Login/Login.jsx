import { useState } from 'react'
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './Login.css'
import { productData, userActions } from '../../store/userSlice';

const Login = () => {
    const dispatch = useDispatch()
    const [loginData, seLoginData] = useState({
        name:import.meta.env.VITE_USERNAME,
        password:import.meta.env.VITE_PASSWORD ,
    })
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
            body: JSON.stringify({
    
                username: import.meta.env.VITE_USERNAME,
                password: import.meta.env.VITE_PASSWORD,
                // expiresInMins: 60, // optional
              })
        }).then((res) => {
            console.log(res)
            if (res.status === 'ok'||res.status === 200) {
                res.json()
                .then((data) => {
                    // console.log(data)
                    dispatch(userActions.setLogin({
                        data
                    }))
                    dispatch(productData())
                    setErrors(null)
                    setIsLoading(false)
                    seLoginData({})
                    //localStorage.setItem('Name', 'Rahul');
                    return navigate('/')
                })
            }
            return res;
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
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
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
                    <input type="email" disabled value={loginData.name} className="form-control" name="email" onBlur={onBlurHandler} required="required" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" disabled value={loginData.password} className="form-control" name="password" onBlur={onBlurHandler} required="required" />
                </div>
                <div className="form-group">
                    <button type="submit"  className="btn btn-primary btn-block btn-lg">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login