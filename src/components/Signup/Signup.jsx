import './Signup.css'
const Signup = () => {

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("Submitted")
    }

    return (
        <div className="signup-form">
            <form action="/auth/signup" onSubmit={submitHandler} novalidate>
                <div className="form-header">
                    <h2>Sign Up</h2>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name="name" required="required" />
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
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" required="required" />
                </div>
                <div className="form-group">
                    <label className="checkbox-inline"><input type="checkbox" required="required" /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
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