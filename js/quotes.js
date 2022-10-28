const quotes=[
  { famousLine: '"난 계속 도망쳐왔어. 하지만 이제 지켜야 할 것이 생겼어. 바로 너야."', //2
    movie: "<하울의 움직이는 성>"
  },
  { famousLine: '"치히로 좋은 이름이야. 네 이름을 소중히 해야 한다."', //3
    movie: "<센과 치히로의 행방불명>"
  },
  { famousLine: '"겁먹지 마, 난 그대의 편이야"', //4
    movie: "<센과 치히로의 행방불명>"  
  },
  { famousLine: '"포뇨가 인어 포뇨든 사람 포뇨든 상관없어요. 난 어떤 포뇨든 다 좋아!"', //1
    movie: "<벼랑 위의 포뇨>"
  },
  { famousLine: '"늙어서 좋은 건 울 일이 적다는 거지."',//9
    movie: "<하울의 움직이는 성>"
  },
  { famousLine: '"너무 겉모양에만 신경 쓰지 마. 중요한 건 마음가짐이야."', //7
    movie: "<마녀 배달부 키키>"
  },
  { famousLine: '"너는 너 자신이 되어야 해"', //8
    movie: "<고양이의 보은>"
  },
  { famousLine: '"그래. 간단한 일이었어. 나도 하면 되는 거야."', //5
    movie: "<귀를 기울이면>"
  },
  { famousLine: '"꿈이었지만 꿈이 아니었어!"', //0
    movie: "<이웃집 토토로>"
  },
  { famousLine: '"한 번 만난 인연은 잊혀지는 것이 아니라 잊고 있을 뿐이야"', //6
    movie: "<센과 치히로의 행방불명>"
  },
];

const images = ["2.jpg","3.jpg","4.jpg","1.jpg","9.jpg","7.jpg","8.jpg","IMG_7927.jpg","0.jpg","6.jpg",];

const quote = document.querySelector("#quote");
const movie = document.querySelector("#movie");
const random = Math.floor(Math.random() * quotes.length);
const chosenImage = images[random];

quote.innerText= quotes[random].famousLine;
movie.innerText= quotes[random].movie;

const bgImage = document.querySelector("#bgImage"); //가상의 요소 만듦
bgImage.src = `img/${chosenImage}`;
bgImage.alt = "error";
// document.body.appendChild(bgImage); //문서의 맨 뒤에 요소를 추가
// bgImage.classList.add("hidden")

console.log(random)
console.log(random)
console.log(chosenImage)

