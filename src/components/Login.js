import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({email:"", password:""})

    let history = useNavigate()

    const handelLogin = async(e)=> {
        console.log(credentials)
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method:"POST",
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          console.log(json)
          if (json.success) {
            // save the auth tokoen and allow to redirect
            localStorage.setItem("token",json.authToken)
            history("/Home")
          } else {
            alert("Invalid Credentials")
          }
    }
    const change = (e)=>{
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

                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                    <div style={{position: "relative"}} className="form-outline form-white mb-4 mt-5" >
                        <input name='email'  type="email" id="email" className=" classsssss form-control form-control-lg" onChange={change} value={credentials.email} />
                        <label className="form-label" style={{position:"absolute",top: "-12px",left: "12px",background: "rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))"}} htmlFor="email">Email</label>
                    </div>

                    <div style={{position: "relative"}} className="form-outline form-white mb-4 mt-5">
                        <input  type="password" name='password' id="password" className=" classsssss form-control form-control-lg my-4" onChange={change} value={credentials.password} />
                        <label className="form-label" style={{position:"absolute",top: "-12px",left: "12px",background: "rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))"}} htmlFor="password" >Password</label>
                    </div>

                    <button className="btn btn-outline-light btn-lg px-5 mt-4" onClick={handelLogin} type="submit">Login</button>
                    </div>

                    <div>
                    <p className="mb-0">Don't have an account? <Link to="/Singup" className="text-white-50 fw-bold" >Sign Up</Link>
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

export default Login
