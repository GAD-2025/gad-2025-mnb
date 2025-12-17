import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = '이름(닉네임)을 입력해주세요';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (validateForm()) {
      try {
        await axios.post('/login', {
          username: formData.username,
          password: formData.password
        });
        navigate('/main');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            // User not found, redirect to signup page with a message
            navigate('/signup', { 
              state: { message: '가입되지 않은 사용자입니다. 먼저 회원가입을 진행해주세요.' } 
            });
          } else if (error.response.data && error.response.data.message) {
            // Other server errors (e.g., invalid credentials)
            setServerError(error.response.data.message);
          }
        } else {
          // Network or other unexpected errors
          setServerError('로그인 중 예기치 않은 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1 className="login-title">로그인</h1>
          <p className="login-subtitle">멍냥별에 다시 오신 것을 환영합니다</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {serverError && <div className="server-error-message">{serverError}</div>}
          <div className="form-group">
            <label htmlFor="username" className="form-label">이름 (닉네임)</label>
            <input
              type="text"
              id="username"
              name="username"
              className={`form-input ${errors.username && touched.username ? 'error' : ''}`}
              placeholder="사용하실 닉네임"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="forgot-password-container">
            <a href="/forgot-password" className="forgot-password-link">비밀번호를 잊으셨나요?</a>
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="signup-link-container">
          <span className="signup-text">계정이 없으신가요?</span>
          <button 
            onClick={() => navigate('/signup')} 
            className="signup-link"
            style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit'}}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
