let gameSeq = [];
let userSeq = [];
let colours = ["red","yellow","blue","green"];
let highScore = 0 ;

let start = false;
let level = 0;
let score = 0;

let curridx = -1;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector(".highscore");


function starter(){
    if( start == false){
        score = 0;
        start = true;
        h2.style.color = "black";
        let body = document.querySelector(".body");
        body.style.background = "linear-gradient(to bottom, rgba(151, 151, 151, 1), black)";
        levelup();
    }
} 

function levelup(){
    level++;
    score++;
    highScore = Math.max(score,highScore);
    highScoreDisplay.innerText = `Highest Score : ${highScore}`;
    userSeq = [];
    curridx = -1 ;
    h2.innerText = `Level ${level}`;

    let randome_col = colours[Math.floor(Math.random() * 3)];
    let randBtn = document.querySelector(`.${randome_col}`);

    gameSeq.push(randome_col);
    gameflashBtn(randBtn);
    console.log("game" ,gameSeq);
    
}


function matchSeq(){
    curridx++;
    if(userSeq[level-1]==gameSeq[level-1]){
        if(userSeq.length == gameSeq.length){
            levelup();
        }
    }
    else if(userSeq[curridx]!=gameSeq[curridx]){
        restart();
    }
    
}

function gameflashBtn(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash") 
    }
    , 600)
}

function restart(){

    h2.innerText="Game Over! press any key to start again";
    h2.style.color = "darkred" ;
    setTimeout(function(){
        h2.innerText = `Your Score is ${score} \n Press any key of Keyboard to start again`;
        h2.style.color = "lightgreen";
        userSeq = [];
        gameSeq = [];
        level = 0;
        start = false;
    } , 5000)

    let body = document.querySelector(".body");
    body.style.background = "linear-gradient(to bottom, rgba(255, 99, 99, 1), black)";

    let rightbtn = document.querySelector(`.${gameSeq[curridx]}`);
    rightbtn.classList.add("rightbtn");
    setTimeout(function(){
        rightbtn.classList.remove("rightbtn");
    },3000);

}

function userflashBtn(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash") 
    }
    , 100)
    console.log("game" ,gameSeq);
    matchSeq();
}

function btnpress(){
    if (start==true){
        let btn = this;
        let userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        setTimeout(userflashBtn(btn),1000);
    }  
}


let allbtn = document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click",btnpress);
}
document.addEventListener("click", starter);
