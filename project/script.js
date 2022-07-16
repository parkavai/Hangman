let attempts = 9;
let guessedCorrect = 0;
let guessedWrong = 0;
let buttons = [];
let array = [];

const alphabetBox = document.getElementById("alphabet_box");
const attemptsText = document.getElementById("attempts_text");
const statusText = document.getElementById("status_text");
const guessBox = document.getElementById("guess_box");
const resetButton = document.getElementById("reset");

/**
 * Returns a random category which is then used to choose the words suited for the 
 * chosen category. 
 */
const getRandomCategory = () =>{
    let clues = new Map([
        [0, "Programming languages"],
        [1, "Colours"],
        [2, "Dishes"],
        [3, "Football teams"]
    ]);
    return clues.get(Math.floor(Math.random() * clues.size));
}

/**
 * Returns the chosen word from the given category
 */
const getRandomWord = (category) =>{

    let categories = new Map([
        ["Programming languages", ["PYTHON", "JAVA", "C", "CSS", "HTML"]],
        ["Colours", ["RED", "BLUE", "YELLOW", "GREEN", "VIOLET"]],
        ["Dishes", ["PIZZA", "SPAGETTI", "HAMBURGER", "SAUSAGES"]],
        ["Football teams", ["CHELSEA", "LIVERPOOL", "BARCELONA", "TOTTENHAM", "EVERTON"]]
    ]);

    let words = categories.get(category);
    return words[Math.floor(Math.random() * words.length)];
}

const chosenCategory = getRandomCategory();
const chosenWord = getRandomWord(chosenCategory);

/**
 * When the window is shown to the user, we want a random word to be chosen in order to 
 * setup the game. Also set the amount of underscores to display to the user, which is based 
 * on the length of the word. 
 */
const game = () =>{
    createButtons();
    addUnderscores(chosenWord);
    buttons.forEach(button => button.addEventListener('click', guessWord));
    resetButton.addEventListener('click', resetGame);
};

const resetGame = () =>{ 
    window.location.reload();
}

/**
 * Creates the buttons with letters from the alphabet which is used for the game.
 */
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

/**
 * This function sets up the amount of underscores required to represent
 * the amount of letters of the chosen word.
 */
 const addUnderscores = (word) =>{
    for (var i = 0; i < word.length; i++){
        guess = document.createElement("div");
        guess.classList.add("guess");
        array[i] = guess;
        guessBox.appendChild(guess);
    }
};

/**
 * Checks which button that was clicked and assures wether or not the letter represented in the button
 * is within the chosen word or not. 
 */
 const guessWord = (e) =>{
    letter = e.target.id.toUpperCase(); 
    e.target.disabled = true;
    isFound = false;
    for(var i = 0; i < chosenWord.length; i++){
        if(letter == chosenWord[i]){
            displayLetter(i, letter);
            isFound = true;
        }
    }
    updateScore(isFound);
};


/**
 * Updates the number of attempts available.
 */
const updateAttempts = () =>{
    attempts -= 1;
    attemptsText.innerHTML = `Attempts left: ${attempts} `;
}

/**
 * Checks if the user has won or not based on the amount of letters which the user 
 * has guessed correct.
 */
 const checkIfWon = () =>{
    if(guessedCorrect == chosenWord.length){
        gameOver("won");
    }
    else if(guessedWrong == 9 || attempts == 0){
        gameOver("lost");
    }
}

const displayHangman = () =>{
    document.getElementById(`hang_${guessedWrong}`).classList.add("black");
}

/**
 * If the letter was indeed found within the word, then the user has guessed correct. Otherwise
 * the user has guessed wrong. At the end, we must ensure wether the user have won or not. 
 */
const updateScore = (letterWasFound) =>{
    if(letterWasFound == true){
        guessedCorrect += 1;
    }
    else{
        guessedWrong += 1;
        displayHangman();
        updateAttempts();
    }
    checkIfWon();
}

/**
 * This function is responsible for ending the game in which every button is disabled and 
 * a status message is given wether the user won or not. 
 */
 const gameOver = (status) =>{
    for (var i = 0; i < buttons.length; i++){
        buttons[i].disabled = true;
    }
    if(status == "win"){
        statusText.innerHTML = "You win!!";
        console.log(status);
    }
    else{
        statusText.innerHTML = `You lose, the word was "${chosenWord}"`;
    }
}

/**
 * If the user clicked on a letter which was in the word, then the letter will be displayed for 
 * the user. 
 */
const displayLetter = (index, letter) =>{
    var text = document.createElement("h1");
    text.classList.add("center");
    text.textContent = letter;
    array[index].appendChild(text);
    console.log(array[index])
};


game();