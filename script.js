// Combat_Settings
const settings = document.querySelector(".mode_settings");
const overlay = document.querySelector(".overlay");
const Xsettings = document.querySelector(".close_settings");
const btnSettings = document.querySelector(".game_settings");
const modeDamage = document.querySelector(".mode_damage");

//Open Rules
const openSettings = function () {
  settings.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// Open Option Damage
const damage = function () {
  modeDamage.classList.remove("hidden");
  // overlay.classList.remove("hidden");
};

// Close Rules
const closeSettings = function () {
  settings.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Click btn Rules
btnSettings.addEventListener("click", openSettings);

// Click Close Rules
Xsettings.addEventListener("click", closeSettings);
overlay.addEventListener("click", closeSettings);

// Select Elements
const dice = document.querySelector(".dice");
const dice2 = document.querySelector(".dice2");
const rollDiceBtn = document.querySelector(".btn_roll");
const btnHold = document.querySelector(".btn_hold");
const btnNew = document.querySelector(".btn_new");
const btnNormal = document.querySelector(".normal_mode");
const btnCombat = document.querySelector(".combat_mode");

// Option damage Elements
const btnDoDamage = document.querySelector(".btn-damage");
const btnHoldDamage = document.querySelector(".btn-hold-damage");

const player00 = document.querySelector(".player--0");
const player01 = document.querySelector(".player--1");

const curretnScore_0 = document.getElementById("current_score--0");
const curretnScore_1 = document.getElementById("current_score--1");

const score_01 = document.getElementById("score--0");
const score_02 = document.getElementById("score--1");

//variables
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = false;
let normalMode = false;
let combatMode = false;

//Starting conditions
score_01.textContent = 0;
score_02.textContent = 0;

dice2.classList.add("hidden");

modeDamage.classList.add("hidden");

//game Mode
btnNormal.addEventListener("click", function () {
  btnNormal.classList.add("btn_selected");
  btnCombat.classList.remove("btn_selected");
  dice2.classList.add("hidden");
  playing = true;
  normalMode = true;
  combatMode = false;
});

btnCombat.addEventListener("click", function () {
  btnCombat.classList.add("btn_selected");
  btnNormal.classList.remove("btn_selected");
  dice2.classList.remove("hidden");
  playing = true;
  combatMode = true;
  normalMode = false;
});

//switch player functionality
const switchPlayer = function () {
  document.getElementById(`current_score--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player00.classList.toggle("player--color");
  player01.classList.toggle("player--color");
};

//Hold score functionality
function holdScore() {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100 or 200 case combatMode
    if (
      combatMode ? scores[activePlayer] >= 200 : scores[activePlayer] >= 100
    ) {
      // Finish the Game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
}

// New Game
btnNew.addEventListener("click", function () {
  score_01.textContent = 0;
  score_02.textContent = 0;
  curretnScore_0.textContent = 0;
  curretnScore_1.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  switchPlayer();
});

// Close Option Damage
const closeDam = function () {
  modeDamage.classList.add("hidden");
  // overlay.classList.add("hidden");
};

// hold damage points functionality
function holdOptionDamage() {
  holdScore();
  closeDam();
}

// Do Damage functionality
function doDamage() {
  if (activePlayer === 0) {
    scores[1] -= currentScore;
    document.getElementById(`score--1`).textContent = scores[1];
  } else {
    scores[0] -= currentScore;
    document.getElementById(`score--0`).textContent = scores[0];
  }
  closeDam();
  switchPlayer();
}

//Roll Dice functionality
function rollDice() {
  if (playing) {
    if (normalMode) {
      let result = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
      dice.dataset.side = result;
      dice.classList.toggle("reRoll");
      console.log(result);
      setTimeout(() => {
        if (result !== 1) {
          currentScore += result;
          document.getElementById(
            `current_score--${activePlayer}`
          ).textContent = currentScore;
        } else {
          switchPlayer();
        }
      }, "1500");
    } else if (combatMode) {
      //dice 1
      let result = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
      dice.dataset.side = result;
      dice.classList.toggle("reRoll");
      //dice 2
      let result2 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
      dice2.dataset.side2 = result2;
      dice2.classList.toggle("reRoll2");
      // Soma dos dados
      let diceTR = result + result2;
      console.log(diceTR);
      setTimeout(() => {
        if (diceTR !== 2 && diceTR !== 5 && diceTR !== 8) {
          if (diceTR == 7) {
            damage();
          }
          currentScore += diceTR;
          document.getElementById(
            `current_score--${activePlayer}`
          ).textContent = currentScore;
        } else {
          switchPlayer();
        }
      }, "1500");
    }
  }
}

rollDiceBtn.addEventListener("click", rollDice);

btnHold.addEventListener("click", holdScore);
btnHoldDamage.addEventListener("click", holdOptionDamage);
btnDoDamage.addEventListener("click", doDamage);
