import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  let [userdetails, setUserDetails] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    let userdetails = JSON.parse(localStorage.getItem("userdetails"));
    setUserDetails(userdetails)
  }, [])

  let logout = () => {
    //--------------------clear the current details-----------------------//

    localStorage.removeItem("userdetails");
    alert("Logout Successfull");

    //  ---------re-direct to login page---------------------------//

    navigate("/login");
  }

  let deleteAccount = ()=>{
    // --------------make the confirmation from user to delete-----------//
    let pwd=prompt("Are you sure to delete , if yes please provide password");
    if(pwd!=userdetails.password)
    {
      alert("invalid password..!!!");
      return;
    }

    // -------------delete the same object {} from user [] collection from (DB)------//
    let config = {method : "DELETE"};

    fetch(" http://localhost:4000/users/" + userdetails.id , config)
    .then(()=>{
           // --------------navigate to signup page--------------//
         localStorage.removeItem("userdetails");
         alert("your account ha been deleted permanently");
         navigate("/")
    })
     
 }
  return (
    <div className="profilepage">
      <Navbar />
      {userdetails && <div className="user-details">
        <h1>{userdetails.username}</h1>
        <h1>{userdetails.email}</h1>
        <h1>{userdetails.dob}</h1>
        <button onClick={logout}>Logout</button>
        <button onClick={deleteAccount}>Delete Account</button>
      </div>}
    </div>
  );
}

export default Profile;