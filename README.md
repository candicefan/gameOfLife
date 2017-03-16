Game of Life
=

This is a browser-based version of John Conway's Game of Life, a cellular automaton that simulates the evolution of an organism using a simple deterministic rule.

![alt tag](proj2-xueqifan/game_of_life_example.jpg)

### Concerns and Separation

This assignment is done based on the MVC model layed out in class, modeled after Gradebook example. I have considered include how to apply the rules of the game, the layout of the board, how the user will interact with the game, how the game is displayed, what presets options should the user have. I put application of the rules of the game, updating the states of cells and preset patterns (examples from Wikipedia) in the public interface, gameOfLife.js, which is the Model. Then anything related to user interface, including the layout of the board, how the game is displayed in the View. The View gives user a layout and allows user to choose presets or customize their own game board (sample customization is shown above in the picture). Then I actually make the presets that are given to the user and run the View in the main js program. 

### Dependencies

The Model is gameOfLife.js. The View-Controller is gameOflifeWidget.js. gameOfLife represents a game of life board, with all the cells initialized to dead, user can add live cells and then update accordingly. the gameOfLifeMain.js is where I store the preset boards and run the View. View-Controller displays the game board and buttons with its event handlers. index.html is where everything is displayed. tests are written and can be run with tests.html and tests.css. Dependences are minimized, except when we display the view and let the user start the game, the code in View relies on the updating functions in the Model.

###Functionals

I made a from_to function in gameOfLife.js and used that throughout the process of making and updating the game board.

###Interesting things?

I could add more functions, such as enabling clicks on the board at any time. But I spent more time on the other parts, I wish I could have done that. I also stop any program that's running when anything is clicked, but the way I did it was somewhat stupid, wish I could've improve that.
# gameOfLife
