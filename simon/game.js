var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

var replay = 0;

$(document).on("keypress", function() {
    gameStart();
})

function gameStart() {
    if (!started) {
        nextSequence();
        started = true;
       }
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    buttonPressed(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
})

function nextSequence() {

    userClickedPattern = [];

    level++;
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("h1").html("Level " + level);

    showOrder();
}

function showOrder() {
    setTimeout(function() {
        buttonPressed(gamePattern[replay]);
        playSound(gamePattern[replay]);
        replay++;
        if ( replay < gamePattern.length) {
            showOrder();
        }
        else {
            replay = 0;
        }
    }, 500)
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function buttonPressed(pressed) {
    $("#" + pressed).toggleClass("pressed");

    setTimeout(function() {
        $("#" + pressed).toggleClass("pressed"); }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();}, 1000);
            }
        }
    else {
        gameOver();
    }
}

function gameOver() {
    $("body").toggleClass("game-over");
    setTimeout(function(){
        $("body").toggleClass("game-over"); }, 200);
    $("h1").html("Game Over, press Any key to restart");
    playSound("wrong");
    startOver();
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}