const audio = new Audio("zhibli_jazz.mp3");
audio.autoplay="true";
audio.loop="true";

const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
pause.addEventListener("click", function(){
  play.classList.remove("hidden");
  pause.classList.add("hidden");
})
play.addEventListener("click", function(){
  pause.classList.remove("hidden");
  play.classList.add("hidden");
})

