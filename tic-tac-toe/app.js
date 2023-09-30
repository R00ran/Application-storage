createBoard(9)
let sign;
const scX = document.querySelector('.sc-x');
let scoreX = 0;
const scO = document.querySelector('.sc-o');
let scoreO = 0;
const winningScreen = document.querySelector('.winning-screen');
const message = document.querySelector('.message');
const startScreen = document.querySelector('.start-screen');
const input = document.querySelector('#selection');
const cells = document.querySelectorAll('.cell');
const confirmButton = document.querySelector('.confirm');
const restartButton = document.querySelector('.restart');
const renewButton = document.querySelector('.renew');
const resetScoreButton = document.querySelector('.reset-score');
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
scX.innerHTML = scoreX
scO.innerHTML = scoreO


resetScoreButton.addEventListener('click', () => {
    scoreO = 0;
    scoreX = 0;      
    scX.innerHTML = scoreX
    scO.innerHTML = scoreO
})

restartButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.classList.remove("o", "x")
        cell.removeEventListener('click', addSign);
        cell.addEventListener('click', addSign, { once: true })
    })
    winningScreen.style.display = "none"
    sign = input.checked ? "x" : "o"
})

renewButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.classList.remove("o", "x")
        cell.removeEventListener('click', addSign);
        cell.addEventListener('click', addSign, { once: true })
    })
    winningScreen.style.display = "none"
    sign = input.checked ? "x" : "o"
    startScreen.style.display = "flex"
})

confirmButton.addEventListener('click', () => {
    sign = input.checked ? "x" : "o"
    startScreen.style.display = "none"
})

function changeSign() {
    sign = sign == "x" ? "o" : "x"
}

function checkForWinOrDraw() {
    const arr1 = []
    const arr2 = []
    let victor;
    cells.forEach((ele, index) => {
        if (ele.classList.contains('o')) {
            arr1.push(index)
        } else if (ele.classList.contains('x')) {
            arr2.push(index)
        }
    })
    winningCombinations.forEach((combo, index) => {
        if (combo.every(a => arr1.includes(a))) {
            victor = "o"
            scoreO ++
            return victor
        } else if (combo.every(b => arr2.includes(b))) {
            victor = "x"
            scoreX ++
            return victor
        }
    })
    if (victor) {
        winningScreen.style.display = "flex"
        message.innerHTML = "The \"" + victor + "`s\" has won"
        scX.innerHTML = scoreX
        scO.innerHTML = scoreO
    } else if (arr1.length + arr2.length == 9) {
        winningScreen.style.display = "flex"
        message.innerHTML = "Draw"
    }

}



function addSign(e) {
    e.target.classList.add(sign);
    checkForWinOrDraw();
    changeSign();
}

function createBoard(num) {
    const board = document.createElement("div")
    board.classList.add("board")
    while (num) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.addEventListener('click', addSign, { once: true })
        board.appendChild(cell)
        num--
    }
    document.body.appendChild(board)
}

