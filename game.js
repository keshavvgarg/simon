var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

if(level===0){          // This code executes only for smaller screen only to start the game
  if ($(window).width() < 1024){
  $("#level-title").text("Click Anywhere to Start");}}

if ($(window).width() >= 1024) {    // We are using keys for big screens and click for smaller screens
  $(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
    }
    started = true;
  });

} else {
  $(document).click(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
    }
    started = true;
  });
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    //To Show the Wrong Status
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);

    if ($(window).width() >= 1024){
    $("#level-title").text("Game Over, Press Any Key to Restart");}
    else{
      $("#level-title").text("Game Over, Click to Restart");
    }

    // To Start Over the Game
    setTimeout(function() {
      started = false;
    }, 100);

    level = 0;
    gamePattern = [];
  }
}



$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  if (userClickedPattern.length <= level) { // To check, if the game is up it shouldn't create any sound.
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});


function playSound(key) {

  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();

}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
