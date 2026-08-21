import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";
import Logo from "../../olx-logo.png";
import RoundLoading from "../Loading/RoundLoading";
import "./Login.css";
function Login() {
  const API = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault(); // MUST be first

    console.log("FORM SUBMITTED");
    console.log("API:", API);
    console.log("Email:", email);

    setLoading(true);
    setErr("");

    try {
      const res = await axios.post(`${API}/login`, {
        email: email,
        password: password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);

      history.push("/");
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      if (error.response) {
        setErr(error.response.data.message || "Login failed");
      } else if (error.request) {
        setErr("No response from server");
      } else {
        setErr(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <RoundLoading />}

      <div className="loginParentDiv">
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <br />

          <input
            className="input"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />

          <label>Password</label>
          <br />

          <input
            className="input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <br />

          <button type="submit">
            Login
          </button>
        </form>

        <Link to="/signup">Signup</Link>

        {err && (
          <p style={{ color: "red" }}>
            {err}
          </p>
        )}
      </div>
    </>
  );
}

export default Login;