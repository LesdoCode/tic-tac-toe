let grid = document.querySelector('#buttons');
let gameControls = document.querySelector('#gameControls');

let currentChar = "X";
let currentGrid;
let playedMoves = [];
let undoneMoves = [];

const winningCombinations = [
    //up and accross
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    //diagonal
    [0,4,8],[2,4,6]
];


function startNewMatch() {
    let button;

    currentGrid = [0,0,0,0,0,0,0,0,0];

    for(element of document.querySelector('#buttons').children){
        button = document.getElementById(element.id);
        button.innerHTML = ''; 
    }
}

function getPlayChar(){
    currentChar = currentChar === 'X' ? 'O' :'X';
    return currentChar;
}

function updateCurrentGrid(buttonId) {
    currentGrid[parseInt(buttonId) -1] = currentChar;
}

function evaluateGrid(_currentGrid) {
    for (let winCombo of winningCombinations){
        const firstChar = _currentGrid[winCombo[0]];
        const secondChar = _currentGrid[winCombo[1]];
        const thirdChar = _currentGrid[winCombo[2]];

        if (firstChar == secondChar && secondChar == thirdChar && (secondChar == "X" || secondChar == "O")) {
            return { isWin: true, winner: firstChar }
        }
    }
    return { isWin: false };
}

function isDraw(_currentGrid) {
    console.log(_currentGrid)
    return (!_currentGrid.includes(0)); 
}

function playMove(_button) {
    const buttonId = _button.id;
    const currentPlayChar = getPlayChar();
    _button.innerHTML = currentPlayChar;

    updateCurrentGrid(buttonId);

    const move ={
        playChar: currentPlayChar,
        gridPosition: (parseInt(buttonId) -1)
    }
    playedMoves.push(move);
}

function playSpecificMove(_playChar, gridPosition, _currentGrid) {
    const buttonId = (gridPosition + 1).toString();    
    const button = document.getElementById(buttonId);

    button.innerHTML = _playChar;
    _currentGrid[gridPosition] = _playChar;

    const move = {
        playChar: _playChar,
        gridPosition: gridPosition
    }
    undoneMoves.push(move);
}

function blankButton(buttonId) {
    //returns a button to blank state on the UI.
    document.getElementById(buttonId).innerHTML = "";
}

function undoMove() {
    if (playedMoves.length === 0) return;

    const move = playedMoves.pop();

    currentGrid[move.gridPosition] = 0;
    blankButton((move.gridPosition + 1).toString());

    undoneMoves.push(move);
}

function redoMove() {
    if (undoneMoves.length == 0) return;
    const move = undoneMoves.pop();
    
    playSpecificMove(
        move.playChar,
        move.gridPosition,
        currentGrid
    )
}

//Event listeners
grid.addEventListener('click', function(e){
    if(e.target !== e.currentTarget){
        let clickedButtonId = e.target.id;
        const button = document.getElementById(clickedButtonId);

        if(button.innerHTML == ''){
            playMove(button);

            const evaluation = evaluateGrid(currentGrid);

            if (evaluation.isWin){
                alert(`Game over. ${evaluation.winner} wins!!!`);
            }
            else{
                if (isDraw(currentGrid)){
                    alert(`Game over. It's a draw`);
                }
            }
        }
        else
            alert(`"${button.innerHTML}" already took that spot`);
    }
})

gameControls.addEventListener('click', function(e) {
    if (e.target !== e.currentTarget){
        let clickedButtonId = e.target.id;

        switch (clickedButtonId){
            case 'btnUndo':
                undoMove();
                break;
            case 'btnNewGame':
                startNewMatch();
                break;
            case 'btnRedo':
                redoMove();
                break;
        }
    }
})

//Start
startNewMatch();