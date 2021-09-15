var buttoncolors=["red","blue","green","yellow"];
var gamepattern=[];
var userclickedpattern=[];
var started=false;
var level =0;



$(document).on("keypress",function(){
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});



$(".btn").on("click",function(){
  var userChosenColour=$(this).attr("id");
  userclickedpattern.push(userChosenColour);
playsound(userChosenColour);
animatePress(userChosenColour);
checkanswer(userclickedpattern.length-1);
});


function checkanswer(currentlevel){

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamepattern[currentlevel] === userclickedpattern[currentlevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userclickedpattern.length === gamepattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextsequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playsound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startover();



}
}



function nextsequence(){

  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  var random_number=Math.random();
  random_number=Math.floor(random_number*4);

var randomchosencolor=buttoncolors[random_number];
gamepattern.push(randomchosencolor);


$("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
playsound(randomchosencolor);

}



function playsound(name){
  var audio =new Audio("sounds/"+name+".mp3");
  audio.play();

}



function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function(){
  $("#"+currentColor).removeClass("pressed");
},100);
}



function startover(){
  level=0;
  gamepattern=[];
  started=false;

}
