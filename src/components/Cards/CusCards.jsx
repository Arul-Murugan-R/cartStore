import React from 'react'
import { useState, useEffect } from 'react'
import { Link,useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './CusCards.css'

const CusCards = () => {
    const [searchParams] = useSearchParams()
    
    const search = searchParams.get('search')
    const filter = searchParams.get('filter')
        // console.log(data,searchParams.get('search'),searchParams.get('filter'))
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const productList = useSelector((state)=>state.user.products)
    const [products, setProduct] = useState([])
    const [categories,setCategories] = useState({})
    const [filterOption,setOption] = useState({
        name:'',
        category:1,
        price:1,
    })
    let catList = {}
    const productData = async () => {
        try {
            setLoading(true)
            setProduct(productList)
            await productList.find((pro)=>{
                if(catList[pro.category]==null){
                    catList[pro.category] = [pro]
                }else{
                    catList[pro.category].push(pro) 
                }
            })
            setCategories(catList)
            setInterval(()=>{
                setLoading(false)
            },2000)
        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }
    const setOnChange = async (e) => {
        e.preventDefault()
        setOption((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
            
    }
    const searchProduct = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            setProduct([])
            let {category,price,name} = filterOption
            if(category == '1')
            category = parseInt(category)
            price = parseInt(price)
            if(name == '' && price == 1 && category == 1)
                {
                    setProduct(productList)
                    setLoading(false)
                    return
                }
            name = name?.toLowerCase()
            console.log(price)
            if(category == 1)
            {   const filteredProducts = await productList.filter((pro)=>{
                    if(name == '' && price != 1){
                        switch(price){
                            case 2: return pro.price >= 1 && pro.price <500;
                            case 3: return pro.price >= 500 && pro.price <1000;
                            case 4: return pro.price >= 1000 && pro.price <2000;
                        }
                    }else if(name!='' && price == 1){
                        return pro.title.toLowerCase().includes(name);
                    }else{
                        switch(price){
                            case 2: return pro.price >= 1 && pro.price <500 && pro.title.toLowerCase().includes(name);
                            case 3: return pro.price >= 500 && pro.price <1000 && pro.title.toLowerCase().includes(name);
                            case 4: return pro.price >= 1000 && pro.price <2000 && pro.title.toLowerCase().includes(name);
                        }
                    }

                })
                setProduct(filteredProducts) 
            }else{
                console.log(categories)
                if(name == '' && price == 1)
                {
                    setProduct(categories[category])
                    setLoading(false)
                    return
                }
                const filteredProducts = await categories[category].filter((pro)=>{
                    if(name == '' && price != 1){
                        switch(price){
                            case 2: return pro.price >= 1 && pro.price <500;
                            case 3: return pro.price >= 500 && pro.price <1000;
                            case 4: return pro.price >= 1000 && pro.price <2000;
                        }
                    }else if(name!='' && price == 1){
                        console.log('1')
                        return pro.title.toLowerCase().includes(name);
                    }else{
                        switch(price){
                            case 2: return pro.price >= 1 && pro.price <500 && pro.title.toLowerCase().includes(name);
                            case 3: return pro.price >= 500 && pro.price <1000 && pro.title.toLowerCase().includes(name);
                            case 4: return pro.price >= 1000 && pro.price <2000 && pro.title.toLowerCase().includes(name);
                        }
                    }

                })
                console.log(filteredProducts)
                setProduct(filteredProducts)
            }
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError(err)
        }
    }
    useEffect(() => {
        productData()
    }, [productList])
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
    if (error) {
        return (
            <h3>Error...</h3>
        )
    }
    if (products.length <= 0) {
        return (
            <div className="alert alert-primary" role="alert">
                Product Not Found <a href="/">Go back to home page</a>
            </div>
        )
    }
    return (
        <>
        <div className="album py-5">
            <div className='container'>
                <div className='d-lg-flex mb-2 d-md-flex d-sm-block'>
                    <input className="form-control" name='name' value={filterOption.name} onChange={(e)=>setOnChange(e)} type="text" placeholder="Enter product name."/>
                    <select className="form-control" value={filterOption.category} onChange={(e)=>setOnChange(e)} name="category">
                        <option value={1}>All Category</option>
                        {Object.keys(categories).map((val,index)=><option value={val} key={index}>{val}</option>)}
                    </select>
                    <select className="form-control" value={filterOption.price} onChange={(e)=>setOnChange(e)} name="price">
                        <option value={1}>All Price</option>
                        <option value={2} >1 - 500</option>
                        <option value={3} >500 - 1000</option>
                        <option value={4} >1000 - 2000</option>
                    </select>
                </div>
                <center>
                    <div onClick={async(e)=>{
                        setProduct(productList)
                        setOption({name:'',category:1,price:1})
                        }} className="btn btn-secondary me-2">Clear Filter</div>
                    <div onClick={(e)=>searchProduct(e)} className="btn btn-primary">Filter Product</div>
                </center>
             {/*<select className="form-control">
                <option value={1}>All Category</option>
                {Object.keys(categories).map((val,index)=><option value={val} key={index}>{val}</option>)}
            </select> */}
            </div>
            <div className="container-fluid d-flex">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                    {products.map((product) => (
                        <Link to={`/view-page/${product.id}`} className="mt-5 col text-decoration-none" key={product.id}>
                            <div className="card shadow-sm position-relative">
                            <div className='position-absolute end-0 p-1 bg-success text-white text-center'>{parseInt(product.discountPercentage)}%</div>
                                <img className="bd-placeholder-img card-img-top overflow-hidden" width="100%" height="200" src={product.thumbnail} alt="" />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/view-page/${product.id}`} className="card-link text-decoration-none overflow-hidden" style={{ height: "22px" }}>{product.title}</Link>
                                        <i className="fas fa-solid fa-indian-rupee-sign float-right me-2">
                                            <label className="text-danger ml-4 font-weight-700">₹{product.price}</label>
                                            </i>
                                    </div>
                                    {/* <p className="card-text overflow-hidden text-secondary" style={{ height: "50px" }}>{product.description} </p> */}
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">Available Stock {product.stock} </small>
                                        <div className='p-1 bg-success text-white text-center'>⭐{product.rating}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        {/* <Contact/> */}
        </>
    )
}

export default CusCards