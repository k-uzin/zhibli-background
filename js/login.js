const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("input");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("#clock");
const h3 = document.querySelector("#date");
const h4 = document.querySelector("h4");
const toDo = document.querySelector("#todo");
const bgImg = document.querySelector("#bgImage");
const loginImg = document.querySelector("#loginImage");
const totoro = document.querySelector("#totoro");
const welcome = document.querySelector("#welcome");
const memo = document.querySelector("#memo");
const cat = document.querySelector("#cat");
const musicPlayer = document.querySelector("#music-player");

loginForm.addEventListener("submit",
  function(event){
    const userName = loginInput.value
    event.preventDefault()
    localStorage.setItem("userName", userName)
    printH(userName)
  }
);

const savedName = localStorage.getItem("userName");

if(savedName!==null){
  printH(savedName)
};

function printH (savedName) {
  loginForm.classList.add("hidden")
  h1.classList.remove("hidden")
  h1.innerText=`안녕하세요. ${savedName}:)`
  h2.classList.remove("hidden")
  h3.classList.remove("hidden")
  h4.classList.remove("hidden")
  toDo.classList.remove("hidden")
  bgImg.classList.remove("hidden")
  loginImg.classList.add("hidden")
  totoro.classList.add("hidden")
  welcome.classList.add("hidden")
  memo.classList.remove("hidden")
  cat.classList.remove("hidden")
  musicPlayer.classList.remove("hidden")
};

const loginImages = ["0.jpg","3.jpg","6.jpg","14.jpg","15.jpg","16.jpg","17.jpg"];
const randomTwo = Math.floor(Math.random() * loginImages.length);
const chosenLoginImage = loginImages[randomTwo]
loginImg.src = `loginImg/${chosenLoginImage}`
