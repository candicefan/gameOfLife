(function() {
  mocha.setup("bdd");
  var assert = chai.assert;

  // testing strategy for updateStates: 
  //    next states wraps aronud: yes, no
  //    number of new states generated: 0, 1, >1
  //    number of old states died: 0, 1, >1

  // testing strategy for currentBoard:
  //    states: all dead, all alive, mixture of dead and alive

  // testing strategy for getState:
  //    state: alive, dead

  // testing strategy for addCell:
  //    state: alive, dead

  // testing stategy for reset: 
  //    board: all dead, all alive, mixture of dead and alive

  describe("GameOfLife", function() {
    describe("getState and addCell", function() {

      // state is alive
      it("alive cell's state should be true, and setting it alive again should not change anything",function(){
        var game = GameOfLife(4,4);
        game.addCell(0,0,true);
        assert.equal(game.getState(0,0),true);

        game.addCell(0,0,true);
        assert.equal(game.getState(0,0),true);
      });

      // state is dead
      it("dead cell's state should be false, and setting it alive should show the cell is alive", function(){
        var game = GameOfLife(4,4);
        assert.equal(game.getState(0,0),false);

        game.addCell(0,0,true);
        assert.equal(game.getState(0,0),true);
      });
    });

    describe("updateStates", function() {

      // next states do not wrap around
      // 0 new state generated
      it("3 horizontal alive states should update to 3 vertical alive states", function() {
        var game = GameOfLife(5,5);
        game.addCell(2,2,true);
        game.addCell(1,2,true);
        game.addCell(3,2,true);
        game.updateStates();
        assert.equal(game.getState(2,2),true);
        assert.equal(game.getState(2,1),true);
        assert.equal(game.getState(2,3),true);
      });

      // next states wrap around
      // 0 new state generated
      it("3 horizontal alive states at the top of the board should wrap around with 1 state showing up on the bottom", function() {
        var game = GameOfLife(5,5);
        game.addCell(1,0,true);
        game.addCell(2,0,true);
        game.addCell(3,0,true);
        game.updateStates();
        assert.equal(game.getState(2,0),true);
        assert.equal(game.getState(2,1),true);
        assert.equal(game.getState(2,4),true);
      });

      // 1 new state generated
      // 0 old state died
      it("3 alive states in L shape, when updated, 1 new state should be generated in the top right corner of the L", function() {
        var game = GameOfLife(4,4);
        game.addCell(0,1,true);
        game.addCell(0,2,true);
        game.addCell(1,2,true);
        game.updateStates();
        assert.equal(game.getState(1,1),true);

        assert.equal(game.getState(0,1),true);
        assert.equal(game.getState(0,2),true);
        assert.equal(game.getState(1,2),true);
      });

      // next states wrap around
      // >1 new states generated
      // 0 old state died
      it("3 new states should be generated, with 2 wrapping around", function() {
        var game = GameOfLife(4,4);
        game.addCell(0,0,true);
        game.addCell(1,0,true);
        game.addCell(0,1,true);
        game.addCell(3,0,true);
        game.updateStates();
        assert.equal(game.getState(0,3),true);
        assert.equal(game.getState(1,1),true);
        assert.equal(game.getState(3,1),true);

        assert.equal(game.getState(1,0),true);
        assert.equal(game.getState(0,0),true);
        assert.equal(game.getState(0,1),true);
        assert.equal(game.getState(3,0),true);
      });

      // 1 old state died
      it("3 alive states in upside down L on the top left corner, and 1 alive state at (2,2) which should be dead after updating", function() {
        var game = GameOfLife(4,4);
        game.addCell(0,0,true);
        game.addCell(1,0,true);
        game.addCell(0,1,true);
        game.addCell(2,2,true);
        game.updateStates();
        assert.equal(game.getState(2,2),false);

        assert.equal(game.getState(1,0),true);
        assert.equal(game.getState(0,0),true);
        assert.equal(game.getState(0,1),true);
      });

      // >1 old state died
      it("3 scattered alive states should both be dead after updating", function() {
        var game = GameOfLife(4,4);
        game.addCell(2,1,true);
        game.addCell(0,3,true);
        game.addCell(2,3,true);
        game.updateStates();
        assert.equal(game.getState(2,1),false);
        assert.equal(game.getState(0,3),false);
        assert.equal(game.getState(2,3),false);
      });
    });

    describe("currentBoard and reset", function() {
      // all dead
      it("All cells are dead, all states should be false and should be reset to all false", function() {
        var game = GameOfLife(4,4);
        var board = game.currentBoard();
        for (i=0;i<4;i++){
          for (j=0;j<4;j++){
            assert.equal(board[j][i],false);
          }
        }

        game.reset();
        for (i=0;i<4;i++){
          for (j=0;j<4;j++){
            assert.equal(game.getState(i,j),false);
          }
        }
      });

      // all alive
      it("All cells are alive, all states should be true and should be reset to all false", function() {
        var game = GameOfLife(4,4);
        for (i=0;i<4;i++){
          for (j=0;j<4;j++){
            game.addCell(i,j,true);
          }
        }
        var board = game.currentBoard();
        for (i=0;i<4;i++){
          for (j=0;j<4;j++){
            assert.equal(board[j][i],true);
          }
        }

        game.reset();
        for (i=0;i<4;i++){
          for (j=0;j<4;j++){
            assert.equal(game.getState(i,j),false);
          }
        }
      });

      // mixture of dead and alive cells
      it("Some cells are alive and some are dead, states should be partly false and true, and should be reset to all false", function() {
        var game = GameOfLife(4,4);
        game.addCell(0,0,true);
        game.addCell(1,0,true);
        game.addCell(2,0,true);
        game.addCell(3,0,true);

        var board = game.currentBoard();
        for (i=0;i<4;i++){
          for (j=0;j<4;j++){
            if (j==0){
              assert.equal(board[j][i],true);
            } else{
              assert.equal(board[j][i],false);
            }
          }
        }

        game.reset();
        for (i=0;i<4;i++){
          for (j=0;j<4;j++){
            assert.equal(game.getState(i,j),false);
          }
        }
      });
    });
  });

  mocha.run();
})()
