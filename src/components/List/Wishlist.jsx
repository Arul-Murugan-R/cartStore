import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './List.css'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../store/userSlice'

const Wishlist = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const [products, setProduct] = useState([])
    const dispatch = useDispatch()
    const wishlist = useSelector((state)=>state.user.wishlist)
    const productData = async () => {
        try {
            setLoading(true)
            setProduct(wishlist)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError(err)
        }
    }
    useEffect(() => {
        productData()
    }, [wishlist])
    
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
    if (products.length == 0 || products==[]) {
        return (
            <div className="alert alert-primary" role="alert">
                No product is added under wishlist. <Link to="/" className="alert-link">Excepting you to add some</Link>
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
                <th></th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th>Stock</th>
                <th scope="col"></th>
                <th scope='col' className='text-center'>Remove</th>
              </tr>
            </thead>
            <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td><img src={product.thumbnail} height={50} width={50} alt="" /></td>
                <td >{product.title} </td>
                <td className="text-danger font-bold">₹{product.price} </td>
                <td className='text-center' style={{width:'50px'}} >{product.stock
                // <p className='bg-success p-1 rounded text-white text-center font-bold'>In Stock</p>:
                // <p className='bg-warning p-1 rounded text-white text-center'></p>
                }</td>
                <td className="py-3 btn-group d-flex justify-center disable">
                  <Link to={"/view-page/"+product.id} className="btn btn-outline-warning disable" width="100">Add to Cart</Link>
                </td>
                <td className='text-center'>
                <Link to={"/view-page/"+product.id} className="btn btn-outline-secondary rounded-xl">👁</Link>
                <button onClick={()=>dispatch(userActions.removeWishedProduct({
                            id:product.id
                        }))} className="btn btn-outline-danger rounded-xl">X</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
    </main>
    )
}

export default Wishlist
