var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

// If any key pressed start the game and can be pressed only one time until game is over
$(document).keydown(function() {
  if (start === false) {
    $("h1").text("Level " +level);
    nextSequence();
    start = true;
  }
});


// Button clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");    // this.id (without using jQuery)
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {

  userClickedPattern =[];

  level++;
  $("h1").text("Level " +level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


// Sound
function playSound(name) {
  var audio = new Audio("sounds/" +name+ ".mp3");
  audio.play();
}


// Flash the button when pressed
function animatePress(currentColour) {
    $("#" +currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" +currentColour).removeClass("pressed");
    },100);
}


// Checks user's ans against the game sequence
// In 1st if statement the last element in the seq is checked n not the whole array
// In 2nd length is compared
// Whenever button is click checkAnswer() is called so only one element is compared at a time
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
         nextSequence();
      },1000);
    }

  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
