import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password' || name === 'confirmPassword') {
      const newPassword = name === 'password' ? value : formData.password;
      const newConfirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordMatch(newPassword === newConfirmPassword || newConfirmPassword === '');
    }
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
    } else if (formData.username.length < 2) {
      newErrors.username = '닉네임은 최소 2자 이상입니다';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '유효한 이메일을 입력해주세요';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상입니다';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (validateForm()) {
      try {
        await axios.post('http://localhost:3001/signup', {
          username: formData.username,
          password: formData.password
        });
        navigate('/signup/success', { state: { username: formData.username } });
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setServerError(error.response.data.message);
        } else {
          setServerError('An unexpected error occurred.');
        }
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-header">
          <h1 className="signup-title">회원가입</h1>
          <p className="signup-subtitle">멍냥별에 오신 것을 환영합니다</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
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
            <label htmlFor="email" className="form-label">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
              placeholder="example@domain.com"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
              placeholder="최소 6자"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-input ${
                !passwordMatch && formData.confirmPassword ? 'error' : ''
              } ${
                passwordMatch && formData.confirmPassword && formData.password === formData.confirmPassword ? 'success' : ''
              }`}
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {!passwordMatch && formData.confirmPassword && (
              <span className="error-message">비밀번호가 일치하지 않습니다</span>
            )}
            {passwordMatch && formData.confirmPassword && formData.password === formData.confirmPassword && (
              <span className="success-message">비밀번호가 일치합니다</span>
            )}
            {errors.confirmPassword && touched.confirmPassword && !passwordMatch && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="signup-button">
            회원가입
          </button>
        </form>

        <div className="login-link-container">
          <span className="login-text">이미 계정이 있으신가요?</span>
          <button 
            onClick={() => navigate('/login')} 
            className="login-link"
            style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit'}}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;