/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold',  which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, roundScore, activePlayer;

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.add("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".btn-roll").style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";
}
init();

document.querySelector(".btn-new").addEventListener("click", init);

function roll() {
  const dice = Math.floor(Math.random() * 6) + 1; //1. random number
  console.log("dobtunk a kockával ");
  let diceDOM = document.querySelector(".dice"); // 2. display the result
  diceDOM.style.display = "block"; // event loop miatt nem jelenik meg a dice5png 
  diceDOM.src = `dice-${dice}.png`; //diceDOM.src = "dice-" + dice + ".png";
  if (dice !== 1) {  // 3.Update the round score if the rolled number was NOT a 1
    roundScore += dice; //Add score
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else { //Next player
    nextPlayer();
  }
}

document.querySelector(".btn-roll").addEventListener("click", roll);

function hold() {
  scores[activePlayer] += roundScore; // Add Current score to GLOBAL score
  document.querySelector("#score-" + activePlayer).textContent =  scores[activePlayer]; //Update the UI
  if (scores[activePlayer] >= 20) { // Check if player won the game
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".btn-roll").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add("winner");
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove("active");
  } else {
    nextPlayer();
  }
}

document.querySelector(".btn-hold").addEventListener("click", hold);

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}
