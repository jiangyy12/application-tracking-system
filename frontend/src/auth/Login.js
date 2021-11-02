import React, { Component, useContext, useState } from 'react';
import $, { data } from 'jquery'
import { Context } from '../store/appContext';
import { useHistory } from 'react-router-dom';

export const Login = () =>{
    // const { store, actions} = useContext(Context);
    const [value, setValue] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const token = sessionStorage.getItem("token");
    console.log("your token",token)
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
      };
      
      fetch('http://localhost:5000/token', opts)
        .then(resp => {
            if (resp.status === 200) return resp.json()
            else alert("There has been some error")

        })
        .then(data =>{
          console.log("this is from backend",data);
          sessionStorage.setItem("token", data.access_token);
          window.location.reload();
        })
        .catch(error => {
          console.error("There was an error!!!", error);
        })
      }
       // this.switchPage('ApplicationPage');
     //window.location.reload(false);
      // props.switchPage('ApplicationPage')
    

        return (
        <div>
            <h1>Login</h1>
         
              {token && token != "" && token != undefined? ("You are logged in with" + token) :(
                  <div>
                  <input type = "text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <input type = "password"placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <button onClick = {handleClick}>Login</button>
                </div>
              )}
          

        </div>
        );

}
