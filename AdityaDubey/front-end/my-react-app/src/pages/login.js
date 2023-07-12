import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/login?email=${email}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      console.log(data);

      if (data.responseCode === 401) {
        window.alert("Unathorized !!");
      }
       else if (data.responseCode == 200) {
        window.alert("Login Success");  
           
      }

      console.log("response0000", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <h5>
          Click to Create Account{" "}
          <a href="http://localhost:3000/registration"> Register</a>
        </h5>
      </form>
    </div>
  );
};

export default Login;
