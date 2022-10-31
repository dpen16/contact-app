import Axios from "axios";
import React,{useState }from "react";
import { SERVER_API_ENDPOINT,API_POST_CONTACT,USER_TOKEN } from "../../common/constant";
import "./form.css"
import { useHistory } from "react-router";
import Cookies from "universal-cookie";

const CreateContact = () =>{
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [allEntry, setAllEntry] = useState([]);
  const history = useHistory()
  
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  const submitForm = async(e)=>{
        e.preventDefault();
        const newEntry={name:name,email:email,phone:phone};
        setAllEntry([...allEntry, newEntry]);

        try{
          const cookies = new Cookies();
          const jwtToken = cookies.get(USER_TOKEN);
          const url = SERVER_API_ENDPOINT + API_POST_CONTACT;

          const formData = new FormData();
          formData.append('file',image);
          formData.append('name',name);
          formData.append('email',email);
          formData.append('phone',phone);
          const data ={
            name:name,
            email:email,
            phone: phone,
            photograph:image.data.name
          };
          const axiosOptions = {
            method: "post",
            url: url,
            data: data,
            headers: {"x-access-token": jwtToken },
          };
          await Axios(axiosOptions).then((response) => {
            if(response.data.contact){
              setName(null);
              setEmail(null);
              setPhone(null);
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
            <h1>Create New User</h1>
            <form action='' onSubmit={submitForm}>

            <div className='form__group'>
                <input type='text' id='name' className='form-control' placeholder='Name' 
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='form__group'>
                <input type='email' id='email' className='form-control' placeholder='Email' 
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='form__group'>
                <input type='phone' id='phone' className='form-control' placeholder='phone' 
                  value={phone || ''} 
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className='form__group'>
              {image.preview && <img src={image.preview} width='100%' height='200' />}
                <input type='file' id='fileInput' className='form-control' placeholder='file' 
                  value={selectedFile|| ''}
                  onChange={handleFileChange}
                />
              </div>

              <div className='form__group'>
                <button type='submit' value='' className='btn'>Create New Contact</button>
              </div>

              
            </form>
            {status && <h4>{status}</h4>}
          </div>
        </div>
      </div>
    </>
  )
};export default CreateContact