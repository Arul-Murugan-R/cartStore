import React from 'react'
import './Product.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/userSlice'

export default function Product() {
    const [loading, setLoading] = useState(true)
    const [productF, setProduct] = useState({})
    const [similarProducts, setSimilar] = useState([])
    const [cartCount,setCartCount] = useState(0)
    const [selected,setSelected] = useState(0)
    const [error,setError] = useState(false)
    const {id} = useParams()
    const wishlistFound = useSelector((state)=>state.user.wishlist).find((wish)=>id == wish.id)
    const dispatch = useDispatch()
    const product = useSelector((state)=>state.user.products)
    // console.log(id);
    const fetchProduct = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BACKEND+'/products/'+id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            setProduct(data)
            await fetchSimilar(data.category)
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError(err)
        }
    }
    const fetchSimilar = async(category) =>{
        try {
            const res = await fetch(import.meta.env.VITE_BACKEND+'/products/category/'+category, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            console.log(data.products)
            setSimilar(data.products)
            setLoading(false)
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
    }, [id])
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
    <>
      <div class="container my-5">
        <div class="row">
            <div class="col-md-5">
                <div class="main-img">
                    <img class="img-fluid" src={productF.images[selected]} alt="ProductS"/>
                    <div class="row my-3 previews">
                        {productF.images.slice(0,4).map((image,i)=>
                        <div class="col-3 cursor-pointer" onClick={()=>setImageSelected(i)} >
                            <img class="w-100" src={image} alt={productF.title+"_"+i}/>
                        </div>)}
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="main-description px-2">
                    <div class="category text-bold d-flex justify-content-between">
                        Category: {productF.category}
                        {!wishlistFound?<div class="text-danger h2 cursor-pointer"
                        onClick={()=>dispatch(userActions.setWishlist({
                            product:productF
                        }))}
                        >	&#x2661;</div>:<div class="text-danger h2 cursor-pointer"
                        onClick={()=>dispatch(userActions.removeWishedProduct({
                            id:productF.id
                        }))}
                        >&#x2665;</div>}
                    </div>
                    <div class="product-title text-bold my-3">
                        {productF.title}
                    </div>


                    <div class="price-area my-4">
                        <p class="old-price mb-1"><del>₹{parseInt(productF.price+(parseInt(productF.discountPercentage)/100)*productF.price)}</del> <span class="old-price-discount text-danger">({parseInt(productF.discountPercentage)}% off)</span></p>
                        <p class="new-price text-bold mb-1">₹{productF.price}</p>
                        <p class="text-secondary mb-1">(Additional tax may apply on checkout)</p>

                    </div>


                    <div class="buttons d-flex my-5">
                        <div class="block">
                            <button  class="shadow btn btn-outline-danger"
                            onClick={()=>dispatch(userActions.setWishlist({
                                product:productF
                            }))}
                            >Wishlist ❤️</button>
                        </div>
                        <div class="block">
                            <button class="shadow btn btn-outline-warning"
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

                        <div class="block quantity">
                            <input type="number" class="form-control" id="cart_quantity"  min="0" value={cartCount} onChange={(e)=>setCartCount(e.target.value)} max={productF.stock} name="cart_quantity"/>
                        </div>
                    </div>




                </div>

                <div class="product-details my-4">
                    <p class="details-title text-color mb-1">Product Details</p>
                    <p class="description">{productF.description}</p>
                </div>
              
                         {/* <div class="row questions bg-light p-3">
                    <div class="col-md-1 icon">
                        <i class="fa-brands fa-rocketchat questions-icon"></i>
                    </div>
                    <div class="col-md-11 text">
                        Have a question about our products at E-Store? Feel free to contact our representatives via live chat or email.
                    </div>
                </div> */}

                {/* <div class="delivery my-4">
                    <p class="font-weight-bold mb-0"><span><i class="fa-solid fa-truck"></i></span> <b>Delivery done in 3 days from date of purchase</b> </p>
                    <p class="text-secondary">Order now to get this product delivery</p>
                </div>
                <div class="delivery-options my-4">
                    <p class="font-weight-bold mb-0"><span><i class="fa-solid fa-filter"></i></span> <b>Delivery options</b> </p>
                    <p class="text-secondary">View delivery options here</p>
                </div> */}
                
             
            </div>
        </div>
    </div>



    <div class="container similar-products my-4">
        <hr/>
        <p class="display-5">Similar Products</p>

        <div class="row">
            {similarProducts.slice(0,4).map((product)=><div class="col-md-3">
            <Link to={`/view-page/${product.id}`} class="similar-product text-decoration-none">
                    <img class="w-100" src={product.thumbnail} alt="Preview"/>
                    <Link to={`/view-page/${product.id}`} className="text-black text-bold text-decoration-none overflow-hidden" style={{ height: "22px" }}>{product.title}</Link>
                    <p class="text-danger">₹{product.price}</p>
                </Link>
            </div>)}
        </div>
    </div>
    </>
  )
}
