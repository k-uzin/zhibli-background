const clock = document.querySelector("#clock");
const date = document.querySelector("#date");


function getClock(){
  const hours = String(new Date().getHours()).padStart(2, "0") //padStart는 string에만 쓸 수 있으므로 숫자를 문자로 바꿔줘야 함.
  const minutes = String(new Date().getMinutes()).padStart(2, "0")   //문자의 최소 길이는 2여야 하며, 2가 안된다면 "0"으로 시작하게 함.
  const seconds = String(new Date().getSeconds()).padStart(2, "0")
  clock.innerText=`${hours}:${minutes}:${seconds}`
};

getClock();
setInterval(getClock, 1000);

function getDate(){
  const newDate = new Date();
  const day = ['일','월','화','수','목','금','토'];
  date.innerText=`${newDate.getMonth()+1}월 ${newDate.getDate()}일 ${day[newDate.getDay()]}요일`
};
getDate();



