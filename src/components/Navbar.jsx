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
          <img className="logo" src="/Designer.png" width={30} height={30}  />
        </Link>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-lg-center mb-md-0">
        <li><Link to="/" className={`nav-link px-2 ${props.path=='/'?'text-secondary':'text-white'}`}>Home</Link></li>
          {isLoggedIn&&<li><Link to="/wishlist" className={`nav-link px-2 ${props.path=='/wishlist'?'text-secondary':'text-white'}`}>Wishlist</Link></li>}
          <li><Link to="#" className="nav-link px-2 text-white">About</Link></li>
        </ul>

        {/* <form className="col-md-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex"  action="/" method="get">
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
        </form> */}
        {/* <div className="text-end">
          <Link to="/auth/logout" className="btn btn-outline-light me-2">Logout</Link>
        </div> */}
        {!isLoggedIn ? (
        <div className="text-end">
          <Link to="/auth/login" className="btn btn-outline-light me-2">Login</Link>
          {/* <Link to="/auth/signup" type="button" className="btn btn-warning">Sign-up</Link> */}
        </div>) : (
        <div className="d-flex text-end gap-4">
          <Link to="/wishlist" type="button" class="text-decoration-none position-relative d-grid place-item-center">
          ❤️ <span class="position-absolute top-n100 start-100 translate-middle badge rounded-pill bg-primary">+99 <span class="visually-hidden">unread messages</span></span>
          </Link>
          <button type="button" class="btn btn-outline-warning position-relative">
              Cart <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">+99 <span class="visually-hidden">unread messages</span></span>
          </button>
          <Link onClick={logoutHandler} className="btn btn-outline-light me-2">Logout</Link>
      </div>)}
      </div>
    </div>
  </header>
  
    )
}

export default Navbar