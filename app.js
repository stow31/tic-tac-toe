//Declare variables 
//DOM Elements
var switchValue = document.querySelector('.switch input')

//All squares
var userInputPopUp = document.querySelector('.user-input-popup')
var inputPlayerOne = document.querySelector('.player-x-details input')
var inputPlayerTwo = document.querySelector('.player-o-details input')
var startGameBtn = document.querySelector('.start-game')
var containerDiv = document.querySelector('.container-div');
var cells = document.querySelectorAll('.cell-div');
var cells3x3 = document.querySelectorAll('.size3x3');
var cells4x4 = document.querySelectorAll('.size4x4');
var gridContainer3X3 = document.querySelector('.grid-container-3x3')
var gridContainer4X4 = document.querySelector('.grid-container-4x4')
var gameOverDiv = document.querySelector('.game-over-div');
var winnerDiv = document.querySelector('.winner-div');
var newGameBtn = document.querySelector('.new-game-btn');
var playersTurnName = document.querySelector('.players-turn-name');
var playerXNameContainer = document.querySelector('.player-x-name');
var playerXPointsContainer = document.querySelector('.players-x-points');
var playerONameContainer = document.querySelector('.player-o-name');
var playerOPointsContainer = document.querySelector('.players-o-points');
var resetBtn = document.querySelector('.reset-btn');

//General Elements
var playerXName
var playerOName
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
    [0,4,8],
]
var winningCombos4x4 = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12]

]



//Functions 

function handleStartPlayingBtn(){
    if(inputPlayerOne.value === ''){
        document.querySelector('.under-input-alert').style.display = 'block'
    } else if (inputPlayerTwo.value === ''){ 
        document.querySelector('.under-input-alert').textContent = "Please Enter Both Players Name";
        document.querySelector('.under-input-alert').style.display = 'block'
    } else {
        playerXName = inputPlayerOne.value;
        playerOName = inputPlayerTwo.value;
        playersTurnName.textContent = `${playerXName} you're up first!`
        playerXNameContainer.textContent = `${playerXName}'s Points (X)`
        playerONameContainer.textContent = `${playerOName}'s Points (O)`    
        userInputPopUp.style.display = 'none';
        document.querySelector('.under-input-alert').style.display = 'none'
    }
}

function handleAssignPlayerValue(e){
    var cell = e.target;
    if(cell.textContent === ''){
        if (playerID === 1){
            cell.textContent = 'X'
            cell.style.color = 'rgb(255, 204, 204)'
        } else {
            cell.textContent = 'O'
            cell.style.color = 'rgb(196, 219, 232)'
        }
        announceWinner()
        changePlayer();
    }
}

function announceWinner(){
    var winner = whichGameIsBeingPlayed();

    if(winner === 'X'){
        // could move to function --start
        var playerXPoints = Number(playerXPointsContainer.textContent);
        playerXPoints++;
        playerXPointsContainer.textContent = playerXPoints;
        // could move to function --end
        gameOverDiv.style.display = 'flex';
        winnerDiv.textContent = `${playerXName} with the X's Wins!`
        return
    } else if(winner === 'O'){
        // could move to function --start
        var playerOPoints = Number(playerOPointsContainer.textContent);
        playerOPoints++;
        playerOPointsContainer.textContent = playerOPoints;
        // could move to function --end
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

function whichGameIsBeingPlayed(){
    if (switchValue.checked){
        var winner = checkforWinner4x4();
        return winner
    } else {
        var winner = checkforWinner3x3();
        return winner
    }
}

function changePlayer(){
    if (playerID === 1){
        playersTurnName.textContent = `${playerOName}'s turn with the Os`;
       return playerID = 2;
    } else {
        playersTurnName.textContent = `${playerXName}'s turn with the Xs`;
        return playerID = 1;
    }

}

function checkforWinner3x3(){
    for(var j=0; j<winningCombos.length; j++){
        for (var i=winningCombos[j][0]; i<=winningCombos[j][2]; i+=winningCombos[j][1]-winningCombos[j][0]){
            if (cells3x3[i].textContent === 'X'){
                xCounter ++
                if (xCounter === winningCombos[j].length){
                    // console.log(winningCombos[j]);
                    alertWinningCells(winningCombos[j])
                    return 'X';
                }
            } else if (cells3x3[i].textContent === 'O'){
                oCounter ++
                if (oCounter === winningCombos[j].length){
                    alertWinningCells(winningCombos[j])
                    return 'O';
                }
            }
        }
        xCounter = 0
        oCounter = 0
    }
    return false;

}

function alertWinningCells(winningArr){
    if (winningArr.length === 3){
        for (let i = 0; i < winningArr.length; i++) {
            console.log(cells3x3[winningArr[i]]); 
            cells3x3[winningArr[i]].classList.add('winner')
        }
    } else {
        for (let i = 0; i < winningArr.length; i++) {
            console.log(cells3x3[winningArr[i]]); 
            cells4x4[winningArr[i]].classList.add('winner')
        }
    }
}

function checkforWinner4x4(){
    for(var j=0; j<winningCombos4x4.length; j++){
        for (var i=winningCombos4x4[j][0]; i<=winningCombos4x4[j][3]; i+=winningCombos4x4[j][1]-winningCombos4x4[j][0]){
            if (cells4x4[i].textContent === 'X'){
                xCounter ++
                if (xCounter === winningCombos4x4[j].length){
                    alertWinningCells(winningCombos4x4[j])
                    return 'X';
                }
            } else if (cells4x4[i].textContent === 'O'){
                oCounter ++
                if (oCounter === winningCombos4x4[j].length){
                    alertWinningCells(winningCombos4x4[j])
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
    if (switchValue.checked){
        for (let i = 0; i < cells4x4.length; i++) {
            if(cells4x4[i].textContent === ''){
                return false;
            }
        }
    } else { 
        for (let i = 0; i < cells3x3.length; i++) {
            if(cells3x3[i].textContent === ''){
                return false;
            }
        }
    }

    return true;
}

function handleGridChange(){
    if (switchValue.checked){
        gridContainer3X3.classList.add('hidden')
        gridContainer4X4.classList.remove('hidden')
        containerDiv.style.width = '600px'
        handleNewGame()
        
    } else {
        gridContainer3X3.classList.remove('hidden')
        gridContainer4X4.classList.add('hidden')
        containerDiv.style.width = '500px'
        handleNewGame()
    }
}

function handleNewGame(){
    xCounter = 0;
    oCounter = 0;
    for(var i=0; i<cells.length; i++){
        cells[i].textContent = ''
        cells[i].classList.remove('winner')
    }
    gameOverDiv.style.display = 'none';
    
}

function handleReset(){
    playerXPointsContainer.textContent = 0;
    playerOPointsContainer.textContent = 0;
    playerID = 1
    userInputPopUp.style.display = 'flex';
    inputPlayerOne.value = ""
    inputPlayerTwo.value = ""
    
    handleNewGame()
}




//Events
for(var i=0; i<cells.length; i++){
    cells[i].addEventListener('click', handleAssignPlayerValue)
}

startGameBtn.addEventListener('click', handleStartPlayingBtn)
newGameBtn.addEventListener('click', handleNewGame)
switchValue.addEventListener('click', handleGridChange)
resetBtn.addEventListener('click', handleReset)