// DECLARE VARS
let playerSelection = null;
let computerSelection = null;
let playerScore = [];
let computerScore = [];
let playerScoreTotal = 0;
let computerScoreTotal = 0;
let roundResultAnnouncement = null;

// SELECT ELEMENTS
const buttons = document.querySelectorAll("#rock, #paper, #scissors");
const scoreboard = document.getElementById("scoreboard");
const winAnnouncement = document.getElementById("win-announcement");
const playAgainBtn = document.querySelector("#play-again-btn");

// SET BTN STATE
playAgainBtn.disabled = true;

// DEFINE FNS
function makeScoreboardVisible() {
  scoreboard.classList.remove("hidden");
  scoreboard.classList.add("visible");
}
function makeScoreboardHidden() {
  scoreboard.classList.remove("visible");
  scoreboard.classList.add("hidden");
}
function makeWinAnnouncementHidden() {
  winAnnouncement.classList.remove("visible");
  winAnnouncement.classList.add("hidden");
}
function makeWinAnnouncementVisible() {
  winAnnouncement.classList.remove("hidden");
  winAnnouncement.classList.add("visible");
}

function computerRandomSelect() {
  computerSelection = Math.floor(Math.random() * 3) + 1;

  if (computerSelection === 1) {
    computerSelection = "rock";
  } else if (computerSelection === 2) {
    computerSelection = "paper";
  } else {
    computerSelection = "scissors";
  }
}

function compareSelections() {
  // condition: draw
  if (playerSelection === computerSelection) {
    roundResultAnnouncement = "Draw! Try again";
    playerScore.push(0);
    computerScore.push(0);
  }
  // condition: player chose rock
  else if (playerSelection === "rock" && computerSelection === "scissors") {
    roundResultAnnouncement = "You Win! Rock beats scissors";
    playerScore.push(1);
    computerScore.push(0);
  } else if (playerSelection === "rock" && computerSelection === "paper") {
    roundResultAnnouncement = "You Lose! Paper beats rock";
    playerScore.push(0);
    computerScore.push(1);
  }
  // condition: player chose paper
  else if (playerSelection === "paper" && computerSelection === "rock") {
    roundResultAnnouncement = "You Win! Paper beats rock";
    playerScore.push(1);
    computerScore.push(0);
  } else if (playerSelection === "paper" && computerSelection === "scissors") {
    roundResultAnnouncement = "You Lose! Scissors beats paper";
    playerScore.push(0);
    computerScore.push(1);
  }
  // condition: player chose scissors
  else if (playerSelection === "scissors" && computerSelection === "paper") {
    roundResultAnnouncement = "You Win! Scissors beats paper";
    playerScore.push(1);
    computerScore.push(0);
  } else if (playerSelection === "scissors" && computerSelection === "rock") {
    roundResultAnnouncement = "You Lose! Rock beats scissors";
    playerScore.push(0);
    computerScore.push(1);
  }
  // display each round's selection
  function displayRoundSelection() {
    document.getElementById("player-selection").innerText = playerSelection;
    document.getElementById("computer-selection").innerText = computerSelection;
  }
  // display each round's result
  function displayRoundResult() {
    document.getElementById("round-result").innerText = roundResultAnnouncement;
  }
  displayRoundSelection();
  displayRoundResult();
}

function sumEachPlayerScore() {
  playerScoreTotal = playerScore.reduce((total, amount) => total + amount, 0);
  computerScoreTotal = computerScore.reduce(
    (total, amount) => total + amount,
    0
  );
}

function displayScores() {
  document.getElementById("player-score-total").innerText = playerScoreTotal;
  document.getElementById("computer-score-total").innerText =
    computerScoreTotal;
}

function resetGame() {
  playerScore = [];
  computerScore = [];
  playerScoreTotal = 0;
  computerScoreTotal = 0;
  playerSelection = null;
  computerSelection = null;

  buttons.forEach((button) => {
    button.disabled = false;
  });
  playAgainBtn.disabled = true;

  makeScoreboardHidden();
  makeWinAnnouncementHidden();
  displayScores();
}

function announceWinner() {
  if (playerScoreTotal === 5 || computerScoreTotal === 5) {
    if (playerScoreTotal > computerScoreTotal) {
      document.getElementById("game-winner").innerText = "You won the game 🎉";
    } else {
      document.getElementById("game-winner").innerText =
        "The computer won the game 🤖";
    }

    playAgainBtn.disabled = false;
    buttons.forEach((button) => {
      button.disabled = true;
    });
    makeWinAnnouncementVisible();
    playAgainBtn.addEventListener("click", resetGame);
  }
}

function playGame() {
  computerRandomSelect();
  compareSelections();
  sumEachPlayerScore();
  displayScores();
  announceWinner();
  let roundCount = playerScore.length;
}

buttons.forEach((button) =>
  button.addEventListener("click", () => {
    playerSelection = button.id;
    playGame();
    makeScoreboardVisible();
  })
);

displayScores();
makeScoreboardHidden();
makeWinAnnouncementHidden();
