import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationType, useNavigate } from "react-router-dom";
import { changeLogin } from "../redux/slice/loginSlice";
import { changeRegister, registerApi } from "../redux/slice/registerSlice";

function Register(){

    const value=useSelector((state)=>state.registerSlice)
    const{register,data}=value
    const dispatch=useDispatch()
    const navigate=useNavigate()

// After registration
    useEffect(()=>{
      if(data==true){
        navigate('/login/register/page')
      }
    },[data])
    console.log(data)


    return(<>

<section className="vh-100 bg: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example1cgn">Your Name</label>
                  <input type="text" id="form3Example1cg" className="form-control form-control-lg" onChange={(e)=>{dispatch(changeRegister({...register,name:e.target.value}))}} value={register.name}/>
                  
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                  <input type="email" id="form3Example3cg" className="form-control form-control-lg" onChange={(e)=>{dispatch(changeRegister({...register,email:e.target.value}))}} value={register.email} />
                  
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4cg">Password</label>
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg" onChange={(e)=>{dispatch(changeRegister({...register,password:e.target.value}))}} value={register.password}/>
                  
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4cdg">Aadhar</label>
                  <input type="text" id="form3Example4cdg" className="form-control form-control-lg" onChange={(e)=>{dispatch(changeRegister({...register,aadhar:e.target.value}))}}  value={register.aadhar}/>
                  
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example2cg">Phone</label>
                  <input type="text" id="form3Example2cg" className="form-control form-control-lg" onChange={(e)=>{dispatch(changeRegister({...register,phone:e.target.value}))}} value={register.phone} />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example5cg">City</label>
                  <input type="text" id="form3Example5cg" className="form-control form-control-lg" onChange={(e)=>{dispatch(changeRegister({...register,city:e.target.value}))}} value={register.city}/>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example6cg">Address</label>
                  <input type="text" id="form3Example6cg" className="form-control form-control-lg" onChange={(e)=>{dispatch(changeRegister({...register,address:e.target.value}))}} value={register.address}/>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example7cg">Area</label>
                  <input type="text" id="form3Example7cg" className="form-control form-control-lg" onChange={(e)=>{dispatch(changeRegister({...register,area:e.target.value}))}} value={register.area} />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example8cg">Pin code</label>
                  <input type="text" id="form3Example8cg" className="form-control form-control-lg" onChange={(e)=>{dispatch(changeRegister({...register,pin:e.target.value}))}} value={register.pin} />
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label className="form-check-label" htmlFor="form2Example3g">
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={()=>dispatch(registerApi(register))}>Register</button>
                </div>

                

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>)
}

export default Register