import React from 'react'
import {Navigate, useLocation, useNavigate} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token')
    let location = useLocation();
    console.log(location)

    if(!token) {
        // <Navigate to="/auth/login" state={{ from: location}} replace />
        return <Navigate to="/auth/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;