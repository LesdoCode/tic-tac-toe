let grid = document.querySelector('#buttons');
let currentChar = "X";


const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[3,4,7],[2,5,8],

    [0,4,8],[2,4,6]
];

let currentGrid = [
    [0,0,0,0,0,0,0,0,0]
]


function getPlayChar(){
    currentChar = currentChar === 'X' ? 'O' :'X';
    return currentChar;
}

function updateCurrentGrid(id) {
    currentGrid[parseInt(id) -1] = currentChar;
}

function evaluateGrid() {
    for (let winCombo of winningCombinations){
        const firstChar = currentGrid[winCombo[0]];
        const secondChar = currentGrid[winCombo[1]];
        const thirdChar = currentGrid[winCombo[2]];

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

            const evaluation = evaluateGrid();


            if (evaluation.isWin){
                alert("Winner:", evaluation.winner)
            }
            else{
                if (!currentGrid.includes(0) && !currentGrid.includes('')){
                    alert("game over! it's a draw." + currentGrid)
                }
            }
        }
        else
            alert(button.innerHTML, "already took that spot");
    }
})




