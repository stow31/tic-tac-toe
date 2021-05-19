//Declare variables 
//DOM Elements
var cells = document.querySelectorAll('.cell-div');
var playerTurnSection = document.querySelector('.players-turn-section')

//General Elements
// 1 = player 1, 2 = player 2
var playerID = 1;


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
    for (var i=0; i<3; i++){
        if (cells[i].style.backgroundColor != 'red'){
            return false;
        }
    }
    return true;
}

//Events
for(var i=0; i<cells.length; i++){
    cells[i].addEventListener('click', handleClick)
}