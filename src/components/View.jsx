import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const View = ()=>{
    const [loading, setLoading] = useState(true)
    const [productF, setProduct] = useState({})
    const {id} = useParams()
    // console.log(id);
    const fetchProduct = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BACKEND+'/view-page/'+id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            setProduct(data.product)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError(err)
        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])
    if (loading) {
        return (
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    if(productF == {}){
        return (
            <h1>Product Not Found</h1>
        )
    }

    return (
        
        <div className="main mt-5 row p-md-4 p-2" style={{width:"100%"}}>
            <div className="content col-md-9">
                <h1 className="title">{productF.name} </h1><hr/>
                <div className="bd-placeholder-img col-md-8 img-thumbnail proImg overflow-hidden">
                    <img style={{height:"280px",width:"100%"}} src={productF.photo} alt=""/>
                </div><br/><br/>
                
                <p className="text-wrap">
                    {productF.desc}
                </p>
    
            </div>
            <div className="additional border border-dotted-secondary col-md-3 pt-5" style={{height:"400px"}}>
                <h6>Enquire </h6><br/>
                <Link to={`tel:${productF.no}`} className="text-primary"><i className="fas fa-phone-alt"> +91 {productF.no}</i></Link><br/>
                <Link to={`mailto:${productF.mail}`} className="text-primary"><i className="far fa-envelope"> {productF.email} </i></Link><br/><br/>
                <strong>Location</strong><br/>
                <i className="fas fa-map-marker-alt text-danger me-2"><label className="text-danger ml-4">{productF.location} </label></i><br/><br/>
            </div>
          </div>
    )
}

export default View