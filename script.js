const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let previousHole;
let stopTime = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole === previousHole) {
    return randomHole(holes); //repeat fnx..recursion
  }

  previousHole = hole;
  return hole;
}

function peek() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!stopTime) peek();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  stopTime = false;
  peek();
  setTimeout(() => (stopTime = true), 10000);
}

function bank(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}
moles.forEach((mole) => mole.addEventListener('click', bank));
