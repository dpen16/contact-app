import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import './login.css';
// import { useFormik } from 'formik';
import { useHistory } from "react-router";
import Cookies from 'universal-cookie';
import {USER_TOKEN} from './../common/constant';
import Axios from "axios";
import { Link } from 'react-router-dom';

const Login = () =>{
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);

  const [allEntry, setAllEntry] = useState([]);

  const [loading,setLoading] = useState(false);
  const authenticatePath = "signin";
  const history = useHistory();
  const submitForm = async(e)=>{
    e.preventDefault();
    console.log('here');
    const newEntry={email:email,password:password};
    setAllEntry([...allEntry, newEntry]);
   
   
    setLoading(true);
    const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;
    try{
      const cookies = new Cookies();
      const checkUserToken = cookies.get(USER_TOKEN);

      if(!checkUserToken){
      const url = apiEndPoint + authenticatePath;
      await Axios.post(url,{
        email:email,
        password: password
      }).then((result)=>{
        if(result.data.token){
          const jwtToken = result.data.token;
          cookies.set(USER_TOKEN,jwtToken);

          history.push({
              pathname: "/dashboard"
          });
        }else if(result.data.error){
          setError(result.data.error);
        }
      }).catch(error=>{
        
          
      });
        
    }else{
      // user already login, redirect to dashboard
      console.log('user is already logged in');
      history.push({
        pathname: "/dashboard"
    })
    }
    setLoading(false);

}catch(e){
    console.log(e);
    
  }///here
}




  return(
  <>
  <div className='main__wrapper'>
    <div className='wrapper__col'>
      <div className='login__col'>
        {/* <div className='alert alert-success'>
          <p>Your Email or Password is correct</p>
        </div>
         */}
         {error?
         <div className='alert alert-danger'>
          <p>{error}</p>
        </div>
        :''}
        <div className='login__wrap'>
          <h1>User Login</h1>
          <form action='' onSubmit={submitForm}>
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
              <button type='submit' value='' className='btn'>Sign In</button>
            </div>

          <div className='signup__col'>
            <p>Not registered? <Link to={'signup'}>Create an account</Link></p>
          </div>

            
          </form>
        </div>
      </div>
    </div>
  </div>
  </>
  )
};export default Login