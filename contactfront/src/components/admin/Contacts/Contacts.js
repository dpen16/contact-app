import React, { useEffect, useState } from "react";
import "./contact.css";
import logo from "./user.jpg";
import axios from "axios";
import { API_FETCH_CONTACTS, SERVER_API_ENDPOINT,API_DELETE_CONTACT, API_MARK_CONTACT_FAVOURITE } from "../../common/constant";
import { USER_TOKEN } from "../../common/constant";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const history = useHistory();

  async function fetchContacts() {
    const cookies = new Cookies();
    const jwtToken = cookies.get(USER_TOKEN);
    const url = SERVER_API_ENDPOINT + API_FETCH_CONTACTS;
    await axios
      .get(url, {
        headers: {
          "x-access-token": jwtToken,
        },
      })
      .then((response) => {
        console.log(response.data.contacts);
        setContacts(response.data.contacts);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchContacts();
  }, []);


  const deleteContact = async(e)=>{
    const currentContactId = e.currentTarget.id;
    const cookies = new Cookies();
    const jwtToken = cookies.get(USER_TOKEN);
    const url = SERVER_API_ENDPOINT + API_DELETE_CONTACT+'/'+currentContactId;
    await axios
      .delete(url, {
        headers: {
          "x-access-token": jwtToken,
        },
      })
      .then((response) => {
         
          fetchContacts();
          history.push({
            pathname: "/dashboard"
        });
      })
      .catch((error) => {
        
      });
  }

  const markFavouriteContact = async(e)=>{
    const currentContactId = e.currentTarget.id;
    const cookies = new Cookies();
    const jwtToken = cookies.get(USER_TOKEN);
    const url = SERVER_API_ENDPOINT + API_MARK_CONTACT_FAVOURITE+'/'+currentContactId;
    await axios
      .put(url, {},{
        headers: {
          "x-access-token": jwtToken,
        },
      })
      .then((response) => {
          console.log(response);
          fetchContacts();
          history.push({
            pathname: "/dashboard"
        });
      })
      .catch((error) => {
        
      });
  }

  const editContact = (e) => {
    history.push({
      pathname: "/contact/"+e.currentTarget.id
  });
  }
  return (
    <>
      <div className="user__grid">
        {contacts.map((data) => (
          <div className="user__list">              
            <div className="user__inner__grid">
              
              <figure>
                <img src={logo} className="img__wrap" alt="title" />
              </figure>
              <div className="user__infos">
                <h2>{data.name} </h2>
                <ul>
                  <li>{data.phone}</li>
                  <li>{data.email}</li>
                  <li>{(data.is_favourite?'':'')}</li>
                </ul>

                <div className="user__btn">
                  <button type="button" className="btn-user btn-edit" id={data.id} onClick={editContact}>
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button type="button" className="btn-user btn-delete" id={data.id} onClick={deleteContact}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </button>

                  <button type="submit" className="btn-user btn-favorites" id={data.id} onClick={markFavouriteContact}>

                  {(data.is_favourite?
                  
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    class="bi bi-heart-fill fill-green" 
                    viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg> :

                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart-fill btn-default"
                    viewBox="0 0 16 16"
                    >
                    <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                    </svg>
                  
                  
                  
                  
                  )}
                    
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Contacts;
