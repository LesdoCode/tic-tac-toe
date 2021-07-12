let grid = document.querySelector('#buttons');
let currentChar = "X";
let currentGrid; 


const winningCombinations = [
    //up and accross
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    //diagonal
    [0,4,8],[2,4,6]
];

function startNewMatch() {
    let button;

    currentGrid = [
        [0,0,0,0,0,0,0,0,0]
    ];

    for(element of document.querySelector('#buttons').children){
        button = document.getElementById(element.id);
        button.innerHTML = ''; 
    }
}

function getPlayChar(){
    currentChar = currentChar === 'X' ? 'O' :'X';
    return currentChar;
}

function updateCurrentGrid(id) {
    currentGrid[parseInt(id) -1] = currentChar;
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
    for (let char of _currentGrid)
        if (char != 'X' && char != "O")
            return false;

    return true;
}

grid.addEventListener('click', function(e){
    if(e.target !== e.currentTarget){
        let clickedButtonId = e.target.id;
        const button = document.getElementById(clickedButtonId);

        if(button.innerHTML == ''){
            button.innerHTML = getPlayChar();
            updateCurrentGrid(button.id);

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


startNewMatch();