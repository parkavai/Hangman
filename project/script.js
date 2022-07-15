let attempts = 9

const attemptsText = document.getElementById("attempts_txt")
const guessBox = document.getElementById("guess_box");
const words = ["AWAIT", "HELLO", "SCHOOL"];
console.log(attemptsText);
var array = []

/**
 * When the window is shown to the user, we want a random word to be chosen in order to 
 * setup the game. 
 */
const start = () =>{
    let index = Math.floor(Math.random() * words.length);
    const chosenWord = words[index];
    fillInUnderscores(chosenWord);
}

/**
 * This function sets up the amount of underscores required to represent
 * the amount of letters of the chosen word.
 */
const fillInUnderscores = (word) =>{
    for (var i = 0; i < word.length; i++){
        guess = document.createElement("h1");
        guess.appendChild(document.createTextNode("_"));
        guess.classList.add("guess");
        array[i] = guess;
        guessBox.appendChild(guess);
    }
}

start();