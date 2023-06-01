import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    let username = useRef();
    let email = useRef();
    let password = useRef();
    let confirmPassword = useRef();
    let phone = useRef();
    let dob = useRef();
    let [verified, setverified] = useState(false);
    let navigate = useNavigate();


    useEffect(()=>{
        // ---------verify user has authenticated already .. if yes redirect to home--------//
        // ---------if user has been already login and did'nt logout..then it has to go home page-------//
        if(localStorage.getItem("userdetails") != null)
        {
            navigate("/home")
        }
    } , [])

    let verifyEmail = () => {
        setTimeout(() => {
            setverified(true)
        }, 2000)
    }

        let handleSignup = (e)=>{
            //----------stop Auto REfresh------------//
            e.preventDefault();

            //------------validate some values-----------//
            if(password.current.value!=confirmPassword.current.value)
            {
                 alert("Password missmatch")
                 return
            }
            if( new Date() < new Date(dob.current.value )  )
            {
                alert("invalid dob")
                return
            }


            //-----------Create an object of new user to send-------//
            let newUser = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value,
                phone : phone.current.value,
                dob : dob.current.value
            }

            //-----------post the object to the db collection-----//
            fetch( " http://localhost:4000/users" ,{
                                                      method : "POST",
                                                      headers : {"Content-Type" : "application/json"},
                                                      body : JSON.stringify(newUser)
                                                   
                                                    })
            .then(()=>{
                alert("Account has been created Successully");
                navigate("/login");
            })
            
        }
    return (
        <div className="signup-cont">
            <div className="signup-box">
                <h1>Signup</h1>
                <hr />
                <form onSubmit={handleSignup}>
                    <input type="text" placeholder="Username" ref={username} required />
                    <input type="email" placeholder="Email id" ref={email} required />
                    <input type="password" placeholder="Password" ref={password} required />
                    <input type="text" placeholder="Confirm Password" ref={confirmPassword} required />
                    <input type="tel" placeholder="Phone number" max="10" min="10" ref={phone} required />
                    <input type="date" ref={dob} required />
                    <input type="submit" value="Signup" disabled={verified == false ? true : false} />
                </form>
                <button onClick={verifyEmail}>Verify Email</button>
                <span>Verify The Email To Signup</span>
            </div>
        </div>
    );
}

export default Signup;


// const url = 'https://zerobounce1.p.rapidapi.com/v2/validate?api_key=347aab0fc4304c4088295e5b8b08fe5e&email=sachinhchauhan6360%40gmail.com';
//             const options = {
//                 method: 'GET',
//                 headers: {
//                     'X-RapidAPI-Key': '525865ab77msh3853ccda0c84d31p157c14jsn2e874cf57be5',
//                     'X-RapidAPI-Host': 'zerobounce1.p.rapidapi.com'
//                 }
//             };

//         fetch(url,options)
//         .then((res)=>{return res.json()})
//         .then((data)=>{console.log(data);
//             if(false) //data.status=="valid"
//             {
//                 setverified(true)
//             }
//             else{
//                 alert("invalid email , please enter valid one")
//             }
//         })