const keyboard = document.querySelector('.keyboard');
const wordDislpay = document.querySelector(".word-disply");
const guessedText = document.querySelector('.gusse-text b');
const hangManImage = document.querySelector('.hangman img');
const playAgain = document.querySelector('.play-again');
const gameModel = document.querySelector(".game-model");

let currentWord, countWorngAnswers, correctLetters;
const maxAnswers = 6;

//reset Game
const resetGame = () => {
    countWorngAnswers = 0;
    correctLetters = [];
    guessedText.innerText = `${countWorngAnswers} / ${maxAnswers}`;
    hangManImage.src = `images/hangman-${countWorngAnswers}.svg`;
    keyboard.querySelectorAll('button').forEach(btn => btn.disabled = false);
    wordDislpay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");

}

//Create keyboard with js
for (let i = 97; i <= 122; ++i) {
    const button = document.createElement("button");
    //convert from ASCII to chars

    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);

    button.addEventListener("click", e => checkedLetter(e.target, String.fromCharCode(i)));
}



//getting Random words and hinst from another file as(Obj)
const getRandomWords = () => {
    const { word, hint } = WordsList[Math.floor(Math.random() * WordsList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".text-hint b").innerText = hint;
    resetGame();
    //Create li(dashed) with Lenght of word
    wordDislpay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}
getRandomWords();

const checkedLetter = (button, clickLetter) => {
    if (currentWord.includes(clickLetter)) {
        //Make array of letters from currentWord and checked it
        [...currentWord].forEach((letter, index) => {
            if (letter === clickLetter) {
                correctLetters.push(letter);
                wordDislpay.querySelectorAll('li')[index].innerText = letter;
                wordDislpay.querySelectorAll('li')[index].classList.add('guessed');
            }
        })
    }
    else {
        countWorngAnswers++;
        hangManImage.src = `images/hangman-${countWorngAnswers}.svg`;
    }
    button.disabled = true;
    guessedText.innerText = `${countWorngAnswers} / ${maxAnswers}`;
    if (countWorngAnswers === maxAnswers) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

//check if true word or not
const gameOver = (isOver) => {
    setTimeout(() => {
        if (isOver === true) {
            gameModel.querySelector('img').src = `images/victory.gif`;
            gameModel.querySelector('p').innerHTML = `You found the word : <b>${currentWord}</b>`;
            gameModel.querySelector('h4').innerText = 'Congartulation!';
        }
        else {
            gameModel.querySelector('img').src = `images/lost.gif`;
            gameModel.querySelector('p').innerHTML = `The correct word was : <b>${currentWord}</b>`;
            gameModel.querySelector('h4').innerText = 'Game Over!';
        }
        gameModel.classList.add("show");
    }, 100);
}
playAgain.addEventListener("click", getRandomWords);
