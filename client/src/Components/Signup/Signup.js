import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";

import axios from  "axios";
import { useHistory } from "react-router";
import SignUpLoading from "../Loading/SignUpLoading";

export default function Signup() {
  const history = useHistory();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading,setLoading]=useState(false);
  let [err,setErr]=useState("")
  const handleSubmit = async(event) => {
    event.preventDefault()
      console.log('reacheed')
    setLoading(true)
    try{
    const res=await  axios.post("http://localhost:5000/signup",{
      name:document.getElementById('name').value,
      email:document.getElementById('email').value,
      password:document.getElementById('password').value,
  },{
    headers: {
      'Content-Type': 'application/json',
    }
  })
     console.log(res)
    history.push("/login");
  
}catch (error) {
  if (error.response) {
    console.log(error)
    // Backend sent JSON with message
    setErr(error.response.data.message);
  } else if (error.request) {
    setErr("No response from server");
  } else {
    setErr(error.message);
  }
}
}
  
  return (<>
    {loading && <SignUpLoading/> } <div>
      <div className="signupParentDiv">
        <form>
          <label> Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
          <br />
          <label>Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          <br />
          
          <label>Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Signup</button>

        </form>
        <Link to="/login">Login</Link>
        {err && <p style={{ color: "red",height:'200px' }}>{err}</p>}
      </div>
    </div> 
    </>
  );
}
