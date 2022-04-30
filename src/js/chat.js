//use strict 를 통해서 자바스크립트의 오류를 최대한 줄인다
"use strict"

const socket = io();

//우리가 사용할 dom 선택하기
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

//엔터치면 전송되는 거
chatInput.addEventListener("keypress", (event)=>{
  //키코드값이 13 = 엔터
  if(event.keyCode === 13){
    send();
    
  }
  //헐 해결했다
  
});

function send(){
  const param = {
    name: nickname.value,
    msg: chatInput.value
  };
  chatInput.value="";
  //채팅을 강제로 보낸다 emit메서드 사용 (채널이름=채널아이디, 보낼 내용)
  //이렇게 하면 서버(app.js)에서 받을 수 있다.
  socket.emit("chatting", param);
}

//버튼을 눌렀을 때 실행되어야 하기때문에 button에 이벤트를 걸어준다
sendButton.addEventListener("click", send);


// 서버에서 보낸 내용이 여기에 담김
socket.on("chatting", (data)=>{
  // //소켓을 받았을 때  에 내용을 넣어주고 받기
  // const li = document.createElement("li");
  // //템플릿 문법
  // li.innerText = `${data.name}님이 - ${data.msg}`;

  // //이것을 input 해주기 - 
  // chatList.appendChild(li);

  //li모델을 인스턴스화 시켜주기
  const {name, msg, time} = data;
  const item = new LiModel(name, msg, time);
  item.makeLi()
  //얘의 스크롤 값을 읽어서 밑으로 작동되도록 하는 것
  displayContainer.scrollTo(0, displayContainer.scrollHeight)

});

function LiModel(name, msg, time){
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = ()=>{
    const li = document.createElement("li");
    li.classList.add(nickname.value=== this.name ? "sent" : "received")
    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
    <img src="https://item.kakaocdn.net/do/a1866850b14ae47d0a2fd61f409dfc057154249a3890514a43687a85e6b6cc82" alt="any">
  </span>
  <span class="message">${this.msg}</span>
  <span class="time">${this.time}</span>`  ;
  li.innerHTML = dom;
  chatList.appendChild(li);

  };
};