import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { USER_TOKEN,SERVER_API_ENDPOINT,API_REGISTER } from '../common/constant';
import { Link, useHistory } from 'react-router-dom';

const SignUp = () =>{
  const [firstname, setFirstName] = useState(null);
  const [middlename, setMiddleName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [allEntry, setAllEntry] = useState([]);
  
  const history = useHistory();

  const submitForm = async(e)=>{
  e.preventDefault();
  const newEntry={firstname:firstname,middlename:middlename,lastname:lastname,email:email,password:password};
  setAllEntry([...allEntry, newEntry]);

  try{
    const cookies = new Cookies();
    const url = SERVER_API_ENDPOINT + API_REGISTER;
    
    const data = {
      first_name:firstname,
      middle_name:middlename,
      last_name:lastname,
      email:email,
      password: password,
    };

    await axios.post(url,data).then((response) => {
      if(response.data.token){
        const jwtToken = response.data.token;
        cookies.set(USER_TOKEN,jwtToken);

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
      <div className='login__col'>
        {/* <div className='alert alert-danger'>
          <p>Your Email or Password is Incorrect</p>
        </div> */}
        <div className='login__wrap'>
        <h1>Register New User</h1>
      <form action='' onSubmit={submitForm}>
        <div className='form__group'>
        <input type='text' id='firstName' className='form-control'   placeholder='First Name' 
          value={firstname || ''}
          onChange={(e) => setFirstName(e.target.value)}
        />
        </div>
        <div className='form__group'>
        <input type='text' id='middleName' className='form-control'   placeholder='Middle Name' 
          value={middlename || ''}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        </div>
        <div className='form__group'>
        <input type='text' id='lastName' className='form-control'   placeholder='Last Name' 
          value={lastname || ''}
          onChange={(e) => setLastName(e.target.value)}
        /></div>

            <div className='form__group'>
            <input type='email' id='email' className='form-control'   placeholder='Email' 
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className='form__group'>
            <input type='password' id='password' className='form-control'  placeholder='password' 
              value={password || ''} 
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>

        <div className='form__group'>
        <button type='submit' value='' className='btn'>Register User</button>
        </div>

        <div className='signup__col'>
          <p>Already registered? <Link to={'/'}>Sign In</Link></p>
        </div>

            
          </form>
        </div>
      </div>
    </div>
  </div>
  </>
  )
};export default SignUp