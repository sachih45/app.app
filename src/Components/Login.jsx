import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    let email =  useRef();
    let password =  useRef();
    let navigate = useNavigate();

    let handleLogin = (e)=>{
        e.preventDefault();
        fetch("http://localhost:4000/users")
        .then((res)=>{return res.json()})
        .then((data)=>{
            let user = data.find((user)=>{ return user.email===email.current.value});
            console.log(user);
            if(user==undefined)
            {
                alert("user not found");
            }
            else if(user.password !== password.current.value)
            {
                alert("invalid password");
            }
            else
            {
                alert("login successfull");
                localStorage.setItem("userdetails" , JSON.stringify(user));
                navigate("/home")
            }
        })

    }

    return ( 
        <div className="signup-cont">
            <div className="signup-box">
                <h1>Login</h1>
                <hr />
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email id" ref={email} required/>
                    <input type="password" placeholder="Password" ref={password} required />
                    <input type="submit" value="login" />
                </form>
            </div>
        </div>
     );
}
 
export default Login;




