import React , {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert";

export const Register = () => {
  const baseUrl = "http://127.0.0.1:8000/";
  const [formData, setFormData] = useState({
    "email": "",
    "first_name": "",
    "last_name": "",
    "password": ""
  })
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = () => {
    fetch(`${baseUrl}user/register/`, {
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
      setSuccessMessage("User registered successfully");
      setErrors({});
    })
    .catch(error => {
      setErrors(error);
      setSuccessMessage("");
    })

  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 gap-3">
    <div>
        <h1 className="">Welcome to ChatApp</h1>
        <p className="text-center">Please register to start</p>
    </div>
    {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {Object.keys(errors).length > 0 && (
        <Alert severity="error">
          {Object.entries(errors).map(([field, messages]) => (
            <div key={field}>
              {field}: {messages.join(", ")}
            </div>
          ))}
        </Alert>
      )}
      <div>
        <TextField id="first_name" type="text" label="First Name" variant="outlined" onChange={e => setFormData({...formData, first_name: e.target.value})} />
      </div>
      <div>
        <TextField id="last_name" type="text" label="Last Name" variant="outlined"  onChange={e => setFormData({...formData, last_name: e.target.value})} />
      </div>
      <div>
        <TextField id="email" type="email" label="Email" variant="outlined"  onChange={e => setFormData({...formData, email: e.target.value})} />
      </div>
      <div>
        <TextField id="password" type="password" label="Password" variant="outlined"  onChange={e => setFormData({...formData, password: e.target.value})} />
      </div>
      <div>
      <Button id="register" variant="contained" onClick={handleFormSubmit}>Register</Button>
      </div>
    </div>
  );
};
