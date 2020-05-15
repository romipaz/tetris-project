'use strict';
document.addEventListener('DOMContentLoaded', () => {
    //code below here
    const grid = document.querySelector('.grid');

    //The Array.from() method returns an Array object from any object with a length property or an iterable object.
    //make an array of indexed squares
    let squares = Array.from(document.querySelectorAll('.grid div'));

    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-btn');
    const width = 10;

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
    let random = Math.floor(Math.random() * theTetrominoes.length);
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
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw()

        }
    }

    //move the tetromino left, unless is at the edge or there is a blockage
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if(!isAtLeftEdge) {
            currentPosition -=1;
        }

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1;
        }
        draw();
    }




    //code above
})