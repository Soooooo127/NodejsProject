const axios = require('axios');   //api http 형태로 가져올 목적
const express = require('express');  //서버 생성 및 연결
const app = express();
const port = 8080;   //사용할 포트 번호
const path = require('path');  //파일 경로 결합을 위한 모듈


const apiKey = 'api 키';
const apiUrl = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=종로구&dataTerm=month&pageNo=1&numOfRows=100&returnType=json&serviceKey=${apiKey}&ver=1.1`;

async function getData() {   // Open API에서 데이터 가져올 함수 
  try {
    //api로부터 json형식 데이터 가져오기
    const response = await axios.get(apiUrl);   
    return response.data.response.body.items;  // 필요한 데이터만 반환

  } catch (error) {
    console.error('>>>>에러 발생', error);
    return null;
  }
}



//클라이언트 특정 요청을 받아 데이터 처리하고 결과를 json형식으로 응답 
// api 요청을 처리하는 동적 경로, 서버에서 데이터 반환하는 기능을 하는 메서드
app.get('/data', async (request, response) => {
    const data = await getData();

    if(data.length === 0){
        console.error('데이터가 없습니다');
    }
    response.json(data); //클라이언트에게 데이터를 json 형식으로 변환해서 응답
});


    // connot GET / 에러 발생  -> 서버가 GET / 요청에 대해 처리 하지않아 발생하는 에러 express 서버에서 / 경로 처리를 추가하지 않아서 발생 
    //기본 루트('/')에 대한 라우터 추가

    //클라이언트가 요청하는 메서드, 정적파일을 서버에서 클라이언트에게 전달하는 역할
    app.get('/', (request,response) => {

        response.sendFile(path.join(__dirname, 'public','index.html')); //특정 경로에 대해 요청을 index.html 파일로 제공
    });

    //public 폴더를 정적파일로 처리하는 미들웨어 설정하는 메서드
    app.use(express.static(path.join(__dirname,'public')));

    //서버 통신 시작 메서드
    app.listen(port, () => {
        console.log(`server is running at http://localhost:${port}`);
        
    });


