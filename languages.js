
languagesState = {
    
    preload: function() {
        game.load.image('background', './images/background.png');
        game.load.image('frFlag', './images/frFlag.png');
        game.load.image('enFlag', './images/enFlag.png');
        game.load.image('deFlag', './images/deFlag.png');
        game.load.image('retour', './images/retour.png');
    },
    
    create: function() {
        this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        
        this.frFlagButton = game.add.button(game.width/2, game.height/2 - 150, 'frFlag', function() {
            language = 'fr';
            category = categories.get(selectedCategory).get(language);
            console.log('language:', language, 'category:', category);
            game.state.start('menu');
        });
        this.frFlagButton.width = 256;
        this.frFlagButton.height = 128;
        this.frFlagButton.anchor.setTo(0.5);
        
        this.enFlagButton = game.add.button(game.width/2, game.height/2, 'enFlag', function() {
            language = 'en';
            category = categories.get(selectedCategory).get(language);
            console.log('language:', language, 'category:', category);
            game.state.start('menu');
        });
        this.enFlagButton.width = 256;
        this.enFlagButton.height = 128;
        this.enFlagButton.anchor.setTo(0.5);
        
        this.deFlagButton = game.add.button(game.width/2, game.height/2 + 150, 'deFlag', function() {
            language = 'de';
            category = categories.get(selectedCategory).get(language);
            console.log('language:', language, 'category:', category);
            game.state.start('menu');
        });
        this.deFlagButton.width = 256;
        this.deFlagButton.height = 128;
        this.deFlagButton.anchor.setTo(0.5);
        
        this.retourButton = game.add.button(game.width/2, game.height/2 + 300, 'retour', function() {
            game.state.start('menu'); 
        });
        this.retourButton.anchor.setTo(0.5);
        /*
        this.retourText = game.add.text(game.width/2, game.height/2 + 300, 'Retour', {fill: 'white'});
        this.retourText.anchor.setTo(0.5);
        this.retourButton.width = this.retourText.width;
        this.retourButton.height = this.retourText.height;
        */
    },
    
    update: function() {
        this.background.tilePosition.y += 1;
    }
}