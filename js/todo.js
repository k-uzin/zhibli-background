const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");
const toDoFinish = document.querySelector("#todo-finish");
let toDos = [];
let finishToDos = [];

toDoForm.addEventListener("submit", handleToDoSubmit);

function handleToDoSubmit (event) {
  event.preventDefault();
  const newToDo = toDoInput.value; //입력한 값은 변수에 저장하고
  // console.log(newToDo)
  toDoInput.value=""; //입력한 다음 엔터 누르면 input창은 비움.
  // console.log(newToDo, toDoInput.value);
  const newToDoObj = {
     text: newToDo,
     id: Date.now() //Date.now(): 1970년부터 경과된 ms(밀리 초)를 반환함.
  };
  paintToDo(newToDoObj);
  toDos.push(newToDoObj);
  saveToDos();
  // button.addEventListener("mouseenter", function(){
  //   button.innerText="❌";
  // });
  // button.addEventListener("mouseleave", function(){
  //   button.innerText="✖";
  // });
};

function paintToDo(newToDoObj) {
  const li =document.createElement("li");
  const span =document.createElement("span");
  const button = document.createElement("button");
  const checkButton = document.createElement("button");
  const lis = document.querySelectorAll("toDoList li")
  li.appendChild(checkButton);
  li.appendChild(span);
  li.appendChild(button);
  span.innerText=newToDoObj.text;
  li.id = newToDoObj.id;
  button.innerText="✖";
  checkButton.innerText="□";
  // button.addEventListener("click", deleteTodo);
  // checkButton.addEventListener("click", finishedTodo);
  toDoList.appendChild(li);
  button.addEventListener("click", deleteTodo);
  checkButton.addEventListener("click", finishedTodo);
};
function paintFinishToDo(finishObj) {
  const li =document.createElement("li");
  const span =document.createElement("span");
  const button = document.createElement("button");
  const checkButton = document.createElement("button");
  li.appendChild(checkButton);
  li.appendChild(span);
  li.appendChild(button);
  span.innerText=finishObj.text;
  li.id = finishObj.id;
  button.innerText="✖";
  checkButton.innerText="☑";
  toDoFinish.appendChild(li);
  // button.addEventListener("click", deleteFinishToDo);
  button.addEventListener("click", deleteFinishToDo);
  // checkButton.addEventListener("click", returnToDo);
  checkButton.addEventListener("click", returnToDo);
}

function deleteTodo(event) {
  const li = event.target.parentElement; //클릭된 요소의 부모요소
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id)); 
  //filter(): 배열에 있는 아이템을 하나씩 함수에 넣어서 false가 나온 아이템은 버리고,
  //true가 나온 아이템들만 가지고 배열을 '새로' 만듦.
  li.remove();
  saveToDos();
}; 
function deleteFinishToDo(event){
  const li = event.target.parentElement;
  finishToDos = finishToDos.filter(toDo => toDo.id !== parseInt(li.id));
  li.remove();
  saveToDos();
}

function finishedTodo(event) {
  const li = event.target.parentElement;
  const span = event.target.nextElementSibling;
  const checkButton = event.target;
  toDoFinish.appendChild(li);
  checkButton.innerText="☑";
  checkButton.addEventListener("click", returnToDo);
  const finishObj = {
    text: span.innerText,
    id: parseInt(li.id)
  };
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id)); 
  // finishToDos.push(li);
  
  finishToDos.push(finishObj);
  saveToDos();
}

function returnToDo(event){
  const li = event.target.parentElement;
  const span = event.target.nextElementSibling;
  const checkButton = event.target;
  toDoList.appendChild(li);
  checkButton.innerText="□";
  checkButton.addEventListener("click", finishedTodo);
  const returnObj = {
    text: span.innerText,
    id: parseInt(li.id)
  };
  toDos.push(returnObj);
  finishToDos = finishToDos.filter(todo => todo.id !== parseInt(li.id)) 
  saveToDos();
}

function saveToDos () {
  localStorage.setItem("toDos", JSON.stringify(toDos)); 
  //JSON.stringify: 객체데이터이든 배열데이터이든, 자바스크립트 코드를 '문자데이터'로 반환시켜줌.
  //localstorage에 배열데이터를 저장하면 [] 없이 문자모양으로 저장되므로, json.stringify()를 통해 '배열모양'의 '문자데이터'를 저장함.
  localStorage.setItem("finishToDos", JSON.stringify(finishToDos)); 
};

const savedToDos = localStorage.getItem("toDos");
const savedFinishToDos = localStorage.getItem("finishToDos");
if(savedToDos!==null || savedFinishToDos!==null){
  const parsedToDos = JSON.parse(savedToDos); //JSON.parse(): 문자데이터를 배열데이터로 변환시켜줌.
  const parsedFinishToDos = JSON.parse(savedFinishToDos); //JSON.parse(): 문자데이터를 배열데이터로 변환시켜줌.
  parsedToDos.forEach(paintToDo);
  //forEach(): 배열에 있는 아이템 각각에 대하여 함수를 실행시킴. 자바스크립트가 배열의 아이템을 하나씩 paintToDo함수의 인자로 넣어서 실행시킴. 
  parsedFinishToDos.forEach(paintFinishToDo);
  toDos = parsedToDos;
  finishToDos = parsedFinishToDos;
  //새로고침 후 toDos에 값을 저장할 때, 배열이 초기화 되고 빈 배열에 값을 저장하는 것이므로 
  //이전에 있던 값들은 지워진다. 따라서 toDos에 parsedToDos를 할당해주면 이전에 있던 값들은 그대로 있으면서 새로운 값을 추가해 줄 수 있다.
}
console.log