import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/userSlice'

export default function Cart() {
    const cart = useSelector((state)=>state.user.cart)
    const dispatch = useDispatch()
  return (
    <div>
      <section className="h-100 h-custom" style={{backgroundColor: '#eee'}}>
  <div className="container-sm container-fluid py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card">
          <div className="card-body p-4">

            <div className="row">

              <div className="col-lg-16">
                <h5 className="mb-3"><a href="/" className="text-body"><i
                      className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                <hr/>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1">Shopping cart</p>
                    <p className="mb-0">You have {cart.length} items in your cart</p>
                  </div>
                  {/* <div>
                    <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                        className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                  </div> */}
                </div>

                {cart.map((item)=><div className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src={item.thumbnail}
                            className="img-fluid rounded-3 d-sm-block d-none" alt="Shopping item" style={{width: '65px'}}/>
                        </div>
                        <div className="ms-3">
                          <h5 className='text-sm-small'>{item.title}(₹{item.price})</h5>
                          <p className="small mb-0 d-sm-none d-md-block d-none">{item.description}</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div style={{width: '50px'}}>
                          <h5 className="fw-normal mb-0">{item.count}</h5>
                        </div>
                        <div style={{width: '80px'}}>
                          <h5 className="mb-0">₹{item.count * item.price}</h5>
                        </div>
                        <button onClick={()=>dispatch(userActions.removeCartedProduct({
                            id:item.id
                        }))} style={{color: '#cecece',border:0}}><i className="fas fa-trash-alt"></i></button>
                      </div>
                    </div>
                  </div>
                </div>)}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
