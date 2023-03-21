import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './List.css'

const List = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const [products, setProduct] = useState([])
    const productData = async () => {
        try {
            setLoading(true)
            const res = await fetch(import.meta.env.VITE_BACKEND+'/product', {
                method: "GET",
                headers: {
                    "Authorization":"bearer "+localStorage.getItem("token")
                },
            })
            if(res.status == 401){
                setError("Something went wrong"||res.message)
                setLoading(false)
                return
            }
            const data = await res.json()
            console.log(data);
            setProduct(data.products)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError(err)
        }
    }
    const deleteHandler = async (id) => {
        console.log(id)
        try {
            setLoading(true)
            const res = await fetch(import.meta.env.VITE_BACKEND+'/delete/'+id, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":"bearer "+localStorage.getItem("token")},
            })
            const data = await res.json()
            console.log(data);
            productData()
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError(err)
        }   
    }
    useEffect(() => {
        productData()
    }, [])
    
    // return (<h1>Testing</h1>);
    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    if (products.length <= 0 || products==[]) {
        return (
            <div className="alert alert-primary" role="alert">
                Product Not Found <Link to="/add-yours" className="alert-link">Add Yours</Link>
            </div>
        )
    }
    let i = 1;
    return (

        <main className="p-lg-4 m-lg-2">
            {error&&<div className="alert alert-danger" role="alert">{error}</div>}
        <table className="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th className="disable" scope="col">_id</th>
                <th scope="col">Name</th>
                <th className="disable" scope="col">Location</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <th scope="row">{i++}</th>
                <td className="disable">{product._id}</td>
                <td >{product.name} </td>
                <td className="disable">{product.location} </td>
                <td className="btn-group">
                  <Link to={"/view-page/"+product._id} className="btn btn-outline-success">View</Link>
                    <Link to={"/edit/"+product._id} className="btn btn-outline-primary">Edit</Link>
                    <Link onClick={()=>{deleteHandler(product._id)}} className="btn btn-outline-danger">Delete</Link></td>
              </tr>
            ))}
            </tbody>
          </table>
    </main>
    )
}

export default List
