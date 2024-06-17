let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("#subhead");
let h3 = document.querySelector("#score");
let highScr = 0;

document.addEventListener('keypress', function(){
    if(started == false){
    console.log("Game started");
    started = true;

    levelUp();
    };
});

// touch screen
document.addEventListener('touchstart', function(){
    if(started == false){
    console.log("Game started");
    started = true;

    levelUp();
    };
});

function levelUp(){
    userSeq = []; 
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose 
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    // console.log(gameSeq); // uncomment to get game hint in console
    highestScore();
    gameFlash(randBtn);
};

// btn flash by game after levelup
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
    btn.classList.remove("flash");
    }, 300);
};

// btn flash by user after click
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
    btn.classList.remove("userflash");
    }, 300);
};

// game logic
function checkAns(idx){
    
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else if(started == true){ // if was additional
        h2.innerHTML = `Game Over ! Your score was <b>${level-1}</b> <br>Press any key to start`;
        h3.innerHTML = `Highest Score :-  ${highScr-1}`;
        document.querySelector("body").style.background = "rgb(209,38,83)";
        
        setTimeout(function(){
            document.querySelector("body").style.background = "rgb(238,174,202)";
            document.querySelector("body").style.background = "linear-gradient(255deg, rgba(238,174,202,1) 33%, rgba(148,187,233,1) 100%)";

        },400);
        
        reset();
    };
};

function btnPress(){
    // console.log("btn was pressed");
    let btn = this;
    userFlash(btn);
    
    let userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
};

// btns evt Listner
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
};

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
};

function highestScore(){
    let currScr = level;
    if(currScr > highScr){
        highScr = currScr;
    };
};


// h2 heading change in mobile view
const mediaQuery = window.matchMedia('(max-width: 750px)');

// Define a function to handle the change
function handleMediaQueryChange(event) {
  if (event.matches) {
    // If the screen width is 750px or less
    h2.innerHTML = `Touch Anywhere to start`;
  } 
}

mediaQuery.addListener(handleMediaQueryChange);

handleMediaQueryChange(mediaQuery);