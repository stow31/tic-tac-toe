//Declare variables 
//DOM Elements
var cells = document.querySelectorAll('.cell-div');
var playerTurnSection = document.querySelector('.players-turn-section')

//General Elements
// 1 = player 1, 2 = player 2
var playerID = 1;
var counter = 0;
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
        cell.style.backgroundColor = 'red'
    } else {
        cell.style.backgroundColor = 'blue'
    }

    if(checkforWinner()){
        console.log("There is a winner");
    }
    
    changePlayer();
}

function changePlayer(){
    if (playerID === 1){
        playerTurnSection.textContent = `Player 2's turn`;
       return playerID = 2;
    } else {
        playerTurnSection.textContent = `Player 1's turn`;
        return playerID = 1;
    }

}

function checkforWinner(){
    for(var j=0; j<winningCombos.length; j++){
        for (var i=winningCombos[j][0]; i<=winningCombos[j][2]; i+=winningCombos[j][1]-winningCombos[j][0]){
            if (cells[i].style.backgroundColor === 'red'){
                counter ++

                if (counter === 3){
                    return true;
                }
            }
        }
        counter = 0
    }
    return false;
}

//Events
for(var i=0; i<cells.length; i++){
    cells[i].addEventListener('click', handleClick)
}