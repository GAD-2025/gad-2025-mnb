document.addEventListener('DOMContentLoaded', () => {

    // --- Mock Data ---

    const healthData = {
        labels: ['수면', '몸무게', '걸음수', '수분', '칼로리'],
        scores: [85, 90, 70, 80, 75],
        colors: [
            { name: '분홍', value: 'rgba(255, 99, 132, 0.6)' },
            { name: '보라', value: 'rgba(153, 102, 255, 0.6)' },
            { name: '민트', value: 'rgba(75, 192, 192, 0.6)' },
            { name: '주황', value: 'rgba(255, 159, 64, 0.6)' },
            { name: '파랑', value: 'rgba(54, 162, 235, 0.6)' }
        ]
    };

    const popularHospitals = [
        { id: 1, name: '튼튼 동물병원', rating: 4.8, distance: '500m', vet: { name: '김수의사', img: 'https://i.pravatar.cc/60?img=11' }, review: '언제나 친절하게 진료해주셔서 마음이 놓여요. 우리 아이를 믿고 맡길 수 있는 곳!' },
        { id: 2, name: '멍냥 종합병원', rating: 4.9, distance: '1.2km', vet: { name: '박수의사', img: 'https://i.pravatar.cc/60?img=12' }, review: '최신 장비가 많아서 정밀 검사받기 좋았어요. 설명도 꼼꼼하게 해주십니다.' },
        { id: 3, name: '해피펫 클리닉', rating: 4.7, distance: '800m', vet: { name: '이수의사', img: 'https://i.pravatar.cc/60?img=13' }, review: '과잉 진료 없고, 합리적인 비용에 아이 상태를 잘 봐주셔서 만족합니다.' }
    ];

    const recentVisits = [
        { date: '2025년 10월 11일 (토) 11:00', hospital: '튼튼 동물병원', doctor: '김수의사', summary: '정기 검진 및 구충제 처방', cost: '55,000원' },
        { date: '2025년 9월 15일 (월) 15:30', hospital: '멍냥 종합병원', doctor: '박수의사', summary: '피부염 관련 진료', cost: '78,000원' },
    ];


    // --- 1. 건강 점수 레이더 차트 및 범례 생성 ---

    function createHealthChart() {
        const ctx = document.getElementById('healthRadarChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: healthData.labels,
                datasets: [{
                    label: '건강 점수',
                    data: healthData.scores,
                    backgroundColor: 'rgba(42, 104, 212, 0.2)',
                    borderColor: 'rgba(42, 104, 212, 1)',
                    pointBackgroundColor: 'rgba(42, 104, 212, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(42, 104, 212, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        pointLabels: {
                            font: { size: 12 }
                        },
                        ticks: { display: false }
                    }
                },
                plugins: {
                    legend: {
                        display: false // 기본 범례 숨기기
                    }
                }
            }
        });
    }

    function createChartLegend() {
        const legendContainer = document.querySelector('.chart-legend');
        const ul = document.createElement('ul');
        healthData.labels.forEach((label, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="legend-dot" style="background-color: ${healthData.colors[index].value};"></span>
                ${label}
            `;
            ul.appendChild(li);
        });
        legendContainer.appendChild(ul);
    }


    // --- 2. 인기 병원 카드 동적 생성 ---

    function renderHospitalCards() {
        const container = document.getElementById('hospital-list');
        if (!container) return;

        const cardsHtml = popularHospitals.map(hospital => `
            <div class="hospital-card">
                <div class="hospital-info">
                    <span class="name">${hospital.name}</span>
                    <div class="details">
                        <span class="star">★ ${hospital.rating}</span>
                        <span>·</span>
                        <span>${hospital.distance}</span>
                    </div>
                </div>
                <div class="vet-info">
                    <img src="${hospital.vet.img}" alt="${hospital.vet.name}">
                    <span>담당 수의사: ${hospital.vet.name}</span>
                </div>
                <p class="review">"${hospital.review}"</p>
                <button class="quick-booking-btn" data-hospital-id="${hospital.id}">빠른 예약</button>
            </div>
        `).join('');
        container.innerHTML = cardsHtml;
    }


    // --- 3. 최근 진료 내역 동적 생성 ---

    function renderRecentVisitCards() {
        const container = document.getElementById('visit-list');
        if (!container) return;

        const cardsHtml = recentVisits.map(visit => `
            <div class="visit-card">
                <div class="visit-info">
                    <span class="date">${visit.date}</span>
                    <span class="hospital">${visit.hospital} (${visit.doctor})</span>
                    <span class="summary">${visit.summary}</span>
                </div>
                <div class="visit-cost">${visit.cost}</div>
            </div>
        `).join('');
        container.innerHTML = cardsHtml;
    }


    // --- 4. 이벤트 핸들러 추가 ---

    function addEventListeners() {
        const bookingButtons = document.querySelectorAll('.quick-booking-btn');
        bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const hospitalId = e.target.dataset.hospitalId;
                const hospital = popularHospitals.find(h => h.id == hospitalId);
                alert(`${hospital.name}에 빠른 예약을 진행합니다.`);
                // 실제 구현 시, 예약 페이지로 이동하는 로직 추가
                // window.location.href = `/booking?hospitalId=${hospitalId}`;
            });
        });
    }


    // --- 초기화 실행 ---
    createHealthChart();
    createChartLegend();
    renderHospitalCards();
    renderRecentVisitCards();
    addEventListeners();
});
