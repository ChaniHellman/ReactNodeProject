import React, { useState, useRef } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { setUsername } from '../redux/userSlice';  
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages'; 
import "../css.css";
import 'primeicons/primeicons.css'; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUserNameLocal] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const msgs = useRef(null);

  const load = () => {
    setLoading(true);
    return new Promise(resolve => setTimeout(resolve, 2000)); 
  };

  const createUser = async (e) => {
    e.preventDefault();
    await load(); 
    try {
      const user = { username, password };
      const response = await Axios.post('http://localhost:2222/api/auth/login', user);

      localStorage.setItem("token", JSON.stringify(response.data.accessToken));
      dispatch(setUsername(username));  
      navigate("/store");

    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 400)) {
        if (msgs.current) {
          msgs.current.show({ 
            severity: 'error', 
            detail: 'Sorry, we couldn\'t log you in. Please check your credentials and try again.',
            life: 10000 
          });
        }
      }
      setPassword("");
      setUserNameLocal("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <Messages ref={msgs} /> 
      <div className="login-header">
        <i className="pi pi-user login-icon"></i>
        <h2 className="login-title">Login</h2>
      </div>
      <form onSubmit={createUser} className="login-form">
        <div className="form-field">
          <FloatLabel>
            <InputText id="username" onChange={(e) => setUserNameLocal(e.target.value)} value={username} required />
            <label htmlFor="username">Username</label>
          </FloatLabel>
        </div>
        <div className="form-field">
          <FloatLabel>
            <InputText id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            <label htmlFor="password">Password</label>
          </FloatLabel>
        </div>
        <div className="form-actions">
          <Button type="submit" label="Log In" icon="pi pi-sign-in" loading={loading} />
        </div>
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ color: 'white' }}>
          Don't have an account yet? <Link to="/register" style={{ color: '#00BFFF', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
