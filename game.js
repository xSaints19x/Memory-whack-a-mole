// Game Variables
var buttonNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var wrong = false;

// Press any key to start
$(document).keypress(function () {
    if (!started) {
        started = true;
        nextSequence();
    } else if (wrong) {
        startOver();
        wrong = false;
    }
});


// Button presses
$(".btn").click(function () {
    if (started && !wrong) {
        var userChosenNumber = $(this).attr("id");
        userClickedPattern.push(userChosenNumber);
        playSound("hammer");
        animatePress(userChosenNumber);
        checkAnswer(userClickedPattern.length - 1);
    }
});

// Triggered upon moving on to another level
function nextSequence() {
    if (started) {
        level++;
        $("#level-title").text("Level " + level);
        if (level === 1) {
            playSound("game-start");
        } else {
            playSound("level-up");
        }

        for (i = 0; i < buttonNumbers.length; i++) {
            $(".bounce").removeClass("bounce");
        }

        var randomNumber = Math.floor(Math.random() * 9);
        var randomChosenNumber = buttonNumbers[randomNumber];
        gamePattern.push(randomChosenNumber);

        $("#" + randomChosenNumber).fadeOut(150).fadeIn(150);
        userClickedPattern = [];
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentNumber) {
    $("#" + currentNumber + " img").addClass("pressed");

    setTimeout(function () {
        $("#" + currentNumber + " img").removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        wrong = true;
        wrongAnswer();
        playSound("game-over");
    }
}

function wrongAnswer() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}

function startOver() {
    $("#level-title").text("Press A Key to Start");
    gamePattern = []
    level = 0;
    started = false;
    for (i = 0; i < buttonNumbers.length; i++) {
        $(".moleImg").addClass("bounce");
    }
}