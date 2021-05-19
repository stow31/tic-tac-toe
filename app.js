

//Declare variables 
var cells = document.querySelectorAll('.cell');
// 1 = player 1, 2 = player 2
var playerID = 2;

//Functions 
function handleClick(e){
    debugger
    var cell = e.target;

    if (playerID === 1){
        cell.style.backgroundColor = 'red'
    } else {
        cell.style.backgroundColor = 'blue'
    }

    changePlayer();
}

function changePlayer(){
    if (playerID === 1){
       return playerID = 2;
    } else {
        return playerID = 1;
    }

}

//Events
for(var i=0; i<cells.length; i++){
    cells[i].addEventListener('click', handleClick)
}