const express = require('express');
const http = require('http');
const app = express();
//node.js 의 기본 모듈 path 불러오기
//path 는 url을 쉽게 만들어주는 도구
const path = require('path');
const server = http.createServer(app);

const socketIO = require('socket.io');

//socketIO에서 서버를 담아가는 내용을 변수로 담음, 그리고 이 io 를 통해서 받은 메시지 등을 제어할 것임
const io = socketIO(server);

//시간을 사용하기 위해 모먼트 변수 사용
const moment = require("moment");


console.log(__dirname);
//path.join 을 사용하는 이유는 운영체제마다 경로(url)을 나타내는 /, \ 가 다르기 때문
app.use(express.static(path.join(__dirname, 'src')))
//서버를 실행하기 위해서는 port 가 필요.
//process 환경에 port가 지정이 되어 있으면 그것을 사용하고 아니라면 5000번 사용
const PORT = process.env.PORT || 5000;

// connection 이벤트가 발생하면 이 모든것을 socket에 담는다
// 데이터를 받는 부분
io.on("connection", (socket)=>{
  //서버에서 채팅을 받아주는 코드 작성: "채팅아이디", 콜백함수
  socket.on("chatting", (data)=>{
    //이 data는 프론트에서 넘겨받은 data
    const { name, msg } = data;

    io.emit("chatting", {
      //두 개는 이름이 같아서 생략이 가능하다
      name: name,
      msg: msg,
      time: moment().format("HH:mm")
    })
  });
});



// 서버 실행. (포트, 명령=콜백함수) , port 라는 변수를 사용하기 위해서 ₩사용 템플릿 문법으로
server.listen(PORT, ()=>console.log(`server is running ${PORT}`));