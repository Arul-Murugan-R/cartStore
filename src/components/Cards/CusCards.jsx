import React from 'react'
import { useState, useEffect } from 'react'
import { Link,useSearchParams } from 'react-router-dom'
import Contact from '../Contact'

const CusCards = () => {
    const [searchParams] = useSearchParams()
    
    const search = searchParams.get('search')
    const filter = searchParams.get('filter')
        // console.log(data,searchParams.get('search'),searchParams.get('filter'))
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const [products, setProduct] = useState([])
    const productData = async () => {
        setLoading(true)
        try {
            const res = await fetch(import.meta.env.VITE_BACKEND+'/home', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            setProduct(data.products)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }
    useEffect(() => {
        if (search && filter) {
            const searchProduct = async () => {
                try {
                    setLoading(true)
                    const res = await fetch(import.meta.env.VITE_BACKEND + '/search?search='+search+'&filter='+filter, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    const data = await res.json()
                    console.log(data)
                    setProduct(data.products)
                    setLoading(false)
                } catch (err) {
                    console.log(err)
                    setLoading(false)
                    setError(err)
                }
            }
            searchProduct()
        }else{
            productData()
        }
    }, [searchParams])
    // return (<h1>Testing</h1>);
    if (loading) {
        return (
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    if (error) {
        return (
            <h3>Error...</h3>
        )
    }
    if (products.length <= 0) {
        return (
            <div className="alert alert-primary" role="alert">
                Product Not Found <Link to="/add-yours" class="alert-link">Add Yours</Link>
            </div>
        )
    }
    return (
        <>
        <div className="album py-5">
            <div className="container">

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {products.map((product) => (
                        <div className="col">
                            <div className="mt-5 card shadow-sm">
                                <img className="bd-placeholder-img card-img-top overflow-hidden" width="100%" height="200" src={product.photo} alt="" />

                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/view-page/${product._id}`} className="card-link text-decoration-none overflow-hidden" style={{ height: "22px" }}>{product.name}</Link>
                                        <i className="fas fa-map-marker-alt text-danger float-right me-2"><label className="text-danger ml-4">{product.location}</label></i>
                                    </div>
                                    <p className="card-text overflow-hidden" style={{ height: "50px" }}>{product.desc} </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">{product.createdAt} </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Contact/>
        </>
    )
}

export default CusCards