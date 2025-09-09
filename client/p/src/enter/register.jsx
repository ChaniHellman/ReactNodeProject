import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast'; 
import "../css.css";
import 'primeicons/primeicons.css';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = React.useRef(null); 

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios.post("http://localhost:2222/api/auth/register", { username, name, phone, email, password });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Username already taken', life: 3000 });
      } 
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setPhone(numericValue);
  };

  return (
    <div className="register-container">
      <Toast ref={toast} /> 
      <div className="register-header">
        <i className="pi pi-user" style={{ fontSize: '2rem', marginRight: '0.5rem' }}></i>
        <h1>Register</h1>
      </div>
      <form onSubmit={handleRegisterSubmit} className="register-form">
        <div className="form-field">
          <FloatLabel>
            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <label htmlFor="username">Username</label>
          </FloatLabel>
        </div>
        <div className="form-field">
          <FloatLabel>
            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <label htmlFor="name">Name</label>
          </FloatLabel>
        </div>
        <div className="form-field">
          <FloatLabel>
            <InputText 
              id="phone" 
              value={phone} 
              onChange={handlePhoneChange} 
              required 
              type="tel"
            />
            <label htmlFor="phone">Phone</label>
          </FloatLabel>
        </div>
        <div className="form-field">
          <FloatLabel>
            <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="email">Email</label>
          </FloatLabel>
        </div>
        <div className="form-field">
          <Password 
            placeholder='password'
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            toggleMask 
            feedback={true} 
            required
          />
        </div>
        <div className="form-actions">
          <Button type="submit" label="Register" icon="pi pi-check" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Register;
