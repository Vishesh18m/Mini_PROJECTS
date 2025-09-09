let computerSteps = [] ;
let userSteps = [] ;
let winLines = ["","I","II","III","IV","V","VI","VII","VIII"];
let totalSteps = 0;
let turn = "user";
let winnerline ;
let body = document.querySelector("body");
let allbtn = document.querySelectorAll(".btn");
let restartBtn = document.querySelector(".restart");

function activeBtn(){
    // to make all box clickable

    console.log("active calledddddd");
    for(btn of allbtn){
        btn.addEventListener("click",userTurn);
    }
    allbtn.forEach(btn => btn.addEventListener("click",userTurn));
}
activeBtn();

function userTurn(){
    // when user click a box

    // access which box is clicked 
    let btnId = this.getAttribute("id");
    let btnCode = btnId.charCodeAt(0);
    
    // if box is empty then add user sign
    if(!computerSteps.includes(btnCode) && !userSteps.includes(btnCode)){
        userSteps.push(btnCode);
        totalSteps++;
        
        // displaying User's sign in board
        let O = document.querySelector(`#${btnId}`);
        O.children[0].innerText = "O";
        O.classList.add("user");
        
        // checking if user win the match or not 
        let winDetail = checkWin(userSteps);
        if(winDetail[0]){
            winnerline = document.querySelector(`#${winLines[winDetail[1]]}`)
            winnerline.classList.remove("hide");
            userIsWinner();
        }
        else{
            turn="computer";
            computerTurn();
        }
    }
}

function randomeMove(){
    // base case to protect infinite loop after last move 
    if(totalSteps==9){
        return matchDraw();
    }
    let move = Math.floor(Math.random()*9 + 97);
    let arr = [String.fromCharCode(move),move];

    if(!computerSteps.includes(arr[1]) && !userSteps.includes(arr[1])){
        return arr;
    }
    return randomeMove();
}

function computerTurn(){
    try{
        let move = smartMove();
    
        computerSteps.push(move[1]);
        totalSteps++;

        // displaying Computer's sign in board
        let btn = document.querySelector(`#${move[0]}`);
        btn.children[0].innerText = "X" ;
        btn.classList.add("computer");

        // checking if computer win the match or not 
        let winDetail = checkWin(computerSteps);
        if(winDetail[0]){
            winnerline = document.querySelector(`#${winLines[winDetail[1]]}`)
            winnerline.classList.remove("hide");
            computerIsWinner();
        }
        else{
            turn="user";
        }
    }
    catch(err){
        console.log("Error :" ,err);
        
    }

}

function smartMove(){
    // give smart move to win or defence 
    let Move = giveSmartMove(computerSteps);
    
    if(Move == false){
        let newMove = giveSmartMove(userSteps);
        if(newMove==false){
            return randomeMove();
        }
        else{
            return newMove;
        }
    }
    return Move;
}

function placeAvailable(num){
    // check if the box choosen by user or computer is empty or not 
    let flag = true;

    if(computerSteps.includes(num) || userSteps.includes(num)){
        flag = false;
    }
    
    return flag;
}

function giveSmartMove(forWin){
    // VERTICAL WINS 
    for (let i = 97; i < 100; i++) {
        if(forWin.includes(i) && forWin.includes(i+3) && placeAvailable(i+6) ){
            return [String.fromCharCode(i+6),i+6]
        }

        else if(forWin.includes(i) && forWin.includes(i+6) && placeAvailable(i+3) ){
            return [String.fromCharCode(i+3),i+3]
        }

        else if(forWin.includes(i+3) && forWin.includes(i+6) && placeAvailable(i) ){
            return [String.fromCharCode(i),i]
        }
    }

    // HORIZONTAL WINS
    for (let i = 97; i < 104; i=i+3) {
        if(forWin.includes(i) && forWin.includes(i+1) && placeAvailable(i+2) ){
            return [String.fromCharCode(i+2),i+2]
        }

        else if(forWin.includes(i) && forWin.includes(i+2) && placeAvailable(i+1) ){
            return [String.fromCharCode(i+1),i+1]
        }

        else if(forWin.includes(i+1) && forWin.includes(i+2) && placeAvailable(i) ){
            return [String.fromCharCode(i),i]
        }
    }

    // Diagonal WINS
    
    if(forWin.includes(97) && forWin.includes(97+4) && placeAvailable(105) ){
        return [String.fromCharCode(97+8),97+8]
    }

    else if(forWin.includes(97) && forWin.includes(97+8) && placeAvailable(101) ){
        return [String.fromCharCode(97+4),97+4]
    }

    else if(forWin.includes(97+4) && forWin.includes(97+8) && placeAvailable(97) ){
        return [String.fromCharCode(97),97]
    }

    else if(forWin.includes(99) && forWin.includes(101) && placeAvailable(103) ){
        return [String.fromCharCode(103),103]
    }

    else if(forWin.includes(99) && forWin.includes(103) && placeAvailable(101) ){
        return [String.fromCharCode(101),101]
    }

    else if(forWin.includes(101) && forWin.includes(103) && placeAvailable(99) ){
        return [String.fromCharCode(99),99]
    }

    return false; 
}

function userIsWinner(){
    // when user win the match 
    disableBoard();
    body.classList.add("userWinBody")
    
    restartBtn.classList.add("restartUser");
    restartBtn.classList.remove("hide");

}

function computerIsWinner(){
    //when computer win the match
    body.classList.add("computerWinBody")
    disableBoard();
    restartBtn.classList.add("restartComputer");
    restartBtn.classList.remove("hide");
}

function checkWin(forWin){
    // Vertical column
    for (let i = 97 ; i < 100; i++) {
        if(forWin.includes(i) && forWin.includes(i+3) && forWin.includes(i+6)  ){
            return [true,i-93] ;
        }
    }
    // Horizontal row
    for (let i=97 ,j=0 ; i < 104; i=i+3 ,j=j+2){
        if(forWin.includes(i) && forWin.includes(i+1) && forWin.includes(i+2)  ){
            return [true,i-96-j];
        }
    }
    // diagonal
    if(forWin.includes(97) && forWin.includes(101) && forWin.includes(105)  ){
        return [true,8];
    }
    if(forWin.includes(99) && forWin.includes(101) && forWin.includes(103)  ){
        return [true,7];
    }

    return [false];
}

function matchDraw(){
    //if match draw 
    disableBoard();
    body.classList.add("matchDrawBody")

    restartBtn.classList.add("restartDraw");
    restartBtn.classList.remove("hide");
}

function disableBoard() {
    // disable all buttons if anyone wins
    allbtn.forEach(btn => btn.replaceWith(btn.cloneNode(true)));
}

restartBtn.addEventListener("click",restartGame);

function restartGame() {
    // reset data
    computerSteps = [];
    userSteps = [];
    totalSteps = 0;
    turn = "user";

    winnerline.classList.add("hide");
    // reset all buttons
    let allUsedBtn = document.querySelectorAll("h2");
    for (const btn of allUsedBtn) {
        btn.innerText="";
    }

    //reset body background
    document.body.classList.remove("userWinBody", "computerWinBody","matchDrawBody");

    //making all boxes clickable 
    allbtn = document.querySelectorAll(".btn");
    allbtn.forEach(btn => {
        btn.addEventListener("click", userTurn);
        btn.classList.remove("user","computer")
    });

    //again hide the reset button
    restartBtn.classList.add("hide");
    restartBtn.classList.remove("restartUser","restartComputer","restartDraw")
}


