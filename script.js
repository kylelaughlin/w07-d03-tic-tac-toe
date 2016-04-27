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

//Global Variables
var turnSwitch = 0
var board = [["","",""],["","",""],["","",""]]

function selectMove() {
  //Define symbol and write to board
  var symbol = "";
  if(turnSwitch % 2 === 0){
    symbol = "X";
  } else {
    symbol = "O";
  }
  this.innerHTML = symbol;

  //Remove the event listener for that tile
  this.removeEventListener("click", selectMove);

  //Populate array
  switch(this.id) {
    case "tile-1-1":
      board[0][0] = symbol;
      break;
    case "tile-1-2":
      board[0][1] = symbol;
      break;
    case "tile-1-3":
      board[0][2] = symbol;
      break;
    case "tile-2-1":
      board[1][0] = symbol;
      break;
    case "tile-2-2":
      board[1][1] = symbol;
      break;
    case "tile-2-3":
      board[1][2] = symbol;
      break;
    case "tile-3-1":
      board[2][0] = symbol;
      break;
    case "tile-3-2":
      board[2][1] = symbol;
      break;
    case "tile-3-3":
      board[2][2] = symbol;
      break;
  }

  //Check for winner
  var win = false;
  //Check for horizontal winner
  win =     board[0] == [symbol,symbol,symbol] ||
            board[1] == [symbol,symbol,symbol] ||
            board[2] == [symbol,symbol,symbol] ||
            board[0][0] == symbol && board[1][0] == symbol && board[2][0] == symbol ||
            board[0][1] == symbol && board[1][1] == symbol && board[2][1] == symbol ||
            board[0][2] == symbol && board[1][2] == symbol && board[2][2] == symbol ||
            board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol ||
            board[2][0] == symbol && board[1][1] == symbol && board[0][2] == symbol;

  //Tick up
  turnSwitch++;

  //if win show result else prompt for next turn
  if(win){
    //display message based on symbol -- Prompts for new game -
    //we need to increment x or o win total
  }
  if(turnSwitch === 8){
    
  } else {
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
  }


}
