import React, { useState } from 'react';
import '../styles/QuickReservationModal.css';

const QuickReservationModal = ({ isOpen, onClose, hospitalName }) => {
  const [isReserved, setIsReserved] = useState(false);

  const handleConfirm = () => {
    // Here you would typically handle the reservation logic (e.g., API call)
    setIsReserved(true);
  };

  const handleClose = () => {
    setIsReserved(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!isReserved ? (
          <>
            <h2>빠른 예약</h2>
            <div className="form-group">
              <label htmlFor="tofu">두부</label>
              <input type="text" id="tofu" />
            </div>
            <div className="form-group">
              <label htmlFor="hospitalName">병원 이름</label>
              <input type="text" id="hospitalName" defaultValue={hospitalName} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="reservationTime">예약 날짜 및 시간</label>
              <input type="datetime-local" id="reservationTime" />
            </div>
            <div className="form-group">
              <label htmlFor="memo">간단 메모 (병원 전달용)</label>
              <textarea id="memo" rows="3"></textarea>
            </div>
            <div className="modal-buttons">
              <button onClick={handleConfirm} className="confirm-btn">예약 확정</button>
              <button onClick={handleClose} className="cancel-btn">취소</button>
            </div>
          </>
        ) : (
          <div className="reservation-success">
            <div className="checkmark-icon">✓</div>
            <p>Your reservation has been completed!</p>
            <button onClick={handleClose} className="confirm-btn">확인</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickReservationModal;
