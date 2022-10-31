import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { USER_TOKEN } from "../../common/constant";
import Contacts from "./../Contacts/Contacts";
import "./dashboard.css"

const Dashboard = () =>{
  const history = useHistory();
  const logoutUser = (e)=>{
    const cookies = new Cookies();
    cookies.remove(USER_TOKEN,{path:'/'});
    console.log('logout successfull.');
    history.push({
      pathname:'/dashboard'
    })
  }

  return(
    <>
      <div className="dashboard__main">
        <div className="container">
          <div className="top__dashboard">
            <div className="dashboard__infos">
              <h1>Welcome User !</h1>
              <span>Here is your contact list!!</span>
            </div>

            <div className="dashboard__btn">
              <a href="/contact-create"  className="btn">Add New</a>
              <button className="btn btn-relative" onClick={logoutUser}>Logout</button>
            </div>
          </div>

          <Contacts />
        </div>
      </div>
    </>
  )
};export default Dashboard