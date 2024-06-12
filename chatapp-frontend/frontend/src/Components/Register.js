import React from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export const Register = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 gap-3">
    <div>
        <h1 className="">Welcome to WhatsApp Clone</h1>
        <p className="text-center">Please register to start</p>
    </div>
      <div>
        <TextField id="first_name" type="text" label="First Name" variant="outlined" />
      </div>
      <div>
        <TextField id="last_name" type="text" label="Last Name" variant="outlined" />
      </div>
      <div>
        <TextField id="email" type="email" label="Email" variant="outlined" />
      </div>
      <div>
        <TextField id="password" type="password" label="Password" variant="outlined" />
      </div>
      <div>
      <Button id="register" variant="contained">Register</Button>
      </div>
    </div>
  );
};
