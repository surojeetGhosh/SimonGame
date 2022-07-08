const userPattern = [];
const buttonColors = ["green", "red", "yellow", "blue"];
const gamePattern = [];
let level = 0;
let started = false;
let gameOver = false;


$(document).keypress(function(){

  if(!started) {

    started = true;
    nextSequence();

    $(".btn").click(function() {

      let colorPressed = $(this).attr("id");

      userPattern.push(colorPressed);
      playSound("sounds/" + colorPressed + ".mp3");

      $("#" + colorPressed).addClass("pressed");

      setTimeout(function(){
        $("#" + colorPressed).removeClass("pressed");
      }, 100);

      checkAnswer(userPattern.length - 1);

    });

  }

});





function nextSequence() {

  level++;
  userPattern.length = 0;
  var randomNumber = Math.floor(Math.random()*4);
  let randomChosenColor = buttonColors[randomNumber];

  $("h1").text("Level " + level);
  gamePattern.push(randomChosenColor);
  playSound("sounds/" + randomChosenColor + ".mp3");
  $("." + randomChosenColor).animate({opacity:0}, 100).animate({opacity: 100}, 100);
}

function playSound(source) {

  let audio = new Audio(source);

  audio.play();

}

function startOver() {
  started = false;
  gamePattern.length = 0;
  level = 0;
}

function checkAnswer(index) {


  if( gamePattern[index] === userPattern[index] ) {
    console.log(index);
    if( userPattern.length === gamePattern.length ) {
      setTimeout(nextSequence, 1000);
    }
  } else {


    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    playSound("sounds/wrong.mp3");
    $("h1").text("Game Over, Press Any Key to Restart");
    $(".btn").off('click');
    startOver();

  }
}
