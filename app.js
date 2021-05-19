//Declare variables 
//DOM Elements
var cells = document.querySelectorAll('.cell-div');
var playerTurnSection = document.querySelector('.players-turn-section');
var gameOverDiv = document.querySelector('.game-over-div');
var winnerDiv = document.querySelector('.winner-div');
var resetBtn = document.querySelector('.reset-btn');

//General Elements
// 1 = player 1, 2 = player 2
var playerXName = prompt('Welcome player one, you will be crosses, what is your name?')
var playerOName = prompt('Welcome player two, you will be Os, what is your name?')
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

playerTurnSection.textContent = `${playerXName} you're up first!`

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

function announceWinner(){

    var winner = checkforWinner();

    if(winner === 'X'){
        console.log("X wins");
        gameOverDiv.style.display = 'flex';
        winnerDiv.textContent = `${playerXName} with the X's Wins!`
        return
    } else if(winner === 'O'){
        console.log("O wins");
        gameOverDiv.style.display = 'flex';
        winnerDiv.textContent = `${playerOName} with the O's Wins!`
        return
    } else if (checkIfTie()){
        console.log("It's a tie");
        gameOverDiv.style.display = 'flex';
        winnerDiv.textContent = `${playerXName} and ${playerOName} you tied!! A rematch?`
        return
    }
}

function changePlayer(){
    if (playerID === 1){
        playerTurnSection.textContent = `${playerOName}'s turn with the Os`;
       return playerID = 2;
    } else {
        playerTurnSection.textContent = `${playerXName}'s turn with the Xs`;
        return playerID = 1;
    }

}

function checkforWinner(){
    debugger
    for(var j=0; j<winningCombos.length; j++){
        for (var i=winningCombos[j][0]; i<=winningCombos[j][2]; i+=winningCombos[j][1]-winningCombos[j][0]){
            if (cells[i].textContent === 'X'){
                xCounter ++
                if (xCounter === winningCombos[j].length){
                    return 'X';
                }
            } else if (cells[i].textContent === 'O'){
                oCounter ++
                if (oCounter === winningCombos[j].length){
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

