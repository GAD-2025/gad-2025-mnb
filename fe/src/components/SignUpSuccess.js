import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SignUpSuccess.css';

function SignUpSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || '';

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-badge" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 7.5C7.32843 7.5 8 6.82843 8 6C8 5.17157 7.32843 4.5 6.5 4.5C5.67157 4.5 5 5.17157 5 6C5 6.82843 5.67157 7.5 6.5 7.5Z" fill="#FFFFFF"/>
            <path d="M10.5 5.5C11.3284 5.5 12 4.82843 12 4C12 3.17157 11.3284 2.5 10.5 2.5C9.67157 2.5 9 3.17157 9 4C9 4.82843 9.67157 5.5 10.5 5.5Z" fill="#FFFFFF"/>
            <path d="M15.5 7.5C16.3284 7.5 17 6.82843 17 6C17 5.17157 16.3284 4.5 15.5 4.5C14.6716 4.5 14 5.17157 14 6C14 6.82843 14.6716 7.5 15.5 7.5Z" fill="#FFFFFF"/>
            <path d="M7 12.5C7 10.8431 8.34315 9.5 10 9.5H14C15.6569 9.5 17 10.8431 17 12.5C17 14.1569 15.6569 15.5 14 15.5H10C8.34315 15.5 7 14.1569 7 12.5Z" fill="#FFFFFF"/>
            <path d="M4 13C3.44772 13 3 13.4477 3 14C3 16 4.79 18.5 7 18.5C9.21 18.5 11 16 11 14C11 13.4477 10.5523 13 10 13H4Z" fill="#FFFFFF"/>
            <path d="M17 13C16.4477 13 16 13.4477 16 14C16 16 17.79 18.5 20 18.5C22.21 18.5 24 16 24 14C24 13.4477 23.5523 13 23 13H17Z" fill="#FFFFFF"/>
          </svg>
        </div>

        <h2 className="success-title">회원가입이 완료되었어요!</h2>
        {username && <p className="success-sub">환영합니다, <strong>{username}</strong>님</p>}

        <button
          className="success-login-button"
          onClick={() => navigate('/login')}
        >
          로그인 하기
        </button>
      </div>
    </div>
  );
}

export default SignUpSuccess;