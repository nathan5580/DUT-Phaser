deathState = {
    preload: function() {
        
    },
    
    create: function() {
        this.maxLength = 17;
        this.insert = false;
        this.carriage = 0;
        this.hint = game.add.text(game.width/2, game.height/2 - 96, 'Pseudo:', {fill: 'white'});
        this.hint.anchor.setTo(0.5);
        this.pseudo = game.add.text(game.width/2, game.height/2 - 64, '', {fill: 'white'});
        this.pseudo.anchor.setTo(0.5);
        this.score = game.add.text(game.width/2, game.height/2, score, {fill: 'white'});
        this.score.anchor.setTo(0.5);
        
        game.input.keyboard.onDownCallback = function(key) {
            console.log('keypress');
            if(key.keyCode == Phaser.KeyCode.ENTER || key.keyCode == Phaser.KeyCode.NUMPAD_ENTER) {
                var entry = {
                    pseudo: deathState.pseudo.text,
                    score: score,
                };
                if(scoreboard.length == 5) {
                    scoreboard.shift();
                }
                scoreboard.push(entry);
                game.state.start('menu');
            } else if(key.keyCode == Phaser.KeyCode.INSERT) {
                console.log('INSERT');
                deathState.insert = !deathState.insert;
                if(deathState.insert) {
                    console.log('INSERT ADD');
                    deathState.pseudo.addColor('red', deathState.carriage);
                    deathState.pseudo.addColor('white', deathState.carriage + 1);
                } else {
                    deathState.pseudo.clearColors();
                }
            } else if(key.keyCode == Phaser.KeyCode.LEFT) {
                console.log(Phaser.KeyCode.LEFT);
                deathState.carriage -= deathState.carriage > 0 ? 1 : 0;
                if(deathState.insert) {
                    deathState.pseudo.clearColors();
                    deathState.pseudo.addColor('red', deathState.carriage);
                    deathState.pseudo.addColor('white', deathState.carriage + 1);
                }
            } else if(key.keyCode == Phaser.KeyCode.RIGHT) {
                console.log(Phaser.KeyCode.RIGHT);
                deathState.carriage += deathState.carriage < deathState.maxLength ? 1 : 0;
                if(deathState.insert) {
                    deathState.pseudo.clearColors();
                    deathState.pseudo.addColor('red', deathState.carriage);
                    deathState.pseudo.addColor('white', deathState.carriage + 1);
                }
            } else if(key.keyCode == Phaser.KeyCode.DELETE) {
                console.log(Phaser.KeyCode.DELETE);
                deathState.pseudo.setText(deathState.pseudo.text.substr(0, deathState.carriage) + deathState.pseudo.text.substr(deathState.carriage + 1, deathState.pseudo.text.length));
            } else if(key.keyCode == Phaser.KeyCode.BACKSPACE) {
                deathState.pseudo.setText(deathState.pseudo.text.substr(0, deathState.carriage - 1) + deathState.pseudo.text.substr(deathState.carriage, deathState.pseudo.text.length));
                deathState.carriage -= deathState.carriage > 0 ? 1 : 0;
                if(deathState.insert) {
                    deathState.pseudo.clearColors();
                    deathState.pseudo.addColor('red', deathState.carriage);
                    deathState.pseudo.addColor('white', deathState.carriage + 1);
                }
            } 
            else {
                if(deathState.pseudo.text.length <= deathState.maxLength) {
                    if('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').includes(key.key)) {
                        if(deathState.insert) {
                            if(deathState.carriage == deathState.pseudo.text.length) {
                                deathState.pseudo.clearColors();
                                console.log(deathState.pseudo.text.substr(0, deathState.carriage));
                                deathState.pseudo.setText(deathState.pseudo.text.substr(0, deathState.carriage) + key.key);
                                deathState.carriage++;
                            } else {
                                deathState.pseudo.setText(deathState.pseudo.text.substr(0, deathState.carriage) + key.key + deathState.pseudo.text.substr(deathState.carriage + 1, deathState.pseudo.text.length));
                                deathState.carriage++;
                                deathState.pseudo.clearColors();
                                deathState.pseudo.addColor('red', deathState.carriage);
                                deathState.pseudo.addColor('white', deathState.carriage + 1);
                            }
                        } else {
                            deathState.pseudo.setText(deathState.pseudo.text.substr(0, deathState.carriage) + key.key + deathState.pseudo.text.substr(deathState.carriage, deathState.pseudo.text.length));
                            deathState.carriage++;
                        }
                    }
                }
            }
        };
    },
    
    shutdown: function() {
        game.input.keyboard.onDownCallback = null;
    }
}