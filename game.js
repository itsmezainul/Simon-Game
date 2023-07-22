let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;


// sequence order of the game
function nextSequence() {
    level++;
    document.querySelector("h1").innerHTML = `Level ${level}`;

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animate(randomChosenColour);
    playSound(randomChosenColour);
};

//Play sounds for buttons
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

//Flashing Button when random colour generate
function animate(name) {
    document.querySelector("#"+name).classList.add("fadeOut");
    setTimeout(() => {
        document.querySelector("#"+name).classList.remove("fadeOut");
    }, 100);
};

//handle the button clicks and push the id  to userClickPatter
function handler(name) {
    playSound(name);
    userClickedPattern.push(name);
};

//click effect
function animatePress(currentColour) {
    document.querySelector("#"+currentColour).classList.add("pressed");
    setTimeout(() => {
        document.querySelector("#"+currentColour).classList.remove("pressed");
    }, 100);
};

// check user input answer
function checkAnswer(currentlevel) {
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }; 
    } else {
        gameOver();  
    };
};

//when user enter wrong this function kill the game and restart 
function gameOver() {
    document.body.classList.add("game-over");
    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 200);
    playSound("wrong");
    document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
    startOver();
};

// event listener for detecting keypress
document.addEventListener("keydown", () => {
    if (!started) {
        nextSequence();
        started = true;
    };
});

//eventlistener for user click buttons 
for (let i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", (event) => {
        handler(event.target.id);
        animatePress(event.target.id);
        checkAnswer(userClickedPattern.length-1);
    });
};

//restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
};