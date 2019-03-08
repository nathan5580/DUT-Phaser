var game = new Phaser.Game(600, 800, Phaser.AUTO);
game.state.add('intro', introState);
game.state.add('menu', menuState);
game.state.add('jeu', jeuState);
game.state.add('deathScreen', deathState);
game.state.add('languages', languagesState);
game.state.add('categories', categoriesState);
game.state.add('scoreboard', scoreboardState);
game.state.add('mot', motState);

game.state.start('intro');