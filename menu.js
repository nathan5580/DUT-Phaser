var menuState = {
    background: undefined,
    playButton: undefined,
    languageButton: undefined,
    categoryButton: undefined,
    scoresButton: undefined,
    
    preload: function() {
        game.load.image('background', './images/background.png');
        game.load.image('scores', './images/scores.png');
        game.load.image('play', './images/play.png');
        game.load.image('languages', './images/language.png');
        game.load.image('categories', './images/categories.png');
        game.load.spritesheet('mute', './images/sound.png', 32, 32);
        game.load.audio('backgroundSound', ['./sons/main_theme.mp3', './sons/main_theme.ogg']);
    },
    
    create: function() {
        this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        this.backSound = game.add.audio('backgroundSound');
        if(soundActive) {
            this.backSound.play();
        }
        
        this.playButton = game.add.button(game.width/2, game.height/2 - 300, 'play', function() {
            game.state.start('mot');
        });
        this.playButton.width = 256;
        this.playButton.height = 128;
        this.playButton.anchor.setTo(0.5);
        
        this.languageButton = game.add.button(game.width/2, game.height/2 - 100, 'languages', function() {
            game.state.start('languages');
        });
        this.languageButton.width = 256;
        this.languageButton.height = 128;
        this.languageButton.anchor.setTo(0.5);
        
        this.categoryButton = game.add.button(game.width/2, game.height/2 + 100, 'categories', function() {
            game.state.start('categories');
        });
        this.categoryButton.width = 256;
        this.categoryButton.height = 128;
        this.categoryButton.anchor.setTo(0.5);
        
        this.scoresButton = game.add.button(game.width/2, game.height/2 + 300, 'scores', function() {
            game.state.start('scoreboard');
        });
        this.scoresButton.width = 256;
        this.scoresButton.height = 128;
        this.scoresButton.anchor.setTo(0.5);
        
        this.muteButton = game.add.button(550, 750, 'mute', function() {
           soundActive = !soundActive; 
           if(soundActive) {
               this.play('mute');
               menuState.backSound.play();
           } else {
               this.play('unmute');
               menuState.backSound.pause();
           }
        });
        this.muteButton.width = 64;
        this.muteButton.height = 64;
        this.muteButton.animations.add('mute', [0]);
        this.muteButton.animations.add('unmute', [1]);
    },
    
    update: function() {
        this.background.tilePosition.y += 1;
    }
}