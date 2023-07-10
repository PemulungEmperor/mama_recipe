import React,{ useEffect, useState } from 'react'
import background from "../img/BG.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/apiCall'
import Swal from 'sweetalert2'

const Register = () => {
    //response from redux
    const dispatch = useDispatch()
    const { isError, isPending} = useSelector(state=>state.register)
    // shown password 
    const [passwordShown, setPasswordShown] = useState(false);
    const[password, setPassword] = useState('')
    const[confirmPassword, setconfirmPassword] = useState('')

    const togglePassword = () => {
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
    };

    //for submit form 
    const[names, setName] = useState('')
    const[number, setNumber] = useState('')
    const[email, setEmail] = useState('')

    // api interaction with axios to register api
    const Register = async(e) => {
      e.preventDefault()
      await registerUser({username : names, email, password, confirmPassword}, dispatch)
    }

    //sweet2
    const showAlert = () => {
      Swal.fire({
          title: "Success",
          text: "Register successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(()=>{
          window.location.href = "/login"
        })
    }

    useEffect(() => {
      document.title = "Mama Recipe - Register"
      if(isError === false && isPending === false) {
        showAlert()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isPending])

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
        <div className="col-lg-6 rounded-3 bg-image d-flex justify-content-center align-items-center" style={{ "backgroundImage": `url(${background})`,"height": "100vh", "backgroundSize":" cover", "position": "relative", "overflow": "hidden" }}>     
                <div className="overlay" style={{ "position":"absolute", "top":"0", "left":"0", "width": "100%", "height": "100%", "backgroundColor": "#EFC81A", "opacity": "0.65" }}>
                    
                </div>   
                <div className='' style={{ "position":"absolute"}}>
                <img className="img-fluid" src={require('../img/icon/mamaLogo.png')} style={{ "maxWidth":"100px","filter": "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))" }}  alt="logo"></img>
                </div>
                      
        </div>
            <div className="col-sm-6 rounded-3" style={{ "zoom":"90%" }}>
                <div className="header">
                </div>
                <div className="body d-flex flex-column justify-content-center align-items-center">
                    <div className="header">
                        
                    </div>
				<div className="body mb-2 mt-2" >
					<h3 className="text-center" style={{ "color":"#EFC81A" }}>
						Let's Get Started
					</h3>
					<p className="text-center text-muted mt-3">
						Create new account to access all features
					</p>
                    <hr/>
					<div>
						<form onSubmit={Register}>
							<div className="form-group text-gray-600">
							    <label className="mb-2">Name</label><span className="text-danger"> *</span>
							    <input id="name" autoComplete="username" type="text" className="form-control" name="username" value={names} onChange={(e)=> setName(e.target.value)}  autoFocus required placeholder="Enter name"/>
							</div>

                            <div className="form-group text-gray-600">
							    <label className="mb-2 mt-3">Email adress</label><span className="text-danger"> *</span>
							    <input id="email" autoComplete="email" type="email" className="form-control" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}  autoFocus required placeholder="Enter email adress"/>
							</div>

                            <div className="form-group text-gray-600">
							    <label className="mb-2 mt-3">Phone Number</label>
							    <input id="phone" type="text" className="form-control" autoComplete="phone" name="phoneNumber" value={number} onChange={(e)=> setNumber(e.target.value)} autoFocus placeholder="08xxxx"/>
							</div>
							<div className="form-group text-gray-600">
							   <label className="mb-2 mt-3">Create new password <span className="text-danger"> *</span></label>
							   <div className="input-group bg-white">
								  <input id="passUser" type={passwordShown ? "text" : "password"} className="form-control" name="password"  value={password} onChange={(e)=> setPassword(e.target.value)} required  autoComplete="current-password" placeholder="Enter password"/>
                                  <button className="btn btn-light border" type="button" onClick={togglePassword}><i className="fa-solid fa-eye"></i></button>
								</div>
							 </div>

                <div className="form-group text-gray-600">
                  <label className="mb-2 mt-3">Confirm password <span className="text-danger"> *</span></label>
                  <div className="input-group bg-white">
                      <input id="passUserConfirm" type={passwordShown ? "text" : "password"} className="form-control" name="confirmPassword"  value={confirmPassword} onChange={(e)=> setconfirmPassword(e.target.value)} required autoComplete="current-password" placeholder="Confirm password"/>
                      <button className="btn btn-light border" type="button" ><i className="fa-solid fa-eye"></i></button>
                    </div>
                    <p className="text-danger mt-2 mb-2">{isError? "Something wrong, check again!" : ""}</p>
                </div>

                <div className="form-check mt-3">
                  <input className="form-check-input bg-warning" type="checkbox" id="flexCheckChecked"/>
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    I agree to terms & conditions
                  </label>
                </div>
                
                <div className="form-group text-center mt-4">
                  <Link className="btn btn-danger btn-oval shadow px-4 mx-auto text-white"  to="/login">Back</Link>
                  <button type="submit" className="btn btn-oval shadow px-4 ms-2 text-white" style={{ "backgroundColor":"#EFC81A" }}> Register</button>
								
							</div>
						</form>

              <div className="mt-4 text-muted text-center">
                  <p>Already have an account? 
                    <Link to="/login"> Log in here</Link>
                    
                  </p>
              </div>
					</div>
				</div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Register
