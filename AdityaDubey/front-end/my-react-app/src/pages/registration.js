
import React, { useState } from 'react';
import './page.css';
import axios from 'axios';


function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      mobileNumber,
      password,
      confirmPassword,
    };

    const res=await fetch("/registration",{
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              name,email,mobileNumber,password,confirmPassword
            })
          })
          const data= await res.json();

          if(data.status===422 || !data){
            window.alert("Something went wrong !!");
            console.log("Something went wrong");
          }else{
            window.alert("Registration sucessfull");
            console.log("Success..")
          }

    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMobileNumber('');
  };

  return (
    <div className='main'>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
         <h5>Already a user ? Click here to  <a href='http://localhost:3000/login'>Login</a></h5>
         <h5>For view user <a href='http://localhost:3000/fetchData'>click here</a></h5>
      </form>
    </div>
  );
}

export default RegistrationForm;
