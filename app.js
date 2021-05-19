//Declare variables 
//DOM Elements
var cells = document.querySelectorAll('.cell-div');
var playerTurnSection = document.querySelector('.players-turn-section');
var gameOverDiv = document.querySelector('.game-over-div');
var winnerDiv = document.querySelector('.winner-div');
var resetBtn = document.querySelector('.reset-btn');

//General Elements
// 1 = player 1, 2 = player 2
var playerID = 1;
var xCounter = 0;
var oCounter = 0;
var winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
]

//Functions 
function handleClick(e){
    var cell = e.target;

    if (playerID === 1){
        cell.textContent = 'X'
    } else {
        cell.textContent = 'O'
    }

    announceWinner()
    changePlayer();
}

function changePlayer(){
    if (playerID === 1){
        playerTurnSection.textContent = `O turn`;
       return playerID = 2;
    } else {
        playerTurnSection.textContent = `X turn`;
        return playerID = 1;
    }

}

function checkforWinner(){
    for(var j=0; j<winningCombos.length; j++){
        for (var i=winningCombos[j][0]; i<=winningCombos[j][2]; i+=winningCombos[j][1]-winningCombos[j][0]){
            if (cells[i].textContent === 'X'){
                xCounter ++
                if (xCounter === 3){
                    return 'X';
                }
            } else if (cells[i].textContent === 'O'){
                oCounter ++
                if (oCounter === 3){
                    return 'O';
                }
            }
        }
        xCounter = 0
        oCounter = 0
    }

    return false;
}

function checkIfTie() {
    for (let i = 0; i < cells.length; i++) {
        if(cells[i].textContent === ''){
            return false;
        }
    }

    return true;
}

function announceWinner(){

    var winner = checkforWinner();

    if(winner === 'X'){
        console.log("X wins");
        gameOverDiv.style.display = 'flex';
        winnerDiv.textContent = `X Wins`
        return
    } else if(winner === 'O'){
        console.log("O wins");
        gameOverDiv.style.display = 'flex';
        winnerDiv.innerHTML = '<span class="bubble-font">O</span> WINS'
        return
    } else if (checkIfTie()){
        console.log("It's a tie");
        gameOverDiv.style.display = 'flex';
        winnerDiv.textContent = `It's a tie`
        return
    }
}

function handleReset(){
    xCounter = 0;
    oCounter = 0;
    for(var i=0; i<cells.length; i++){
        cells[i].textContent = ''
    }
    gameOverDiv.style.display = 'none';
}

//Events
for(var i=0; i<cells.length; i++){
    cells[i].addEventListener('click', handleClick)
}

resetBtn.addEventListener('click', handleReset)

