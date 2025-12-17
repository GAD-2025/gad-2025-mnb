import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass, faHouseChimney, faBriefcaseMedical, faClipboardList, faComments, faPaw } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import '../styles/Main.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function Main() {
    const healthData = {
        labels: ['수면', '몸무게', '걸음수', '수분', '칼로리'],
        datasets: [
            {
                label: '건강 점수',
                data: [85, 90, 70, 80, 75],
                backgroundColor: 'rgba(42, 104, 212, 0.2)',
                borderColor: 'rgba(42, 104, 212, 1)',
                pointBackgroundColor: 'rgba(42, 104, 212, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(42, 104, 212, 1)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { display: true },
                suggestedMin: 0,
                suggestedMax: 100,
                pointLabels: {
                    font: { size: 12 },
                },
                ticks: { display: false },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    
    const legendColors = [
        { name: '분홍', value: 'rgba(255, 99, 132, 0.6)' },
        { name: '보라', value: 'rgba(153, 102, 255, 0.6)' },
        { name: '민트', value: 'rgba(75, 192, 192, 0.6)' },
        { name: '주황', value: 'rgba(255, 159, 64, 0.6)' },
        { name: '파랑', value: 'rgba(54, 162, 235, 0.6)' },
    ];
    
    const popularHospitals = [
        { id: 1, name: '튼튼 동물병원', rating: 4.8, distance: '500m', vet: { name: '김수의사', img: 'https://i.pravatar.cc/60?img=11' }, review: '언제나 친절하게 진료해주셔서 마음이 놓여요. 우리 아이를 믿고 맡길 수 있는 곳!' },
        { id: 2, name: '멍냥 종합병원', rating: 4.9, distance: '1.2km', vet: { name: '박수의사', img: 'https://i.pravatar.cc/60?img=12' }, review: '최신 장비가 많아서 정밀 검사받기 좋았어요. 설명도 꼼꼼하게 해주십니다.' },
        { id: 3, name: '해피펫 클리닉', rating: 4.7, distance: '800m', vet: { name: '이수의사', img: 'https://i.pravatar.cc/60?img=13' }, review: '과잉 진료 없고, 합리적인 비용에 아이 상태를 잘 봐주셔서 만족합니다.' }
    ];

    const recentVisits = [
        { date: '2025년 10월 11일 (토) 11:00', hospital: '튼튼 동물병원', doctor: '김수의사', summary: '정기 검진 및 구충제 처방', cost: '55,000원' },
        { date: '2025년 9월 15일 (월) 15:30', hospital: '멍냥 종합병원', doctor: '박수의사', summary: '피부염 관련 진료', cost: '78,000원' },
    ];
    
    const handleQuickBooking = (hospitalName) => {
        alert(`${hospitalName}에 빠른 예약을 진행합니다.`);
    };

  return (
    <div>
        <div className="container">
            <header className="location-header">
                <FontAwesomeIcon icon={faLocationDot} className="icon" />
                <span>서울 강남구</span>
            </header>

            <div className="search-bar">
                <input type="text" placeholder="병원 이름, 지역, 진료과목 검색" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
            </div>

            <section className="notification-card">
                <img src="https://source.unsplash.com/random/80x80/?cute,puppy" alt="반려견 프로필" className="pet-profile-img" />
                <div className="notification-text">
                    <p>두부 예방접종 3차 예정이에요!</p>
                    <p className="highlight">다음 접종일 : 11월 15일</p>
                </div>
            </section>

            <section className="health-score">
                <h2>오늘의 건강 점수</h2>
                <div className="chart-container">
                    <div style={{ maxWidth: '200px', maxHeight: '200px' }}>
                        <Radar data={healthData} options={chartOptions} />
                    </div>
                    <div className="chart-legend">
                        <ul>
                            {healthData.labels.map((label, index) => (
                                <li key={index}>
                                    <span className="legend-dot" style={{ backgroundColor: legendColors[index].value }}></span>
                                    {label}: <span className="legend-score">{healthData.datasets[0].data[index]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="popular-hospitals">
                <h2>인기 병원 TOP 10</h2>
                <div className="hospital-list-container">
                    {popularHospitals.map(hospital => (
                        <div className="hospital-card" key={hospital.id}>
                            <div className="hospital-info">
                                <span className="name">{hospital.name}</span>
                                <div className="details">
                                    <span className="star">★ {hospital.rating}</span>
                                    <span>·</span>
                                    <span>{hospital.distance}</span>
                                </div>
                            </div>
                            <div className="vet-info">
                                <img src={hospital.vet.img} alt={hospital.vet.name} />
                                <span>담당 수의사: {hospital.vet.name}</span>
                            </div>
                            <p className="review">"{hospital.review}"</p>
                            <button className="quick-booking-btn" onClick={() => handleQuickBooking(hospital.name)}>빠른 예약</button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="recent-visits">
                <h2>최근 진료 내역</h2>
                <div className="visit-list-container">
                    {recentVisits.map((visit, index) => (
                        <div className="visit-card" key={index}>
                            <div className="visit-info">
                                <span className="date">{visit.date}</span>
                                <span className="hospital">{visit.hospital}</span>
                                <span className="doctor">{visit.doctor} 선생님</span>
                                <span className="summary">{visit.summary}</span>
                            </div>
                            <div className="visit-cost">{visit.cost}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>

        <nav className="bottom-nav">
            <a href="#" className="nav-item active">
                <FontAwesomeIcon icon={faHouseChimney} className="icon" />
                <span>홈</span>
            </a>
            <a href="#" className="nav-item">
                <FontAwesomeIcon icon={faBriefcaseMedical} className="icon" />
                <span>응급&병원</span>
            </a>
            <a href="#" className="nav-item">
                <FontAwesomeIcon icon={faClipboardList} className="icon" />
                <span>건강수첩</span>
            </a>
            <a href="#" className="nav-item">
                <FontAwesomeIcon icon={faComments} className="icon" />
                <span>Q&A</span>
            </a>
            <a href="#" className="nav-item">
                <FontAwesomeIcon icon={faPaw} className="icon" />
                <span>MY</span>
            </a>
        </nav>
    </div>
  );
}

export default Main;
