"use strict";
// selecting elements
// let turn = true; // turn true player 1 and turn false player 2;
let current_score = 0;
const holdBtn = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const roll = document.querySelector(".btn--roll");
const score0 = document.querySelector("#current--0");
const score1 = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const new_game = document.querySelector(".btn--new");
let active = 0;
let total_score = [0, 0];
let playing = true; // to check if we are still playing  the game
//ie. neither player1 nor player2 has reached the winning score.

//starting conditions;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// used functions here:
const display_img = function (num) {
  diceEl.src = `dice-${num}.png`;
  diceEl.classList.remove("hidden");
};
const switching_player = function () {
  document.querySelector(`#current--${active}`).textContent = 0;
  active = active === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

//user rolls the dice;
roll.addEventListener("click", () => {
  if (playing) {
    let random_num = Math.trunc(Math.random() * 6) + 1;
    console.log(random_num);
    display_img(random_num);
    //   score2.textContent = Number(score2.textContent) + random_num;
    if (random_num !== 1) {
      //case will be for player 1 and 2 both depending on the value of active;
      current_score += random_num;
      document.querySelector(`#current--${active}`).textContent = current_score;
    } else {
      // this case will be for player2;
      switching_player();
    }
  }
});

holdBtn.addEventListener("click", () => {
  if (playing) {
    total_score[active] += Number(
      document.querySelector(`#current--${active}`).textContent
    );

    current_score = 0;
    document.querySelector(`#score--${active}`).textContent =
      total_score[active];
    if (total_score[active] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${active}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${active}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      switching_player();
    }
  }
});

// to start a new game;
new_game.addEventListener("click", () => {
  active = 0;
  player0.classList.add("player--active");
  if (player1.classList.contains("player--active"))
    player1.classList.remove("player--active");
  total_score = [0, 0];
  const scores = document.querySelectorAll(".score");
  for (let score of scores) {
    score.textContent = 0;
  }
  current_score = 0;
  diceEl.classList.add("hidden");

  if (player0.classList.contains("player--winner"))
    player0.classList.remove("player--winner");
  if (player1.classList.contains("player--winner"))
    player1.classList.remove("player--winner");
  playing = true;
  diceEl.classList.remove("hidden");
});
