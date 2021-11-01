import React, { Component, useContext, useState } from 'react';
import $ from 'jquery'
import { Context } from '../store/appContext';


export const Login = () =>{
    // const { store, actions} = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleClick = () =>{
      const opts = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
          "password":password
        })
      }
      fetch('http://localhost:5000/token', opts)
        .then(resp => {
            if (resp.status === 200) return resp.json();
            else alert("There has been some error")
        })
        .then()
        .catch(error => {
          console.error("There was an error!!!", error);
        })
    }

        return (
        <div>
            <h1>Login</h1>
            <div>
              <input type = "text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type = "password"placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button onClick = {handleClick}>Login</button>
            </div>

        </div>
        );

}
