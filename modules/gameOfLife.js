/**
  * Create a GameOfLife object. 
  * A GameOfLife is a board of size width * length, with width * length number of cells
  * Each cell can be dead or alive, there are a set of rules that determine the next state of the cell
  * @param {int} w, the width of the game board
  * @param {int} l, the length of the game board
  */
var GameOfLife = function(w,l) {
  var that = Object.create(GameOfLife.prototype);

  var width = w;
  var length = l;
  var subsribers = [];

  /*
   * Subscribe to changes to this object.
   * @param subscriber a function that is called whenever the GameOflife is changed
   */
  that.subscribe = function(subsriber) {
    subsribers.push(subsriber);
  }

  var publishChanges = function(){
    var i;
    from_to(0,subsribers.length-1,function(n){subsribers[n]();});
  };

  var from_to = function(from,to,f) {
    if (from > to) return;
    f(from);
    from_to(from+1,to,f);
  };

  // board size: w * l
  // upper left corner: board[0][0]
  // lower right corner: board[l-1][w-1]
  // board[y][x]: x, horizontal axis; y, vertical axis
  var makeBoard = function(w,l){
    false_board = [];
    from_to(1,w,function(i){
      row = [];
      from_to(1,l,function(j){
        row.push(false);
      })
      false_board.push(row);
    });
    return false_board;
  };

  var board = makeBoard(width,length);

  /* 
   * Get a representation of the current board status
   */
  that.currentBoard = function() {
    boardCopy = makeBoard(width,length);
    from_to(0,length-1,function(j){
      from_to(0,width-1,function(i){
        boardCopy[i][j] = board[i][j];
      })
    })
    return boardCopy;
  };

  /* 
   * Get a the state of the cell at (x,y)
   * @param {int, int} (x,y), the location of the cell to be inspected 
   */
  that.getState = function(x,y) {
    return board[y][x];
  };

  /* 
   * Update the cell's state
   * @param {int, int} (x,y), the location of the cell to be changed
   * @param {boolean} state, the new state to be given to the cell
   */
  that.addCell = function(x,y,state){
    board[y][x] = state;
    publishChanges();
  };

  /* 
   * Reset the game board to an empty board (all dead)
   */
  that.reset = function(){
    board = makeBoard(width,length);
    publishChanges();
  };

  var getNumberOfAliveNeighbors = function(x,y){
    var count = 0;
    from_to(y-1,y+1,function(j){
      from_to(x-1,x+1,function(i){
      if (!(i==x && j==y)){
        if (board[(j+length)%length][(i+width)%width]){
          count = count + 1;
        }
      }
    });});
    return count;
  };

  var nextStateChanged = function(x,y){
    var stateChanged = false;
    var neighbors = getNumberOfAliveNeighbors(x,y);
    if (board[y][x] == true){
      if (neighbors < 2){
        stateChanged = true;
      } else if (neighbors > 3){
        stateChanged = true;
      }
    } else{
      if (neighbors == 3){
        stateChanged = true;
      }
    }
    return stateChanged;
  };

  var nextStatesUpdates = function(){
    var boardChanges = makeBoard(width,length);
    from_to(0,length-1,function(j){
      from_to(0,width-1,function(i){
        boardChanges[j][i] = nextStateChanged(i,j);
    });});
    return boardChanges;
  };

  /* 
   * Update the states of all cells in the board to its next generation.
   * Updating rule: 1. Any live cell with fewer than two live neighbors dies
   *                2. Any live cell with two or three live neighbors lives on to the next generation
   *                3. Any live cell with more than there live neighbors dies
   *                4. Any dead cell with exactly three live neighbours becomes a live cell
   * @param {int, int} (x,y), the location of the cell to be changed
   */
  that.updateStates = function(x,y){
    var boardChanges = nextStatesUpdates();
    var newBoard = makeBoard(width,length);
    from_to(0,length-1,function(j){
      from_to(0,width-1,function(i){
      if (boardChanges[j][i]){
        newBoard[j][i] = !board[j][i];
      } else{
        newBoard[j][i] = board[j][i];
      }
    });})
    board = newBoard;
    publishChanges();
  };

  /* 
   * Add a block to the game board
   * @param {int, int} (x,y), the location for top left cell in a block
   */
  that.addBlock = function(x,y){
    that.addCell(x,y,true);
    that.addCell(x+1,y,true);
    that.addCell(x,y+1,true);
    that.addCell(x+1,y+1,true);
  };

  // (x,y) leftmost cell
  /* 
   * Add a block to the game board
   * @param {int, int} (x,y), the location for top left cell in a block
   */
  that.addBeehive = function(x,y){
    that.addCell(x,y,true);
    that.addCell(x+1,y-1,true);
    that.addCell(x+1,y+1,true);
    that.addCell(x+2,y-1,true);
    that.addCell(x+2,y+1,true);
    that.addCell(x+3,y,true);
  };

  // (x,y) leftmost cell
  that.addLoaf = function(x,y){
    that.addCell(x,y,true);
    that.addCell(x+1,y-1,true);
    that.addCell(x+1,y+1,true);
    that.addCell(x+2,y-1,true);
    that.addCell(x+2,y+2,true);
    that.addCell(x+3,y,true);
    that.addCell(x+3,y+1,true);
  };

  // (x,y) top left cell
  that.addBoat = function(x,y){
    that.addCell(x,y,true);
    that.addCell(x,y+1,true);
    that.addCell(x+1,y,true);
    that.addCell(x+1,y+2,true);
    that.addCell(x+2,y+1,true);
  };

  // (x,y) the middle cell of the 3-cell bar, add a vertical bar
  that.addBlinker = function(x,y){
    that.addCell(x,y,true);
    that.addCell(x,y-1,true);
    that.addCell(x,y+1,true);
  };

  // (x,y) leftmost cell when the cells come together
  that.addToad = function(x,y){
    that.addCell(x,y,true);
    that.addCell(x+1,y,true);
    that.addCell(x+1,y-1,true);
    that.addCell(x+2,y,true);
    that.addCell(x+2,y-1,true);
    that.addCell(x+3,y-1,true);
  };

  // (x,y) leftmost cell when it's two squares
  that.addBeacon = function(x,y){
    that.addCell(x,y,true);
    that.addCell(x,y+1,true);
    that.addCell(x+1,y,true);
    that.addCell(x+1,y+1,true);
    that.addCell(x+2,y+2,true);
    that.addCell(x+2,y+3,true);
    that.addCell(x+3,y+2,true);
    that.addCell(x+3,y+3,true);
  };
  // (x,y) top left cell in one permutation
  that.addGlider = function(x,y){
    that.addCell(x,y,true);
    that.addCell(x,y+2,true);
    that.addCell(x+1,y+1,true);
    that.addCell(x+1,y+2,true);
    that.addCell(x+2,y+1,true);
  };

  // (x,y) leftmost cell
  that.addRPentomino = function(x,y){
    that.addCell(x,y,true);
    that.addCell(x+1,y-1,true);
    that.addCell(x+1,y,true);
    that.addCell(x+1,y+1,true);
    that.addCell(x+2,y-1,true);
  };

  // (x,y) top left corner of a n*n square
  that.addRandomCells = function(x,y,n){
    from_to(x,x+n-1,function(i){
      from_to(y,y+n-1,function(j){
       if (Math.random()<0.2){
        that.addCell(i,j,true);
       } 
      })
    });
  };

  Object.freeze(that);
  return that;
};












