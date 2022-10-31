import React,{useEffect, useState }from "react";
import "./form.css"
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { API_GET_CONTACT_BY_ID, API_UPDATE_CONTACT, SERVER_API_ENDPOINT } from "../../common/constant";
import { USER_TOKEN } from "../../common/constant";
import Cookies from "universal-cookie";


const UpdateContact = () =>{
  const { id } = useParams();
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [allEntry, setAllEntry] = useState([]);
  const history = useHistory();
  async function fetchContactById() {
    const cookies = new Cookies();
    const jwtToken = cookies.get(USER_TOKEN);
    const url = SERVER_API_ENDPOINT + API_GET_CONTACT_BY_ID +'/'+id;

    await axios.get(url, {
        headers: {
          "x-access-token": jwtToken,
        },
      })
      .then((response) => {
        if(response.data.contact){
          const contact = response.data.contact;
          setName(contact.name);
          setEmail(contact.email);
          setPhone(contact.phone);

         
        }
        
      })
      .catch((error) => {
        
      });
  }
  useEffect(() => {
    fetchContactById();
  },[]);

  const submitForm = async(e)=>{
    e.preventDefault();
    const newEntry={name:name,email:email,phone:phone};
    setAllEntry([...allEntry, newEntry]);

    try{
      const cookies = new Cookies();
      const jwtToken = cookies.get(USER_TOKEN);
      const url = SERVER_API_ENDPOINT + API_UPDATE_CONTACT +'/'+id;

      await axios.put(url,{
        name:name,
        email:email,
        phone: phone,
        photograph:'demo.jpg'
      },{headers: {
        "x-access-token": jwtToken,
      }}).then((response) => {
      
        if(response.data){
          
          history.push({
              pathname: "/dashboard"
          });
        }else if(response.error){
          

        }
      })
      .catch((error) => {
        
      });
    }catch(err){
      
    }
  }
  return(
    <>
      <div className='main__wrapper'>
        <div className='wrapper__col'>
          <div className='user__col'>
            <h1>Update User</h1>
            <form action='' onSubmit={submitForm}>

            <div className='form__group'>
                <input type='name' id='name' className='form-control'   placeholder='Name' 
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='form__group'>
                <input type='email' id='email' className='form-control'   placeholder='Email' 
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='form__group'>
                <input type='phone' id='phone' className='form-control'  placeholder='phone' 
                  value={phone || ''} 
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className='form__group'>
                <button type='submit' value='' className='btn'>Create New Contact</button>
              </div>

              
            </form>
          </div>
        </div>
      </div>
    </>
  )
};export default UpdateContact