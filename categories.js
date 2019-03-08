

categoriesState = {
    
    preload: function() {
        game.load.image('background', './images/background.png');
        game.load.image('mathematics', './images/mathematics.png');
        game.load.image('physics', './images/physics.png');
        game.load.image('computer_science', './images/computer_science.png');
        game.load.image('history', './images/history.png');
        game.load.image('retour', './images/retour.png');
    },
    
    create: function() {
        this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        
        this.mathematicCategoryButton = game.add.button(game.width/2, game.height/2 - 96, 'mathematics', function() {
            selectedCategory = 'mathematics'
            category = categories.get(selectedCategory).get(language);
            console.log('language:', language, 'category:', category);
            game.state.start('menu');
        });
        this.mathematicCategoryButton.anchor.setTo(0.5);
        /*
        this.mathematicCategoryText = game.add.text(game.width/2, game.height/2 - 96, 'Mathematiques', {fill: 'white'});
        this.mathematicCategoryText.anchor.setTo(0.5);
        this.mathematicCategoryButton.width = this.mathematicCategoryText.width;
        this.mathematicCategoryButton.height = this.mathematicCategoryText.height;
        */
        
        this.physicCategoryButton = game.add.button(game.width/2, game.height/2 - 32, 'physics', function() {
            selectedCategory = 'physics'
            category = categories.get(selectedCategory).get(language);
            console.log('language:', language, 'category:', category);
            game.state.start('menu');
        });
        this.physicCategoryButton.anchor.setTo(0.5);
        /*
        this.physicCategoryText = game.add.text(game.width/2, game.height/2 - 32, 'physics', {fill: 'white'});
        this.physicCategoryText.anchor.setTo(0.5);
        this.physicCategoryButton.width = this.physicCategoryText.width;
        this.physicCategoryButton.height = this.physicCategoryText.height;
        */
        
        this.informaticCategoryButton = game.add.button(game.width/2, game.height/2 + 32, 'computer_science', function() {
            selectedCategory = 'computer_science'
            category = categories.get(selectedCategory).get(language);
            console.log('language:', language, 'category:', category);
            game.state.start('menu');
        });
        this.informaticCategoryButton.anchor.setTo(0.5);
        /*
        this.informaticCategoryText = game.add.text(game.width/2, game.height/2 + 32, 'computer_science', {fill: 'white'});
        this.informaticCategoryText.anchor.setTo(0.5);
        this.informaticCategoryButton.width = this.informaticCategoryText.width;
        this.informaticCategoryButton.height = this.informaticCategoryText.height;
        */
        
        this.historyCategoryButton = game.add.button(game.width/2, game.height/2 + 96, 'history', function() {
            selectedCategory = 'history'
            category = categories.get(selectedCategory).get(language);
            console.log('language:', language, 'category:', category);
            game.state.start('menu');
        });
        this.historyCategoryButton.anchor.setTo(0.5);
        /*
        this.historyCategoryText = game.add.text(game.width/2, game.height/2 + 96, 'Histoires', {fill: 'white'});
        this.historyCategoryText.anchor.setTo(0.5);
        this.historyCategoryButton.width = this.historyCategoryText.width;
        this.historyCategoryButton.height = this.historyCategoryText.height;
        */
        
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