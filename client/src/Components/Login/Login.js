import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";
import Logo from "../../olx-logo.png";
import RoundLoading from "../Loading/RoundLoading";
import "./Login.css";

function Login() {
  const API = process.env.REACT_APP_API_URL;
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading,setLoading]=useState(false)
  let[err,setErr]=useState("")
  const history = useHistory()
  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();
    try{
    const res=await axios.post(`${API}/login`,{
      email:document.getElementById('email').value,
      password:document.getElementById('password').value,


      }, {
        headers: { "Content-Type": "application/json" }
      })
      localStorage.setItem("token", res.data.token);
         console.log(res)
         history.push('/')
      
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


  };
  return (<>
    {loading && <RoundLoading/> }
    <div>
      <div className="loginParentDiv">
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <br />
          <input
            className="input"
            type="email"
            placeholder="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
        {err && <p style={{ color: "red",height:'200px' }}>{err}</p>}

      </div> 
    </div>
    </>
  );
}

export default Login;
