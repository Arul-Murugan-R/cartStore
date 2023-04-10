import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Navbar = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    return navigate('/');
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [localStorage.getItem('token')]);


    return(
        
<header className="nav-bar p-3 bg-dark text-white sticky-md-top">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none me-3">
          <img className="logo" src="https://res.cloudinary.com/da3xs5vzk/image/upload/v1676896905/logo6_kqpwf1.ico" />
        </Link>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-lg-center mb-md-0">
        <li><Link to="/" className={`nav-link px-2 ${props.path=='/home'?'text-secondary':'text-white'}`}>Home</Link></li>
          
          <li><Link to="/add-yours" className={`nav-link px-2 ${props.path=='/add-yours'?'text-secondary':'text-white'}`}>Add Yours</Link></li>
          
          {isLoggedIn&&<li><Link to="/product" className={`nav-link px-2 ${props.path=='/product'?'text-secondary':'text-white'}`}>My List</Link></li>}
         
          <li><Link to="#" className="nav-link px-2 text-white">FAQs</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">About</Link></li>
        </ul>

        <form className="col-md-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex"  action="/" method="get">
          <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" name="search"/>
          <div className="form-group col-md-4 dropdown">
            <select name="filter"  className="form-control">
              <option>name</option>
              <option selected>location</option>
              <option>email</option>
              <option>place</option>
              <option>mark</option>
            </select>
          </div>
        </form>
        {/* <div className="text-end">
          <Link to="/auth/logout" className="btn btn-outline-light me-2">Logout</Link>
        </div> */}
        {!isLoggedIn ? (
        <div className="text-end">
          <Link to="/auth/login" className="btn btn-outline-light me-2">Login</Link>
          <Link to="/auth/signup" type="button" className="btn btn-warning">Sign-up</Link>
        </div>) : (
        <div className="text-end">
          <Link onClick={logoutHandler} className="btn btn-outline-light me-2">Logout</Link>
      </div>)}
      </div>
    </div>
  </header>
  
    )
}

export default Navbar