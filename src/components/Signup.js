import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", confirmPassword:""})

    let history = useNavigate()


    const handelSignUp = async(e)=> {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/createUsers", {
            method:"POST",
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password})
          });
          const json = await response.json();
          console.log(json)
          if (json.success) {
            localStorage.setItem("token",json.authtoken)
            history("/Home")
          } else {
            alert("Invalid Credentials")
          }
    }
    const changes = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    <div>
        <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">SIGN UP</h2>
                    <p className="text-white-50 mb-5">Please enter your Email and set the password!</p>

                    <div style={{position: "relative"}} className="form-outline form-white mb-4" >
                        <input onChange={changes} name='name'  type="text" id="name" className="classsssss form-control form-control-lg" />
                        <label className="form-label" style={{position:"absolute",top: "-12px",left: "12px",background: "rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))"}} htmlFor="name">Name</label>
                    </div>

                    <div style={{position: "relative"}} className="form-outline form-white mb-4 mt-5" >
                        <input onChange={changes} name='email'  type="email" id="email" className="classsssss form-control form-control-lg" />
                        <label className="form-label" style={{position:"absolute",top: "-12px",left: "12px",background: "rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))"}} htmlFor="email">Email</label>
                    </div>

                    <div style={{position: "relative"}} className="form-outline form-white mb-4 mt-5">
                        <input onChange={changes}  type="password" name='password' id="password" className="classsssss form-control form-control-lg my-4" />
                        <label className="form-label" style={{position:"absolute",top: "-12px",left: "12px",background: "rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))"}} htmlFor="password" >Password</label>
                    </div>

                    <div style={{position: "relative"}} className="form-outline form-white mb-4 mt-5">
                        <input onChange={changes}  type="password" name='confirmPassword' id="confirmPassword" className="classsssss form-control form-control-lg my-4" />
                        <label className="form-label" style={{position:"absolute",top: "-12px",left: "12px",background: "rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))"}} htmlFor="confirmPassword" >Confirm Password</label>
                    </div>

                    <button className="btn btn-outline-light btn-lg px-5 mt-4" type="submit" onClick={handelSignUp}>Signup</button>

                    {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                    </div> */}

                    </div>

                    <div>
                    <p className="mb-0">Already registered? <Link className="text-white-50 fw-bold" to="/" >Login</Link>
                    </p>
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

export default Signup
