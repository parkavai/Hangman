let attempts = 9;
let guessedCorrect = 0;
let guessedWrong = 0;

const alphabetBox = document.getElementById("alphabet_box");
const attemptsText = document.getElementById("attempts_text");
const statusText = document.getElementById("status_text");
const guessBox = document.getElementById("guess_box");
const words = ["AWAIT", "HELLO", "SCHOOL"];
const buttons = [];
const chosenWord = words[Math.floor(Math.random() * words.length)]
let array = [];

/**
 * When the window is shown to the user, we want a random word to be chosen in order to 
 * setup the game. 
 */
const game = () =>{
    createButtons();
    fillInUnderscores(chosenWord);
    buttons.forEach(button => button.addEventListener('click', guessWord));
};

const gameOver = (status) =>{
    for (var i = 0; i < buttons.length; i++){
        buttons[i].disabled = true;
    }
    if(status = "win"){
        statusText.innerHTML = "You win!!";
    }
    else{
        statusText.innerHTML = `You Lose, the word was ${chosenWord}`;
    }
}

/**
 * This function sets up the amount of underscores required to represent
 * the amount of letters of the chosen word.
 */
const fillInUnderscores = (word) =>{
    for (var i = 0; i < word.length; i++){
        guess = document.createElement("div");
        guess.classList.add("guess");
        array[i] = guess;
        guessBox.appendChild(guess);
    }
};

/**
 * 
 */
const guessWord = (e) =>{
    letter = e.target.id; 
    e.target.disabled = true;
    for(var i = 0; i < chosenWord.length; i++){
        if(letter == chosenWord[i]){
            fillInnLetter(i, letter);
            console.log("Funnet bokstav: " + letter);
            guessedCorrect += 1;
        }
        else{
            guessedWrong += 1;
        }
        attempts -= 1;
    }
    if(guessedCorrect == chosenWord.length){
        console.log("Vunnet");
        gameOver("win");
    }
};

const fillInnLetter = (index, letter) =>{
    var text = document.createElement("h1");
    text.classList.add("center");
    text.textContent = letter;
    array[index].appendChild(text);
    console.log(array[index])
};

const createButtons = () =>{
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var i = 0; i < alphabet.length; i++){
        var btn = document.createElement("button");
        btn.id = alphabet[i];
        btn.classList.add("alphabet");
        btn.textContent = alphabet[i];
        buttons[i] = btn;
        alphabetBox.appendChild(btn);
    }
};

game();