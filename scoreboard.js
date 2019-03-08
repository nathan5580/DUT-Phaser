var scoreboardState = {
    preload: function() {
        game.load.image('background', './images/background.png');
        game.load.image('retour', './images/retour.png');
    },
    
    create: function() {
        this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        this.x = [-64, -32, 0, 32, 64];
        this.i = 0;
        for(pseudo of scoreboard) {
            var scoreText = game.add.text(game.width/2 + 20, game.height/2 + this.x[this.i], pseudo.pseudo + ':' + pseudo.score, {fill: 'white'});
            scoreText.anchor.setTo(0.5);
            this.i++;
        }
        this.retourButton = game.add.button(game.width/2, game.height/2 + 300, 'retour', function() {
            game.state.start('menu'); 
        });
        this.retourButton.anchor.setTo(0.5);
    },
    
    update: function() {
        this.background.tilePosition.y += 1;
    }
}