import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Addyours = () => {


    return(
        <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/home">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Add Yours</li>
          </ol>
        </nav>
        <main className="container">
          {error && <div className="alert alert-danger" role="alert">
            {error}
          </div>}
            <form className="row col-md-10 border border-secondary rounded p-md-3 needs-validation" onSubmit={submitHandler}>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputName4">Name</label>
                    <input type="text" className="form-control" name="name" id="inputName4" placeholder="Name" onBlur={onBlurHandler} />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputPlace4">Place</label>
                    <input type="Place" className="form-control" name="place" id="inputPlace4" placeholder="Place" onBlur={onBlurHandler} />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPhoto4">Photo</label>
                    <input type="file" className="form-control"name="photo" id="inputPhoto4" placeholder="Photo" onBlur={onBlurHandler} />
                  </div>
                <div className="form-group col-md-5">
                  <label htmlFor="inputNumber">Contact-Number</label>
                  <input type="text" className="form-control"name="no" id="inputNumber" placeholder="Number for Contacting" onBlur={onBlurHandler} />
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="inputlm2">Land Mark</label>
                  <input type="text" className="form-control"name="mark" id="inputlm2" placeholder="Land Mark(Near Which)" onBlur={onBlurHandler} />
                </div>
                <div className="d-flex">
                    <div className="form-group col-md-5 col-lg-3 me-2">
                      <label htmlFor="inputCity">City</label>
                      <input type="text" className="form-control"name="city" id="inputCity" onBlur={onBlurHandler} />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputZip">Zip</label>
                        <input type="text" className="form-control"id="inputZip" name="zip" onBlur={onBlurHandler} />
                    </div>
                    
                </div>
                <div className="form-group col-md-6">
                    <label>Email Id</label>
                    <input type="email" className="form-control" name="email" placeholder="Email Id"  onBlur={onBlurHandler} />
                </div>
                <div className="form-group col-md-4 me-2">
                    <label htmlFor="inputState">Location</label>
                    <input type="text" className="form-control" name="location" placeholder="Location"  onBlur={onBlurHandler} />
                  </div>
                  <div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1"name="desc" rows="5" onBlur={onBlurHandler}></textarea>
                      </div>
                  </div>
                <div className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                    <label className="form-check-label" htmlFor="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                  {/* <input type="hidden" name="_id" value="<%= product._id %>" /> */}
                <button type="submit" className="btn btn-primary col-md-1">Submit</button>
              </form>
              
          </main>
          </>
    )
}

export default Addyours