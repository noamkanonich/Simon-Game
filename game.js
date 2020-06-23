
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var score = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  updateScores();
  level = 0;
  gamePattern = [];
  started = false;
}

function updateScores(){
  if (level > score) {
    $("h2").text(level);
    score = level;  
  }
  else {
    $("h2").text(score);
  }
}

$(".reset").click(function() {
  score = 0;
  level = 0;
  $("h2").text(0);
  updateScores();
})


$(".myScore").click(function() {
  smartLevel(score);
})


function smartLevel(myScore){
  var myText = "";
  if(myScore == 0) {
    myText = "Loser";
  }
  else if (myScore > 0 && myScore < 5) {
    myText = "You can do better";
  }
  else if(myScore > 4 && myScore < 10) {
    myText = "Your fine, keep going";
  }
  else if(myScore > 9 && myScore < 15) {
    myText = "I can see the potential";
  }

  $("h3").text(myText);
  setTimeout(function () {
    $("h3").text("");
  }, 3000);
}