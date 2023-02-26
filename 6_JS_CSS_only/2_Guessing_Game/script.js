'use strict';

//variables
let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highScore = 0;

//functions
const setMessage = function (message){
    document.querySelector('.message').textContent = message;
};
const setNumber = function (value){
    document.querySelector('.number').textContent = value;
};
const setScore = function (score){
    document.querySelector('.score').textContent = score;
};

//debug-check
// setNumber(secretNumber);

//Game-Logic
document.querySelector('.check').addEventListener('click', function (){
    const guess = (document.querySelector('.guess').value);
    console.log(guess);
    //When there is no input
    if (guess.length == 0) {
        setMessage('⛔ No Input') ;
    }
    //When Player wins 
    else if (Number(Number(guess)) === secretNumber) {
        setMessage("Correct Number!🥳");
        // document.querySelector('body').style.backgroundColor = '#2f7327';
        document.querySelector('body').style.backgroundColor = '#214F1C';
        
        document.querySelector('.number').style.width = '30rem';
        setNumber(secretNumber);
        
        if (score > highScore){
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    }
    //When not lost
    else if (score >0) {
        setMessage(guess > secretNumber?"Too High! ☝️":"Too Low! 👇");
        score--;
        setScore(score);
    } 
    //When score reaches 0
    else if (score===0){
        setMessage("☠️ You lose, try again!");
    };
});

//Reset
document.querySelector('.again').addEventListener('click', function(){
    setNumber("?"); //number-text
    document.querySelector('.number').style.width = '15rem'; //number-width
    document.querySelector('body').style.backgroundColor = '#1e1e1c'; //body
    setMessage("Start guessing..."); //message-text
    secretNumber = Math.trunc(Math.random()*20)+1; //random-number
    score=20;
    setScore(score); //score
})
