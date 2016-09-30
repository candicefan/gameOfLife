/**
  * Install a GameOfLifeWidget in the sepcified DOM container.
  * A GameOfLifeWidget is a user interface for editing GameOfLife data.
  *
  * @param domContainer, a jQuery wrapper around a sinle empty div element to install the GameOfLifeWidget in
  * @param {array<GameOfLife>} games, a list of GameOfLife, a GameOfLife object is to be used as a model for
  *									  the data being displayed and edited by this GameOfLifeWidget
  */
var GameOfLifeWidget_install = function(domContainer,games){
	var game = games[0];
	var startButton = $("<button>",{text:"Start", class: "operation"});
	var pauseButton = $("<button>",{text:"Pause", class: "operation"});
	var customize = $("<button>",{text:"Customize Your Game", class: "operation"});
	domContainer.append(startButton);
	domContainer.append(pauseButton);
	domContainer.append(customize);

	var tableElm = $("<table>");
	var board = game.currentBoard();
	$.each(board, function(y,row){
		var rowElm = $("<tr>");
		$.each(row, function(x,cell){
			if (game.getState(x,y)){
				rowElm.append($("<td>",{class: "alive"}));
			} else{
				rowElm.append($("<td>",{class: "dead"}));
			}
		});
		tableElm.append(rowElm);
	});
	domContainer.append(tableElm);

	var rebuild_table = function() {
		var newTableElm = $("<table class='GameView'>");
		var newBoard = game.currentBoard();
		$.each(newBoard,function(y,newRow){
			var newRowElm = $("<tr>");
			$.each(newRow, function(x,cell){
				if (game.getState(x,y)){
					newRowElm.append($("<td>",{class: "alive"}));
				} else{
					newRowElm.append($("<td>",{class: "dead"}));
				}
			});
			newTableElm.append(newRowElm);
		});
		tableElm.replaceWith(newTableElm);
		tableElm = newTableElm;
	};

	var preset1 = $("<button>",{text:"Preset 1", class: "presets"});
	var preset2 = $("<button>",{text:"Preset 2", class: "presets"});
	var preset3 = $("<button>",{text:"Preset 3", class: "presets"});
	var preset4 = $("<button>",{text:"Preset 4", class: "presets"});
	var random = $("<button>",{text:"Random", class: "presets"});
	domContainer.append(preset1);
	domContainer.append(preset2);
	domContainer.append(preset3);
	domContainer.append(preset4);
	domContainer.append(random);

	var update = function() {
		game.updateStates();
		rebuild_table();
	}

	// initialize started to some random number between 0 and 1, not a valid ID
	var started = Math.random();
	var running = false;

	startButton.click(function(){
		if (!running){
			started = window.setInterval(update,100);
			running = true
		}
	});

	pauseButton.click(function(){
		if (started) {
			window.clearInterval(started);
			running = false;
		}
	});

	// Cutomization of the board should only happen when the customize button is clicked
	// Once a cell is clicked and deemed alive, its state cannot be reversed during current customization
	customize.click(function(){
		window.clearInterval(started);
		running = false;
		game = GameOfLife(20,20);
		var customizeTableElm = $("<table>");
		var board = game.currentBoard();
		$.each(board, function(y,row){
			var customizeRowElm = $("<tr>");
			$.each(row, function(x,cell){
				var customizeColElm = $("<td>",{class: "dead"});
				customizeColElm.attr("x",x);
				customizeColElm.attr("y",y);
				customizeRowElm.append(customizeColElm);
				customizeColElm.click(function(){
					$(this).css('background-color','black');
					game.addCell($(this).attr("x"),$(this).attr("y"),true);
				});
			});
			customizeTableElm.append(customizeRowElm);
		});
		tableElm.replaceWith(customizeTableElm);
		tableElm = customizeTableElm;
	});

	preset1.click(function(){
		window.clearInterval(started);
		running = false;
		game = games[1];
		rebuild_table();
	});

	preset2.click(function(){
		window.clearInterval(started);
		running = false;
		game = games[2];
		rebuild_table();
	});

	preset3.click(function(){
		window.clearInterval(started);
		running = false;
		game = games[3];
		rebuild_table();
	});

	preset4.click(function(){
		window.clearInterval(started);
		running = false;
		game = games[4];
		rebuild_table();
	});

	random.click(function(){
		window.clearInterval(started);
		running = false;
		game = games[5];
		rebuild_table();
	});

	game.subscribe(function() {
		rebuild_table();
	});
};