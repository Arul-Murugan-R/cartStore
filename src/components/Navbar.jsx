import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';
const Navbar = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch()
  const wishlist = useSelector((state)=>state.user.wishlist)
  const cart = useSelector((state)=>state.user.cart)
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(userActions.clearLogin())
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
      <div className="d-flex justify-content-between">
        <ul className="nav col-lg-automb-2 mb-md-0">
        <li><Link to="/" className="d-flex mb-2 mb-lg-0 text-white text-decoration-none me-3">
          <img className="logo" src="/Designer.png" width={30} height={30}  />
        </Link></li>
        <li><Link to="/" className={`nav-link px-2 ${props.path=='/'?'text-secondary':'text-white'}`}>Home</Link></li>
          {isLoggedIn&&<li><Link to="/wishlist" className={`nav-link px-2 position-relative ${props.path=='/wishlist'?'text-secondary':'text-white'}`}>Wishlist
          {wishlist.length>=0 && <span className="position-absolute start-100 translate-middle badge rounded-pill bg-primary font-sm">{wishlist.length} <span className="visually-hidden">unread messages</span></span>}
          </Link></li>}
        </ul>
        {!isLoggedIn ? (
        <div className="text-end">
          <Link to="/auth/login" className="btn btn-outline-light me-2">Login</Link>
        </div>) : (
        <div className="d-flex gap-4">
          {/* <Link to="/wishlist" type="button" className="text-decoration-none position-relative d-grid place-item-center">
          ❤️ <span className="position-absolute top-n100 start-100 translate-middle badge rounded-pill bg-primary">+99 <span className="visually-hidden">unread messages</span></span>
          </Link> */}
          <Link to="/cart" type="button" className={`btn btn-outline-warning position-relative ${props.path=='/cart' && 'bg-warning text-white'}`}>
              Cart <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">{cart.length} <span className="visually-hidden">unread messages</span></span>
          </Link>
          <Link onClick={logoutHandler} className="btn btn-outline-light me-2 m-sm-0 ">Logout</Link>
      </div>)}
      </div>
    </div>
  </header>
  
    )
}

export default Navbar