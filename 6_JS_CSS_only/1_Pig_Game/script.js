'use strict';

// Selecting Elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Define initial variables
let scores;
let currentScore;
let activePlayer;
let playing;
let first = true;
//Functions
const init = function (){
    //initial values
    scores = [0,0];
    currentScore = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = currentScore;
    current1El.textContent = currentScore;

    //hide dice
    diceEl.classList.add('hidden');

    //set active player and style to player 0  
    if (first){
    activePlayer = 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    document.querySelector(`.player--${activePlayer+1}`).classList.remove('player--active'); 
    }
};

const removeFinStyles = function(){
    //remove winning/losing styles
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner'); //remove winner
    document.getElementById(`box--${activePlayer}`).classList.remove('current-winner'); 
    document.querySelector(`.player--${activePlayer===0?1:0}`).classList.remove('player--loser'); //remove loser
    document.getElementById(`box--${activePlayer===0?1:0}`).classList.remove('current-loser');
    
};

const switchPlayer = function(){
    //To switch player
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0? 1: 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

const resetToLoser = function(){
    activePlayer = activePlayer === 0 ? 1:0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    document.querySelector(`.player--${activePlayer === 0 ? 1:0}`).classList.remove('player--active'); 
    
}
//initiating stating game condiitons
init();

//Dice Rolling Logic
btnRoll.addEventListener('click', function(){
    if (playing) {
    //Generatong a random dice roll
    let diceRoll = Math.trunc(Math.random() *6)+1;
    // console.log(diceRoll);

    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    //Checked for rolled 1
    if(diceRoll !== 1) {
        // Add dice to the current score
        currentScore+=diceRoll;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        // current0El.textContent = currentScore; //change Later
    }else{
        //Switch to next player
        switchPlayer();
    }
    }
})

//Hold button Logic
btnHold.addEventListener('click', function(){
    if (playing) {
    //Add current score to the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //Switch player
    if(scores[activePlayer]<10){
    switchPlayer();
    }
    else{
    //Finish Game
    playing = false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`.player--${activePlayer===0?1:0}`).classList.add('player--loser');
    document.getElementById(`box--${activePlayer}`).classList.add('current-winner');
    document.getElementById(`box--${activePlayer===0?1:0}`).classList.add('current-loser');
    }
}
})

//New game Logic
btnNew.addEventListener('click', function () {
    first = false;
    removeFinStyles();
    init();
    resetToLoser();
})
