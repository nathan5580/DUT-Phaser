introState = {
    preload: function() {
        game.load.image('background', './images/background.png');
        game.load.image('titre', './images/titre.png');
    },
    
    create: function() {
        this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        
        this.titre = game.add.sprite(game.width/2, game.height - 400, 'titre');
        this.titre.anchor.setTo(0.5);
        this.titre.width = 512;
        this.titre.height = 256;
        
        game.time.events.add(Phaser.Timer.SECOND * 2, function() {
            game.state.start('menu');
        }, this);
    },
    
    update: function() {
        this.background.tilePosition.y += 1;
    }
}