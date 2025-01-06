document.addEventListener('DOMContentLoaded', async () => {
    try {
        //서버로 http 요청 보내는 메서드
        const response = await fetch('/data');  // '/data' API에서 데이터를 가져와 받은 응답 결과를 response 저장
        
        if (!response.ok) {  // 응답코드가 200이면 true로 설정
            throw new Error('API 요청 실패');
        }

        const data = await response.json();  // 응답받은 데이터는 json형식이 아니므로 js객체(JSON)로 파싱해야 함
        console.log('받은 데이터 확인',data); // 확인
        
        // 데이터가 없으면 오류 메시지 출력
        if (data.length === 0) {
            chart.innerHTML = "<h2>데이터가 없습니다.</h2>";
        } else {

            // Chart.js 그래프 그리기
            const chart = document.getElementById('chart').getContext('2d');
            new Chart(chart, {  //차트 객체 생성
                type: 'line',  // 라인 차트
                data: {
                    labels: data.map(item => item.dataTime).reverse(),  // x축 데이터 (시간) reverse() 사용하여 날짜 역순으로
                    datasets: [{  
                        label: 'PM10 값',  //범례와 데이터 세트의 레이블
                        data: data.map(item => item.pm10Value),  // y축 데이터 (PM10 값)
                        borderColor: '#36A2EB',
                        backgroundColor: '#9BD0F5',
                        tension: 0,  // 라인 곡선 조정
                    },
                    {
                        label: 'PM25 값',
                        data: data.map(item => item.pm25Value),  // y2축 데이터 (PM10 값)
                        borderColor: '#FF6384',
                        backgroundColor: '#FFB1C1',
                        tension: 0 , // 라인 곡선 조정
                        yAxisID: 'y_sub',
                    }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {  // 차트 렌더링 시 추가적인 기능을 활성화 하거나 설정하는 옵션
                        legend: {   //범례 스타일링
                            display: true, // 범례표시 여부
                            position: 'top',   //범례 위치
                        },
                        tooltip: {  // 마우스 올렸을 때 상세정보 보여줌
                            mode: 'index',
                            intersect: false,
                        },
                    },
                    scales: {  // x축과 y축에 대한 설정
                        x: {
                            title: {
                                display: true,
                                text: '시간'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'PM10 값'
                            },
                            beginAtZero: true
                        },
                        y_sub:{
                            position: 'right',  
                            title: {
                                display: true,
                                text: 'pm25 값'
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
    }
});
