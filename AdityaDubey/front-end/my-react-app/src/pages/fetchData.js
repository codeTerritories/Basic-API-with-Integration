import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [responseData,setResponseData]=useState({})

  const fetchUser = async () => {
    try {
      // const response = await axios.get(`/getData/${userId}`);
      const response = await fetch(`/fetchData?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json();
      console.log(data)

      if(data.status===422 || !data){
        window.alert("Something went wrong !!");
        console.log("Something went wrong");
      }
       if(data.responseCode===200){

        setResponseData(data.user)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <div>
      <h1>User Details</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      {responseData ? (
        <div>
          <p>Name: {responseData.name}</p>
          <p>Mobile NO: {responseData.mobileNumber}</p>
          <p>Email: {responseData.email}</p>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default User;
