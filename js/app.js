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
    //code above
})