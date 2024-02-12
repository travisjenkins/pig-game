"use strict";

// Game elements
const player0Elm = document.querySelector(".player--0");
const player1Elm = document.querySelector(".player--1");
const score0Elm = document.querySelector("#score--0");
const score1Elm = document.querySelector("#score--1");
const current0Elm = document.querySelector("#current--0");
const current1Elm = document.querySelector("#current--1");
const diceElm = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Game level variables
const winningScore = 100;
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Initial game state
function init() {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Elm.textContent = 0;
  score1Elm.textContent = 0;
  current0Elm.textContent = 0;
  current1Elm.textContent = 0;

  diceElm.classList.add("hidden");
  player0Elm.classList.remove("player--winner");
  player1Elm.classList.remove("player--winner");
  player0Elm.classList.add("player--active");
  player1Elm.classList.remove("player--active");
}

// Set initial state on startup
init();

function rollDice() {
  if (playing) {
    // 1) Generate a random dice roll (1 - 6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2) Display the dice
    diceElm.classList.remove("hidden");
    diceElm.src = `dice-${dice}.png`;

    // 3) Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
}

function updatePlayerScore() {
  if (playing) {
    // 1) Add the player's current score to their game score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2) Check for winner
    if (scores[activePlayer] >= winningScore) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 3) Switch players and continue playing
      switchPlayer();
    }
  }
}

function switchPlayer() {
  // 1) Reset player's current score
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  currentScore = 0;

  // 2) Change the active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
}

// Handle button click events
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", updatePlayerScore);
btnNew.addEventListener("click", init);
