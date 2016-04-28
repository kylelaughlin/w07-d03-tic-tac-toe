window.addEventListener("load", setUpPage);

function setUpPage () {
  //Initialize event listeners for board tiles
  var elements = document.getElementsByClassName("board-tile");
  for(var i = 0; i < elements.length; i++){
    elements[i].addEventListener("click", selectMove);
  };

  //Initiate event listeners for new game prompt
  var elements = document.getElementsByClassName("new-game");
  for(var i = 0; i < elements.length; i++){
    elements[i].addEventListener("click", newGame);
  };
};



function addClass(element, className){
  element.classList.add(className);
}

function removeClass(element, className){
  element.classList.remove(className);
}

//Variables to be reset upon Game reset
var xPlayerWins = 0
var oPlayerWins = 0
var turnSwitch = 0

//Variables to be reset upon new game
var board = [["","",""],["","",""],["","",""]]
var move = 0

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

  if(symbol === "X"){
    this.classList.add("place-x");
  } else {
    this.classList.add("place-o");
  }

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
  win =     board[0][0] === symbol && board[0][1] === symbol && board[0][2] === symbol || //first row
            board[1][0] === symbol && board[1][1] === symbol && board[1][2] === symbol || //second row
            board[2][0] === symbol && board[2][1] === symbol && board[2][2] === symbol || //third row
            board[0][0] === symbol && board[1][0] === symbol && board[2][0] === symbol || //first column
            board[0][1] === symbol && board[1][1] === symbol && board[2][1] === symbol || //second column
            board[0][2] === symbol && board[1][2] === symbol && board[2][2] === symbol || //third column
            board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol || // 1st diagnol
            board[2][0] === symbol && board[1][1] === symbol && board[0][2] === symbol;   // 2nd diagnol
  //Tick up turnSwither
  turnSwitch++;

  //if win show result else prompt for next turn
  if(win){
    //Remove the X or O ready message
    if(symbol === "X"){
      var xReady = document.getElementById("player-x-ready");
      removeClass(xReady, "visible");
      addClass(xReady, "hidden");
    } else {
      var oReady = document.getElementById("player-o-ready");
      removeClass(oReady, "visible");
      addClass(oReady, "hidden");
    }
    //Add Winner message
    if(symbol === "X"){
      var xWin = document.getElementById("player-x-wins");
      removeClass(xWin, "hidden");
      addClass(xWin, "visible");
      //Increment X player wins by 1
      xPlayerWins++
      //Display x player wins in html
      var xScore = document.getElementById("x-score");
      xScore.innerHTML = xPlayerWins;
    } else {
      var oWin = document.getElementById("player-o-wins");
      removeClass(oWin, "hidden");
      addClass(oWin, "visible");
      //Increment O player wins by 1
      oPlayerWins++
      //Display 0 player wins in html
      var oScore = document.getElementById("o-score");
      oScore.innerHTML = oPlayerWins;
    }

    //Remove Event listeners
    var tiles = document.getElementsByClassName("board-tile");
    for(var i = 0; i < tiles.length; i++){
      tiles[i].removeEventListener("click", selectMove);
    };
  } else if(move === 8) {
    //Display tie message and remove whose turn it is
    var tieMessage = document.getElementById("tie-game");
    addClass(tieMessage, "visible");
    removeClass(tieMessage, "hidden");
    var xReady = document.getElementById("player-x-ready");
    removeClass(xReady, "visible");
    addClass(xReady, "hidden");
    var oReady = document.getElementById("player-o-ready");
    removeClass(oReady, "visible");
    addClass(oReady, "hidden");
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
  move++;
}

function playerToggle(turnSwitch){
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

//Initiate a new game - maintain scores and turnSwitch
function newGame() {
  //reset board and move variables to game start state
  board = [["","",""],["","",""],["","",""]]
  move = 0

  //Clear board to game start state
  var tile = document.getElementById("tile-1-1");
  tile.innerHTML = "";
  var tile = document.getElementById("tile-1-2");
  tile.innerHTML = "";
  var tile = document.getElementById("tile-1-3");
  tile.innerHTML = "";
  var tile = document.getElementById("tile-2-1");
  tile.innerHTML = "";
  var tile = document.getElementById("tile-2-2");
  tile.innerHTML = "";
  var tile = document.getElementById("tile-2-3");
  tile.innerHTML = "";
  var tile = document.getElementById("tile-3-1");
  tile.innerHTML = "";
  var tile = document.getElementById("tile-3-2");
  tile.innerHTML = "";
  var tile = document.getElementById("tile-3-3");
  tile.innerHTML = "";


  //Run Setup Page to reinstantiate event listeners
  setUpPage();

  //Remove winner or tie game message
  var tieMessage = document.getElementById("tie-game");
  addClass(tieMessage, "hidden");
  removeClass(tieMessage, "visible");
  var xWin = document.getElementById("player-x-wins");
  removeClass(xWin, "visible");
  addClass(xWin, "hidden");
  var oWin = document.getElementById("player-o-wins");
  removeClass(oWin, "visible");
  addClass(oWin, "hidden");

  //Display a player to move -This is repeat code
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
