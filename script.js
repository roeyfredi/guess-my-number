'use strict';

//-----------------Functions start-------------------------//

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}
function displayMessage(className, message) {
  document.querySelector(className).textContent = message;
}
function UpdateInputField(inputName, value) {
  document.querySelector(inputName).value = value;
}
function addEventListenerToButton(className, funcName) {
  document.querySelector(className).addEventListener('click', funcName);
}
function updateCSSstyle(whoToChange, value) {
  document.querySelector(whoToChange).style.prop = value;
}

function PlayAgain() {
  score = 20; //Initialize the variable score to 20
  randomSecretNumber = getRandomInt(20); //Create a new random number

  displayMessage('.score', score);
  displayMessage('.message', 'Start guessing...');
  displayMessage('.number', '?');

  UpdateInputField('input', '');

  //Change CSS style
  document.querySelector('body').style.backgroundColor = '#222';
  //updateCSSstyle('body', 'backgroundColor', '#222');

  document.querySelector('.number').style.width = '15rem';
  //updateCSSstyle('.number', width, '15rem');

  console.log(randomSecretNumber);
  //location.reload();
}
//-----------------Functions end-------------------------//

//-----------------Initialize variables start-------------------------//

let randomSecretNumber = getRandomInt(20); //Get random number between 1-20
let score = 20;
let highScore = 0;

console.log(randomSecretNumber);

//-----------------Initialize variables end-------------------------//

//-----------------Buttons click events start-------------------------//

addEventListenerToButton('.check', checkButtonClick);
addEventListenerToButton('.again', PlayAgain);

//-----------------Buttons click events end-------------------------//

function checkButtonClick() {
  //When we get a input from the user, we get a string value,don't forget to convert string to number
  const guess = Number(document.querySelector('input').value);

  //Option 1:The player didn't enter a number
  if (!guess) {
    displayMessage('.message', '⛔ No number entered');
  }

  //Option 2: The player guess diffrent number from the secret number
  else if (guess !== randomSecretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess < randomSecretNumber ? '📉😖 To low!' : '📈👆 To high!';
      score--;
      displayMessage('.score', score);
    } else {
      score = 0;
      displayMessage('.message', '⛔⛔⛔ Game over! You lost the game!');
      displayMessage('.score', score);
      //
      document.querySelector('body').style.backgroundColor = 'red';
      //
    }
  }

  //When a player win the game
  else if (guess === randomSecretNumber) {
    displayMessage('.message', '✔🎄 Correct number!');
    score--;
    displayMessage('.score', score);
    displayMessage('.number', randomSecretNumber);

    document.querySelector('body').style.backgroundColor = 'green';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      displayMessage('.highscore', highScore);
    }
  }
}
