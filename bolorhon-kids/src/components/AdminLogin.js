import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Жишээ админ нэвтрэх - бодит төслөөр backend-тэй холбох хэрэгтэй
    if (credentials.username === 'admin' && credentials.password === 'bolorhon2025') {
      setTimeout(() => {
        onLogin(true);
        setIsLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setError('Нэр эсвэл нууц үг буруу байна');
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h2>🔐 Админ нэвтрэх</h2>
          <p>Болорхон Kids - Удирдлагын систем</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>👤 Хэрэглэгчийн нэр</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Админ нэр оруулна уу"
              required
            />
          </div>
          
          <div className="form-group">
            <label>🔒 Нууц үг</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Нууц үг оруулна уу"
              required
            />
          </div>
          
          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Нэвтэрч байна...
              </>
            ) : (
              'Нэвтрэх'
            )}
          </button>
        </form>
        
        <div className="login-info">
          <p>💡 Demo нэвтрэх мэдээлэл:</p>
          <p>Нэр: <strong>admin</strong></p>
          <p>Нууц үг: <strong>bolorhon2025</strong></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;