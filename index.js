const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
const players = ['x', 'o'];
const count = [0, 0];
let turn = true;
let currentPlayer = players[0];
let win = false;
const restart = document.getElementById('restart');
const score = document.getElementById('score');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
squares.forEach((square) => {
    square.addEventListener('click', function () {
        if (square.innerText === '' && win === false) {
            if (turn) {
                square.innerText = players[0];
                turn = false;
                square.disabled = true;
                checkWinner(currentPlayer);
                checkDraw();
                currentPlayer = players[1];
            } else {
                square.innerText = players[1];
                turn = true;
                square.disabled = true;
                checkWinner(currentPlayer);
                checkDraw();
                currentPlayer = players[0];
            }
        }
    })
})
restart.addEventListener('click', function () {
    squares.forEach((square) => {
        square.innerText = '';
        square.enabled = true;
        win = false;
        document.getElementById('winScreen').style.display = 'none';
    })
})
function checkDraw(){
    console.log("code runs");
    for (let i = 0; i < squares.length; i++) {
       if (squares[i].innerText == '') {
        return false;
       }
    }
    document.getElementById('winScreen').innerText = "IT'S A DRAW!";
    document.getElementById('winScreen').style.display = 'block';
    return true;
}
function checkWinner(currentPlayer) {
    for (let i = 0; i < winConditions.length; i++) {
        let [a, b, c] = winConditions[i]
        if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
            console.log("You win!");
            win = true;
            if(currentPlayer === players[0]){
                count[0]++;
            } else{
                count[1]++;
            }
            score.innerText = "x: " + count[0] + " | " + count[1] + " :o";
            document.getElementById('winScreen').innerText = currentPlayer + " WINS!";
            document.getElementById('winScreen').style.display = 'block';
            return true;
        }
    }
    return false;
}