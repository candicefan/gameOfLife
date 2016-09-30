$(function() {
	var game_0 = GameOfLife(20,20);

	var game_1 = GameOfLife(20,20);
	game_1.addBlock(2,2);
	game_1.addLoaf(6,7);
	game_1.addBlinker(10,4);
	game_1.addBeacon(0,8);
	game_1.addToad(14,7);
	game_1.addBlinker(17,15);
	game_1.addGlider(10,15);

	var game_2 = GameOfLife(20,20);
	game_2.addToad(3,5);
	game_2.addGlider(10,10);
	game_2.addBlinker(8,6);
	game_2.addRPentomino(15,3);
	game_2.addBlinker(1,13);

	var game_3 = GameOfLife(20,20);
	game_3.addRPentomino(5,5);
	game_3.addBoat(12,10);
	game_3.addBeacon(3,10);
	game_3.addGlider(15,16);
	game_3.addBeacon(13,3);

	var game_4 = GameOfLife(20,20);
	game_4.addGlider(3,3);
	game_4.addRPentomino(9,9);
	game_4.addBlinker(6,9);
	game_4.addBeacon(13,15);
	game_4.addLoaf(6,15);
	game_4.addToad(14,3);

	var game_5 = GameOfLife(20,20);
	game_5.addRandomCells(0,0,20);

	games = [game_0,game_1,game_2,game_3,game_4,game_5];

	GameOfLife_install($("#game"),games);
})