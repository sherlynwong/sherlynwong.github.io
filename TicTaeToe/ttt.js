/*
    1. Select board
    2. Add Event Listener
    3. Click on Square. Fill it in
    4. Alternate what to put
    5. Make sure can't click on same square more than once
*/


let audio = new Audio('beep-07.wav'); // define your audio
let player = 'X'
let isGameEnd = false
let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function mouseDownHandler(event) {
    const box = event.target
    box.style.backgroundColor = 'lightgrey'
}

function mouseUpHandler(event) {
    const box = event.target
    box.style.backgroundColor = 'white'
}

function clickHandler(event) {

    if (isGameEnd) return
    audio.play()

    const box = event.target
    if (box.innerText == "") {
        box.innerText = player
        if (checkIsWinner() == true) {
            isGameEnd = true
            setTimeout(function () {
                alert(`Player ${player} win!`)
            }, 200)
        } else if (checkIsDraw() == true) {
            isGameEnd = true
            setTimeout(function () {
                alert('Draw!')
            }, 200)
        }
        else {
            changePlayer()
        }
    } else {
        alert('Space already taken dumbass!')
    }
}

const boxes = document.querySelectorAll('.box')
boxes.forEach(box => {
    box.addEventListener('click', clickHandler)
    box.addEventListener('mouseup', mouseUpHandler)
    box.addEventListener('mousedown', mouseDownHandler)
})

function changePlayer() {
    if (player == 'X') {
        player = 'O'
    }
    else {
        player = 'X'
    }
}


function checkIsWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        if (isStrike(winningCombos[i])) {
            console.log('strike!')
            return true
        }
    }
    return false
}

function isStrike(line) {
    let player = boxes[line[0]].innerText
    if (player == "") return false

    return player == boxes[line[1]].innerText
        && player == boxes[line[2]].innerText
}

function checkIsDraw() {
    let isDraw = true

    // boxes.forEach(box => {
    //     if (box.innerText == '')
    //         isDraw = false
    // })

    boxes.forEach(function (box) {
        if (box.innerText == '')
            isDraw = false
    })

    return isDraw;
}
