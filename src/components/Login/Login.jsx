import './Login.css'
const Login = () => {
    return (
        <div className="login-form">
            <form className="responsive" action="/auth/login" method="post" novalidate>
                <div className="form-header">
                    <h2>Login</h2>
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" name="email" required="required" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" required="required" />
                </div>
                <div className="form-group">
                    <label className="checkbox-inline"><input type="checkbox" required="required" /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block btn-lg">Login</button>
                </div>
            </form>
            <div className="text-center small">Already have an account? <a href="/auth/signup">Sign Up</a></div>
        </div>
    )
}

export default Login