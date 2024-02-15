import React from 'react'
import './Product.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/userSlice'

export default function Product() {
    const [loading, setLoading] = useState(true)
    const [cartCount,setCartCount] = useState(0)
    const [selected,setSelected] = useState(0)
    const [similarProducts, setSimilar] = useState([])
    const [productF, setProduct] = useState({})
    const [error,setError] = useState(false)
    const {id} = useParams()
    const wishlistFound = useSelector((state)=>state.user.wishlist).find((wish)=>id == wish.id)
    const Products = useSelector((state)=>state.user.products)
    const product = useSelector((state)=>state.user.products).find((pro)=>id == pro.id)
    const dispatch = useDispatch()
    // console.log(id);
    const fetchProduct = async () => {
        try {
            setLoading(true)
            const product =await Products.find((pro)=>id == pro.id)
            setProduct(product)
            await fetchSimilar(product.category)
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError(err)
        }
    }
    const fetchSimilar = async(category) =>{
        try {
            const similarOnes =await Products.filter((pro)=>pro.id != id && pro.category == category)
            // console.log(similarOnes)
            setSimilar(similarOnes)
            setInterval(()=>{
                setLoading(false)
            },1000)
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError(err)
        }
    }
    const setImageSelected = (id) =>{
        setSelected(id)
    }
    useEffect(() => {
        setLoading(true)
        fetchProduct()
    }, [id,Products])
    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
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
    <>
      <div className="container my-5">
        <div className="row">
            <div className="col-md-5">
                <div className="main-img">
                    <img className="img-fluid" src={productF.images[selected]} alt="ProductS"/>
                    <div className="row my-3 previews">
                        {productF.images.slice(0,4).map((image,i)=>
                        <div className="col-3 cursor-pointer" onClick={()=>setImageSelected(i)} >
                            <img className="w-100" src={image} alt={productF.title+"_"+i}/>
                        </div>)}
                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <div className="main-description px-2">
                    <div className="category text-bold d-flex justify-content-between">
                        Category: {productF.category}
                        {!wishlistFound?<div className="text-danger h2 cursor-pointer"
                        onClick={()=>dispatch(userActions.setWishlist({
                            product:productF
                        }))}
                        >	&#x2661;</div>:<div className="text-danger h2 cursor-pointer"
                        onClick={()=>dispatch(userActions.removeWishedProduct({
                            id:productF.id
                        }))}
                        >&#x2665;</div>}
                    </div>
                    <div className="product-title text-bold my-3">
                        {productF.title}
                    </div>


                    <div className="price-area my-4">
                        <p className="old-price mb-1"><del>₹{parseInt(productF.price+(parseInt(productF.discountPercentage)/100)*productF.price)}</del> <span className="old-price-discount text-danger">({parseInt(productF.discountPercentage)}% off)</span></p>
                        <p className="new-price text-bold mb-1">₹{productF.price}</p>
                        <p className="text-secondary mb-1">(Additional tax may apply on checkout)</p>

                    </div>


                    <div className="buttons d-flex my-5">
                        <div className="block">
                            <button  className="shadow btn btn-outline-danger"
                            onClick={()=>dispatch(userActions.setWishlist({
                                product:productF
                            }))}
                            >Wishlist ❤️</button>
                        </div>
                        <div className="block">
                            <button className="shadow btn btn-outline-warning"
                            onClick={()=>{
                                if(!cartCount)
                                return
                                const ans = confirm('Are you sure about adding to the cart')
                                if(ans){
                                    dispatch(userActions.setCart({
                                        product:productF,count:cartCount
                                    }))
                                    setCartCount(0)
                                }
                            }}
                            >Add to cart 🛒</button>
                        </div>

                        <div className="block quantity">
                            <input type="number" className="form-control" id="cart_quantity"  min="0" value={cartCount} onChange={(e)=>setCartCount(e.target.value)} max={productF.stock} name="cart_quantity"/>
                        </div>
                    </div>




                </div>

                <div className="product-details my-4">
                    <p className="details-title text-color mb-1">Product Details</p>
                    <p className="description">{productF.description}</p>
                </div>
              
                         {/* <div className="row questions bg-light p-3">
                    <div className="col-md-1 icon">
                        <i className="fa-brands fa-rocketchat questions-icon"></i>
                    </div>
                    <div className="col-md-11 text">
                        Have a question about our products at E-Store? Feel free to contact our representatives via live chat or email.
                    </div>
                </div> */}

                {/* <div className="delivery my-4">
                    <p className="font-weight-bold mb-0"><span><i className="fa-solid fa-truck"></i></span> <b>Delivery done in 3 days from date of purchase</b> </p>
                    <p className="text-secondary">Order now to get this product delivery</p>
                </div>
                <div className="delivery-options my-4">
                    <p className="font-weight-bold mb-0"><span><i className="fa-solid fa-filter"></i></span> <b>Delivery options</b> </p>
                    <p className="text-secondary">View delivery options here</p>
                </div> */}
                
             
            </div>
        </div>
    </div>



    <div className="container similar-products my-4">
        <hr/>
        <p className="display-5">Similar Products</p>

        <div className="row">
            {similarProducts.slice(0,4).map((product)=><div className="col-md-3">
            <Link to={`/view-page/${product.id}`} className="similar-product text-decoration-none">
                    <img className="w-100" src={product.thumbnail} alt="Preview"/>
                    <Link to={`/view-page/${product.id}`} className="text-black text-bold text-decoration-none overflow-hidden" style={{ height: "22px" }}>{product.title}</Link>
                    <p className="text-danger">₹{product.price}</p>
                </Link>
            </div>)}
        </div>
    </div>
    </>
  )
}
