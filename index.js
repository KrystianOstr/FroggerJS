const container = document.querySelector(".container");
const scoreElement = document.querySelector(".score");
const timerElement = document.querySelector(".timer");
const startButton = document.querySelector(".start");
const restartButton = document.querySelector(".restart");
const easyButton = document.querySelector(".easy");
const mediumButton = document.querySelector(".medium");
const hardButton = document.querySelector(".hard");
const gameArea = document.querySelector(".game-area");
const frogCharacter = document.querySelector(".frog");
const difficulty = document.querySelector(".difficulty");
const gameMat = document.querySelector(".game-mat");
const scoreBox = document.querySelector(".score-box");

let scoreCounter = 0;
let timeCounter = 0;
let startInterval = null;
let startGameInterval = null;

let frogSpeed = 30;
const goal = createEndingPoint();

const frogSprites = [
  `url("./images/frogTop.png")`,
  `url("./images/frogBottom.png")`,
  `url("./images/frogLeft.png")`,
  `url("./images/frogRight.png")`,
  `url("./images/bloodStain.png")`,
  `url("./images/greenStain.png")`,
];

let frogY = 0;
let frogX = 230;
frogCharacter.style.left = `${frogX}px`;
frogCharacter.style.bottom = `${frogY}px`;

function rect(hero) {
  return hero.getBoundingClientRect();
}

function gameLoop() {
  checkIfFrogReachedGoal(goal, frogCharacter);
}

function createEnemy(enemyPositionX, enemyPositionY, setSide = "left") {
  const enemy = document.createElement("div");
  let enemyPosition = enemyPositionX;

  setSide === "left"
    ? (enemy.style.left = `${enemyPosition}px`)
    : (enemy.style.right = `${enemyPosition}px`);

  enemy.style.top = enemyPositionY;
  enemy.classList.add("car");

  gameArea.appendChild(enemy);

  let enemyInterval = setInterval(() => {
    enemyPosition += 30;
    setSide === "left"
      ? (enemy.style.left = `${enemyPosition}px`)
      : (enemy.style.right = `${enemyPosition}px`);

    checkCollision(enemy, frogCharacter);

    if (enemyPosition > 500) {
      clearInterval(enemyInterval);
      enemy.remove();
    }
  }, 200);
}

// createEnemy(-120, "30%", "left");
// createEnemy(-180, "55%", "right");
const gameLoopInterval = setInterval(gameLoop, 60);

function startGame() {
  startButton.disabled = true;
  createEndingPoint();

  startGameInterval = setInterval(() => {
    createEnemy(-120, "30%", "left");
    createEnemy(-180, "55%", "right");
  }, 1800);

  document.addEventListener("keydown", (e) => moveFrog(e)); // UNCOMMENT AFTER TESTS

  startInterval = setInterval(() => {
    timeCounter += 1;
    timerElement.textContent = timeCounter;
  }, 1000);
}

function restartGame() {
  document.location.reload();
}

function endGame() {
  clearInterval(startInterval);
  alert("You lose.");
  restartGame();
}

function winTheGame() {
  clearInterval(startInterval);
  alert("Frog is safe!");
  restartGame();
}

function checkCollision(enemy, frog) {
  const enemyRect = rect(enemy);
  const frogRect = rect(frog);

  if (
    enemyRect.right > frogRect.left &&
    enemyRect.left < frogRect.right &&
    enemyRect.top < frogRect.bottom &&
    enemyRect.bottom > frogRect.top
  ) {
    frogCharacter.style.backgroundImage = frogSprites[5];
    setTimeout(endGame, 1000);
    return true;
  }
}

function checkIfFrogReachedGoal(goal, frog) {
  const frogRect = rect(frog);
  const goalRect = rect(goal);

  if (
    frogRect.top < goalRect.bottom &&
    frogRect.bottom > goalRect.top &&
    frogRect.left < goalRect.right &&
    frogRect.right > goalRect.left
  ) {
    winTheGame();
    return true;
  }
  return false;
}

function createEndingPoint() {
  const endingPoint = document.createElement("div");
  endingPoint.classList.add("endingPoint");

  gameArea.appendChild(endingPoint);

  return endingPoint;
}

function moveFrog(e) {
  if (e.key === "ArrowLeft" && frogX >= frogSpeed) {
    frogX -= frogSpeed;
    frogCharacter.style.backgroundImage = frogSprites[2];
    frogCharacter.style.left = `${frogX}px`;
  }

  if (e.key === "ArrowRight" && frogX <= 440) {
    frogX += frogSpeed;

    frogCharacter.style.backgroundImage = frogSprites[3];
    frogCharacter.style.left = `${frogX}px`;
  }

  if (e.key === "ArrowUp" && frogY < 441) {
    frogY += frogSpeed;
    frogCharacter.style.backgroundImage = frogSprites[0];
    frogCharacter.style.bottom = `${frogY}px`;
  }

  if (e.key === "ArrowDown" && frogY > 9) {
    frogY -= frogSpeed;
    frogCharacter.style.backgroundImage = frogSprites[1];
    frogCharacter.style.bottom = `${frogY}px`;
  }
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
// document.addEventListener("keydown", (e) => moveFrog(e)); //DELETE AFTER TEST

easyButton.addEventListener("click", () => {
  difficulty.classList.add("hidden");
  gameMat.classList.remove("hidden");
});
