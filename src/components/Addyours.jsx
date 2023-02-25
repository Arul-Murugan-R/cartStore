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
            <form className="row col-md-10 border border-secondary rounded p-md-3 needs-validation" method="POST" action="/add-yours" novalidate enctype="multipart/form-data">
                  <div className="form-group col-md-4">
                    <label for="inputName4">Name</label>
                    <input type="text" className="form-control" name="name" id="inputName4" placeholder="Name"/>
                  </div>
                  <div className="form-group col-md-4">
                    <label for="inputPlace4">Place</label>
                    <input type="Place" className="form-control" name="place" id="inputPlace4" placeholder="Place"/>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="inputPhoto4">Photo</label>
                    <input type="file" className="form-control"name="photo" id="inputPhoto4" placeholder="Photo"/>
                  </div>
                <div className="form-group col-md-5">
                  <label for="inputNumber">Contact-Number</label>
                  <input type="text" className="form-control"name="no" id="inputNumber" placeholder="Number for Contacting"/>
                </div>
                <div className="form-group col-md-5">
                  <label for="inputlm2">Land Mark</label>
                  <input type="text" className="form-control"name="mark" id="inputlm2" placeholder="Land Mark(Near Which)"/>
                </div>
                <div className="d-flex">
                    <div className="form-group col-md-5 col-lg-3 me-2">
                      <label for="inputCity">City</label>
                      <input type="text" className="form-control"name="city" id="inputCity"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label for="inputZip">Zip</label>
                        <input type="text" className="form-control"id="inputZip"/>
                    </div>
                    
                </div>
                <div className="form-group col-md-6">
                    <label>Email Id</label>
                    <input type="email" className="form-control" name="email" placeholder="Email Id" />
                </div>
                <div className="form-group col-md-4 me-2">
                    <label for="inputState">Location</label>
                    <input type="text" className="form-control" name="location" placeholder="Location" />
                  </div>
                  <div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1"name="desc" rows="5"></textarea>
                      </div>
                  </div>
                <div className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                    <label className="form-check-label" for="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                  <input type="hidden" name="_id" value="<%= product._id %>" />
                <button type="submit" className="btn btn-primary col-md-1">Submit</button>
              </form>
              
          </main>
          </>
    )
}

export default Addyours