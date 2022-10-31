import React,{useState }from "react";
import logo from "../UserList/user.jpg"

import "./form.css"

const ViewUser = () =>{
  
  return(
    <>
      <div className="user__profile">
      <div className="user__list">
          <div className="user__inner__grid">
            <figure>
              <img src={logo} className="img__wrap"  alt="title"/>
            </figure>
            <div  className="user__infos">
              <h2>John Doe</h2>
              <ul>
                <li>978522255</li>
                <li>johndoe@gmail.com</li>
              </ul>

            
            </div>
          </div>
        </div>
      </div>
    </>
  )
};export default ViewUser 