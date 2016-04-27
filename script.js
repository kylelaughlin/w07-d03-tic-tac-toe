window.addEventListener("load", setUpPage);

function setUpPage () {

  // initialize whatever variables you need and add your event listeners
  // you can (but probably shouldn't) define functions inside this function

  var elements = document.getElementsByClassName("board-tile");
  for(var i = 0; i < elements.length; i++){
    elements[i].addEventListener("click", selectMove);
  };
};

function addClass(element, className){
  element.classList.add(className);
}

function removeClass(element, className){
  element.classList.remove(className);
}

var turnSwitch = 0

function play(){

  alert("play entered");

  //Display who's turn it is.  Even = x  Odd = o
  if(turnSwitch % 2 === 0){
    var xReady = document.getElementById("player-x-ready");
    addClass(xReady, "visible");
    removeClass(xReady, "hidden");
    var oIdle = document.getElementById("player-o-ready");
    addClass(oIdle, "hidden");
    removeClass(oIdle, "visible");
  } else {
    var oReady = document.getElementById("player-o-ready");
    addClass(oReady, "visible");
    removeClass(oReady, "hidden");
    var xIdle = document.getElementById("player-x-ready");
    addClass(xIdle, "hidden");
    removeClass(xIdle, "visible");
  };

  turnSwitch++;

}

function selectMove(){

}
