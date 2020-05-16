
document.addEventListener('DOMContentLoaded', () => {
    //code below here
    const grid = document.querySelector('.grid');

    //The Array.from() method returns an Array object from any object with a length property or an iterable object.
    //make an array of indexed squares
    let squares = Array.from(document.querySelectorAll('.grid div'));

    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-btn');
    const width = 10;
    let nextRandom = 0;

    //The Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentRotation = 0
    let currentPosition = 4;
    //randomly select a tetromino and its first rotation
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];


    //draw the tetromino, for each item on our array we gonna add a class 'tetromino' which will color that item, which is technically a div inside the elelment with the class 
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        })
    }

    //undraw
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        })
    }

    //make the tetromino move down every second
    timerId = setInterval(moveDown, 1000);

    //assign functions to keyCodes
    function control(evt) {
        if (evt.keyCode === 37) {
            moveLeft();
        } else if (evt.keyCode === 38) {
            rotate();
        } else if (evt.keyCode === 39) {
            moveRight();
        } else if (evt.keyCode === 40) {
            moveDown();
        }
    }

    document.addEventListener('keyup', control);

    //move down function
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //freeze function
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw()
            displayShape();
        }
    }

    //move the tetromino left, unless is at the edge or there is a blockage
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if (!isAtLeftEdge) {
            currentPosition -= 1;
        }

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    //move the tetromino right, unless is at the edge or there is a blockage

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if (!isAtRightEdge) {
            currentPosition += 1;
        }

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }


    //rotate the tetromino
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) { //if current rotation gets to index 4 make it back to the index of 0.
            currentRotation = 0;
        } else {
            current = theTetrominoes[random][currentRotation];
            draw();
        }
    }

    //show-up next tetromino in mini-grid display
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth= 4;
    let displayIndex = 0;


    //the Tetromino without rotation
    const upNextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino[0]
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino[0]
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino[0]
        [0, 1, displayWidth, displayWidth + 1], //oTetromino[0]
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino[0]
    ]

    //display shape in the mini-grid display, mirror effect;
    function displayShape() {
        //remove any trace of a tetromino from the entire mini-grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }


    //code above
})