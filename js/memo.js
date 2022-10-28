const memoAdd = document.querySelector("#memo span");
const memoList = document.querySelector("#memo #memo-list");
const liImage = ["memo1.jpg", "memo3.jpg", "memo4.jpg"]
let randomImg = Math.floor(Math.random() * liImage.length)
let memos = [];

memoAdd.addEventListener("click", createMemo);

function createMemo () {
  const li =document.createElement("li")
  const input = document.createElement("textarea");
  const deleteButton = document.createElement("button");
  const submitButton = document.createElement("button");
  deleteButton.innerText="✖";
  submitButton.innerText="저장";
  deleteButton.id="delete";
  submitButton.id="submit";
  input.spellcheck=false;
  input.placeholder="메모를 입력하세요."
  // const newMemoObj = {
  //   text: input.value,
  //   id: Date.now()
  // };
  // paintMemo(newMemoObj);
  li.style.backgroundImage=`linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.3)), url(./img/${liImage[randomImg]})`
  li.appendChild(deleteButton);
  li.appendChild(input);
  li.appendChild(submitButton);
  memoList.appendChild(li);
  deleteButton.addEventListener("click", deleteMemo)
  submitButton.addEventListener("click", submitMemo)
  randomImg = Math.floor(Math.random()*liImage.length)
};

function paintMemo(item) {
  const li =document.createElement("li")
  const input = document.createElement("textarea");
  const deleteButton = document.createElement("button");
  const submitButton = document.createElement("button");
  deleteButton.innerText="✖";
  submitButton.innerText="저장";
  deleteButton.id="delete";
  submitButton.id="submit";
  input.spellcheck=false;
  li.style.backgroundImage=`linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.3)), url(./img/${liImage[randomImg]})`
  li.appendChild(deleteButton);
  li.appendChild(input);
  li.appendChild(submitButton);
  memoList.appendChild(li);
  deleteButton.addEventListener("click", deleteMemo)
  submitButton.addEventListener("click", submitMemo)
  randomImg = Math.floor(Math.random()*liImage.length)
  input.innerText=item.text;
  li.id=item.id;
};

function submitMemo (event) {
  const li = event.target.parentElement;
  memos = memos.filter(memo => memo.id !== parseInt(li.id))
  const editMemoObj = {
    text: event.target.previousElementSibling.value,
    id: Date.now()
  }
  //textarea 엔터 
  li.id=editMemoObj.id;
  memos.push(editMemoObj);
  //.push는 배열의 마지막에 요소를 추가하는건데, html li 요소의 순서와 배열에 추가되는 요소의 순서를 똑같이 하려면 어떻게 해야되는지.
  saveMemos();
};

function deleteMemo(event) {
  const li = event.target.parentElement;
  memos = memos.filter(memo => memo.id !== parseInt(li.id))
  li.remove();
  saveMemos();
};

function saveMemos() {
  localStorage.setItem("memos", JSON.stringify(memos));
};

const savedMemos = localStorage.getItem("memos")
if(savedMemos !== null){
  const parsedMemos = JSON.parse(savedMemos)
  memos = parsedMemos;
  parsedMemos.forEach(paintMemo);
};

