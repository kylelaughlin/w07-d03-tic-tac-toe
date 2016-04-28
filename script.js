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
  var symbol = playerSymbol();

  //Set the tile to the player's symbol
  this.innerHTML = symbol;

  //Remove the event listener for that tile
  this.removeEventListener("click", selectMove);

  //Sets the symbol to red or green
  symbolColor(symbol, this);

  //Populate array
  populateArray(this, symbol);

  //Tick up turnSwither
  turnSwitch++;

  //Check for winner
  var win = false;
  win = checkForWinner(symbol);

  //if win show result else prompt for next turn
  if(win){
    //Remove the player X and player O ready message
    hideXReady();
    hideOReady();
    //Add Winner message
    addWinnerMessage(symbol);
    //Remove Event listeners on all tiles
    removeTileListeners();
  } else if(move === 8) {
    //Display tie message and remove whose turn it is
    var tieMessage = document.getElementById("tie-game");
    addClass(tieMessage, "visible");
    removeClass(tieMessage, "hidden");
    hideXReady();
    hideOReady();
  } else {
    //Display who's turn it is.
    playerToggle();
  }

  //Increment the number of moves by 1
  move++;
}

//Sets the current players symbol
//Returns a string representing the players symbol, 'X' or 'O'
function playerSymbol(){
  if(turnSwitch % 2 === 0){
    symbol = "X";
  } else {
    symbol = "O";
  }
  return symbol
}

//Adds class to change X to red or O to green
function symbolColor(symbol, tile){
  if(symbol === "X"){
    tile.classList.add("place-x");
  } else {
    tile.classList.add("place-o");
  };
};

//Populate array with the appropriate symbol
function populateArray(tile, symbol){
  switch(tile.id) {
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
  };
};

//Check each combination of paths for a winning set
// +symbol: a string representing "X" or "O"
//Returns a boolean representing if there is a winner or not
function checkForWinner(symbol) {
  win = board[0][0] === symbol && board[0][1] === symbol && board[0][2] === symbol || //first row
        board[1][0] === symbol && board[1][1] === symbol && board[1][2] === symbol || //second row
        board[2][0] === symbol && board[2][1] === symbol && board[2][2] === symbol || //third row
        board[0][0] === symbol && board[1][0] === symbol && board[2][0] === symbol || //first column
        board[0][1] === symbol && board[1][1] === symbol && board[2][1] === symbol || //second column
        board[0][2] === symbol && board[1][2] === symbol && board[2][2] === symbol || //third column
        board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol || // 1st diagnol
        board[2][0] === symbol && board[1][1] === symbol && board[0][2] === symbol;   // 2nd diagnol
  return win;
};

//Hide the div with class name of 'player-x-ready'
function hideXReady(){
  var xReady = document.getElementById("player-x-ready");
  removeClass(xReady, "visible");
  addClass(xReady, "hidden");
};

//Hide the div with class name of 'player-o-ready'
function hideOReady(){
  var oReady = document.getElementById("player-o-ready");
  removeClass(oReady, "visible");
  addClass(oReady, "hidden");
};

//Show the div with the class name of 'player-x-ready'
function showXReady(){
  var xReady = document.getElementById("player-x-ready");
  addClass(xReady, "visible");
  removeClass(xReady, "hidden");
};

//Show the div with the class name of 'player-o-ready'
function showOReady(){
  var oReady = document.getElementById("player-o-ready");
  addClass(oReady, "visible");
  removeClass(oReady, "hidden");
};

function playerToggle(){
  if(turnSwitch % 2 === 0){
    showXReady();
    hideOReady();
  } else {
    showOReady();
    hideXReady();
  };
}

//Facilitates a winning messages
// +symbol: a string representing 'X' or 'O'
function addWinnerMessage(symbol){
  if(symbol === "X"){
    xWinsMessage();
    xScoreUp();
  } else {
    oWinsMessage();
    oScoreUp();
  };
};

//Makes visible the div which displays x wins message
function xWinsMessage(){
  var xWin = document.getElementById("player-x-wins");
  removeClass(xWin, "hidden");
  addClass(xWin, "visible");
};

//Makes visible the div which displays o wins message
function oWinsMessage(){
  var oWin = document.getElementById("player-o-wins");
  removeClass(oWin, "hidden");
  addClass(oWin, "visible");
};

//Displays player x's new score
function xScoreUp(){
  //Increment X player wins by 1
  xPlayerWins++
  //Display x player wins in html
  var xScore = document.getElementById("x-score");
  xScore.innerHTML = xPlayerWins;
}

//Displays player o's new score
function oScoreUp(){
  //Increment O player wins by 1
  oPlayerWins++
  //Display 0 player wins in html
  var oScore = document.getElementById("o-score");
  oScore.innerHTML = oPlayerWins;
}

//Remove Event listeners on all tiles
function removeTileListeners(){
  var tiles = document.getElementsByClassName("board-tile");
  for(var i = 0; i < tiles.length; i++){
    tiles[i].removeEventListener("click", selectMove);
  };
};

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

  //Clear tile font-colors
  var tiles = document.getElementsByClassName("board-tile");
  for(var i = 0; i < tiles.length; i++){
    tiles[i].classList.remove("place-x");
    tiles[i].classList.remove("place-o");
  };

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
