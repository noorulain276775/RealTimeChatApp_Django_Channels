import React , {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert";

export const Login = () => {
    const baseUrl = "http://127.0.0.1:8000/";
    const [formData, setFormData] = useState({
      "email": "",
      "password": ""
    })
    const [errors, setErrors] = useState();  
    const handleFormSubmit = () => {
      fetch(`${baseUrl}user/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if(!response.ok){
          return response.json().then(errorData => {
            throw errorData;
          });
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        const token = data.token;
        document.cookie = `token=${token}; path=/`
        setErrors("");
      })
      .catch(error => {
        setErrors(error);
      })
  
    }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 gap-3">
    <div>
        <h1 className="">Welcome to ChatApp</h1>
        <p className="text-center">Please Login</p>
    </div>
    {errors && <Alert severity="error">{errors}</Alert>}
      <div>
        <TextField id="email" type="email" label="Email" variant="outlined"  onChange={e => setFormData({...formData, email: e.target.value})} />
      </div>
      <div>
        <TextField id="password" type="password" label="Password" variant="outlined"  onChange={e => setFormData({...formData, password: e.target.value})} />
      </div>
      <div>
      <Button id="login" variant="contained" onClick={handleFormSubmit}>Login</Button>
      </div>
    </div>
  )
}
