
var score;
jeuState = {   
    /*
    var-list:
    - player
    -
    -
    -
    
    */
   
    addEnemy: function() {
        
        var enemyGroup = game.add.group();
        enemyGroup.onDestroy.add(function() {
            jeuState.addEnemy();
        });
        var enemy = game.add.sprite(0, 0, 'enemy');
        enemy.animations.add('animatedEnemy');
        enemy.play('animatedEnemy', 20, true);
        enemy.anchor.setTo(0.5);

        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        
        var enemyText = game.add.text(0, 32, articlesContent[Math.floor(Math.random() * articlesContent.length)], {fill: 'white', fontSize: '16pt'});
        enemyText.anchor.setTo(0.5);
        
        enemy.health = enemyText.text.length;
        
        enemyGroup.add(enemy);
        enemyGroup.add(enemyText);
        
        enemyGroup.x = game.world.randomX;
        enemyGroup.y = 0;
        
        game.add.tween(enemyGroup).to({x: this.player.x, y: this.player.y}, 20000, Phaser.Easing.Linear.None, true, 0, 0, false);

        this.enemiesGroup.push(enemyGroup);
    },
    
    preload: function() {
        game.load.image('background', './images/background.png');
        game.load.spritesheet('player', './images/player.png', 64, 64, 15);
        game.load.spritesheet('enemy', './images/enemy.png', 32, 32);
        game.load.image('missile', './images/missile.png');
        game.load.spritesheet('explode', './images/explode.png', 128, 128);
        
        game.load.audio('shot', ['./sons/shot.ogg', './sons/shot.mp3']);
        game.load.audio('explosion', ['./sons/explosion.ogg', './sons/explosion.mp3']);
    },
        
    create: function() {
        console.log('lang:', language, 'cat:', category)
        score = 0;
        this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.currentEnemy = null;
        this.enemiesGroup = new Array();
        
        this.player = game.add.sprite(game.width/2, game.height * 6/8, 'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('animatedPlayer');
        this.player.play('animatedPlayer', 20, true);
        this.player.angularSpeed = 5;
        this.player.targetAcquired = false;
        this.player.laser = game.add.graphics(0 ,0);
        this.player.weapon = game.add.weapon(30, 'missile');
        this.player.weapon.trackSprite(this.player);
        this.player.weapon.bulletSpeed = 1000;
        this.player.missileTo = new Array();
        this.player.weapon.onFire.add(function() {
            jeuState.player.missileTo.shift();
        });
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.physics.enable(this.player.weapon, Phaser.Physics.ARCADE);
        
        this.player.targets = new Array();
        this.player.update = function() {
            for(var enemy of jeuState.enemiesGroup) {
                game.physics.arcade.overlap(enemy.children[0], this, function() {
                    if(!this.isDead) {
                        this.isDead = true;
                        game.input.keyboard.onDownCallback = null;
                        //ON FAIT DES TRUCS
                        var deathAnimation = game.add.sprite(this.position.x, this.position.y, 'explode');
                        deathAnimation.anchor.setTo(0.5);
                        deathAnimation.animations.add('explodeAnimation');
                        //deathAnimation.width = 128;
                        //deathAnimation.height = 128;
                        deathAnimation.events.onAnimationComplete.add(function() {
                            game.state.start('deathScreen');
                        });
                        var explosion = game.add.audio('explosion');
                        if(soundActive) {
                            explosion.play();
                        }
                        deathAnimation.play('explodeAnimation', 20, false, true);
                    }
                }, null, this);
            }
            
            this.laser.clear();
            var target = this.targets[0];
            if(!this.targetAcquired) {
            //var target = this.targets[0]; //Cible vers laquel le vaisseau doit s'orienter
                if(target != null) {
                    var targetPosition = target.position;
                    var targetAngle = Phaser.Math.radToDeg(Phaser.Math.angleBetweenPoints(this.position, target)) + 90; //Angle que le vaisseau doit avoir pour viser correctement la cible
                    var diffAngle = Math.abs(this.angle - targetAngle); //Difference entre l'angle actuel du vaisseau et l'angle requis
                    if(diffAngle < this.angularSpeed) { //Si la difference des angles est inferieur a la vitesse angulaire on definie l'angle du vaisseau a l'angle requis et on enleve la cible de la liste des cibles
                        this.angle = targetAngle;
                        this.targetAcquired = true;
                        //this.targets.shift();
                    } else {
                        if(this.position.x < target.x) { //Si la difference des angles est superieur a la vitesse angulaire et que la cible se situe sur la gauche, on diminue graduellement l'angle du vaisseau, et si sur la droite on l'augmente, pour avoir une animation de rotation
                            if(this.angle > targetAngle) {
                                this.angle -= this.angularSpeed;
                            } else {
                                this.angle += this.angularSpeed;
                            }
                        } else {
                            if(this.angle > targetAngle) {
                                this.angle -= this.angularSpeed;
                            } else {
                                this.angle += this.angularSpeed;
                            }
                        }
                    }
                }
            } else {
                //On tire
                this.laser.lineStyle(1, 0x00FF00, 1);
                this.laser.moveTo(this.position.x, this.position.y);
                this.laser.lineTo(target.position.x, target.position.y);
                
                game.physics.arcade.overlap(this.weapon.bullets, target.children[0], function(_target, missile) {
                    target.children[0].health--;
                    missile.kill();
                    if(target.children[0].health == 0) {
                        var deathAnimation = game.add.sprite(target.x, target.y, 'explode');
                        deathAnimation.anchor.setTo(0.5);
                        deathAnimation.animations.add('explodeAnimation');
                        deathAnimation.width = 64;
                        deathAnimation.height = 64;
                        var explosion = game.add.audio('explosion');
                        if(soundActive) {
                            deathAnimation.play('explodeAnimation', 20, false, true);
                        }
                        explosion.play();
                        target.destroy();
                        score += 10;
                        jeuState.scoreText.setText('score:' + score);
                        this.targetAcquired = false;
                        this.targets.shift();
                    }
                }, null, this);
                
                var missileAvailabe = this.missileTo[0];
                if(missileAvailabe != null) {
                    if(missileAvailabe == target) {
                        if(soundActive) {
                            var shot = game.add.audio('shot');
                            shot.play();
                        }

                        this.weapon.fireAtSprite(target.children[0]);
                    }
                }
            }
        }
        this.hint = game.add.text(game.width/2, game.height * 7/8, '', {fill: 'white'});
        this.hint.anchor.setTo(0.5);
        
        this.scoreText = game.add.text(game.width/2, game.height * 15/16, 'score:' + score, {fill: 'white'});
        this.scoreText.anchor.setTo(0.5);
        
        this.addEnemy();
        this.addEnemy();
        this.addEnemy();
        this.addEnemy();
        this.addEnemy();
        this.addEnemy();
        
        game.input.keyboard.onDownCallback = function(key) {
            if(jeuState.currentEnemy == null) {
                for(var enemy of jeuState.enemiesGroup) {
                    if(enemy.children[1].text[0] == key.key) {
                        jeuState.currentEnemy = enemy;
                        jeuState.hint.setText(enemy.children[1].text);
                        break;
                    }
                }
                if(jeuState.currentEnemy != null) {
                    jeuState.player.targets.push(jeuState.currentEnemy);
                    jeuState.xyz = jeuState.currentEnemy.children[0].health;
                    //console.log('key:', key.key, 'required:', jeuState.currentEnemy.children[1].text[jeuState.currentEnemy.children[1].text.length - jeuState.xyz], 'next:', jeuState.currentEnemy.children[1].text[jeuState.currentEnemy.children[1].text.length - jeuState.xyz + 1]);                   
                    
                    jeuState.currentEnemy.children[1].addColor('red', jeuState.currentEnemy.children[1].text.length - jeuState.xyz);
                    
                    jeuState.hint.addColor('red', jeuState.currentEnemy.children[1].text.length - jeuState.xyz);
                    
                    jeuState.xyz--;
                    jeuState.currentEnemy.children[1].addColor('white', jeuState.currentEnemy.children[1].text.length - jeuState.xyz);
                    
                    jeuState.hint.addColor('white', jeuState.currentEnemy.children[1].text.length - jeuState.xyz);
                    
                    jeuState.player.missileTo.push(jeuState.currentEnemy);
                }
            } else {
                //console.log('key:', key.key, 'required:', jeuState.currentEnemy.children[1].text[jeuState.currentEnemy.children[1].text.length - jeuState.xyz], 'next:', jeuState.currentEnemy.children[1].text[jeuState.currentEnemy.children[1].text.length - jeuState.xyz + 1]);
                if(jeuState.currentEnemy.children[1].text[jeuState.currentEnemy.children[1].text.length - jeuState.xyz] == key.key) {
                    jeuState.currentEnemy.children[1].addColor('red', jeuState.currentEnemy.children[1].text.length - jeuState.xyz);
                    
                    jeuState.hint.addColor('red', jeuState.currentEnemy.children[1].text.length - jeuState.xyz);
                    
                    jeuState.xyz--;
                    
                    jeuState.currentEnemy.children[1].addColor('white', jeuState.currentEnemy.children[1].text.length - jeuState.xyz);
                    
                    jeuState.hint.addColor('white', jeuState.currentEnemy.children[1].text.length - jeuState.xyz);
                    
                    jeuState.player.missileTo.push(jeuState.currentEnemy);
                    if(jeuState.xyz == 0) {
                        jeuState.enemiesGroup.splice(jeuState.enemiesGroup.indexOf(jeuState.currentEnemy), 1);
                        jeuState.currentEnemy.children[1].kill();
                        jeuState.currentEnemy = null;
                        jeuState.hint.clearColors();
                        jeuState.hint.setText('');
                    }
                }  
            }
            
        };
    },
    
    update: function() {
        this.background.tilePosition.y += 1;
    },
    
    shutdown: function() {
        for(enemy of this.enemiesGroup) {
            enemy.onDestroy.removeAll();
        }
    }
}