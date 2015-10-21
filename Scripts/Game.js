Game = function (game) {

}
Game.prototype = {
    preload: function () {
    },
    create: function () {

			this.score = 0;
		this.background = this.add.tileSprite(0,0,
				this.world.width,
				this.world.height,'background');
		this.background.tileScale.y = 2;
		this.worldSpeed = 200;
		
		this.coinsPool = this.add.group();
		this.coinsPool.enableBody = true;
		
		this.background.autoScroll(-this.worldSpeed,0);

		this.isJumping = false;
		this.jumpPeaked = false;
		this.startJumpY = 0;
			this.frontStyle={front: '40px Arial',fill:'#FFCC00',stroke:'#333',strokeThickness:5};//stroke = borde
		this.textScore = this.add.text(150,100,'Seig Heil',this.frontStyle);
		this.textScore.text = 'Seig Heil';

		//this.water = this.add.tileSprite(0,this.world.height-30,this.world.width,this.world.height,'water');
	//	this.water.autoScroll(-this.worldSpeed/2,0);

		this.player = this.add.sprite(50,140,'player');
		this.player.anchor.setTo(0.5,0.5);
		this.player.animations.add('running',[0,1,2,3,2,1],15,true);
		this.player.play('running');

		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.physics.arcade.gravity.y = 1000;
		this.physics.arcade.enable(this.player);

		this.platformPool = this.add.group();
		this.floorPool = this.add.group();


		this.currentPlatform = new Platform(this.game,this.floorPool,
			12,0,200,-this.worldSpeed,this.coinsPool
			);

		this.platformPool.add(this.currentPlatform);
    },
    update: function () {
        this.platformPool.forEachAlive(function (platform) {
            this.game.physics.arcade.collide(this.player, platform);
            if (this.currentPlatform.length && this.currentPlatform.children[this.currentPlatform.length - 1].right < 0) {
                platform.kill();
            }
        }, this);

        if (this.player.body.touching.down) {
            this.player.body.velocity.x = this.worldSpeed;
        } else {
            this.player.body.velocity.x = 0;
        }
        if (this.currentPlatform.length &&
			this.currentPlatform.children[this.currentPlatform.length - 1].right
			< this.game.world.width
			) {
            this.createPlatform();
        }
        if (this.player.top >= this.game.world.height) {
            this.gameOver();
        }
    },
    gameOver: function () {
        this.player.kill();
        this.game.world.remove(this.background);
     //<   this.game.world.remove(this.water);
        this.game.state.start('Game');


    },

    generateNext: function () {
        var data = {};
        var minSeparation = 60;
        var maxSeparation = 200;

        data.separation = minSeparation + Math.random() *
        (maxSeparation - minSeparation);

        var minDifY = -120;
        var maxDify = 120;

        data.y = this.currentPlatform.children[0].y
        + minDifY +
        Math.random() * (maxDify - minDifY);

        data.y = Math.max(150, data.y);
        data.y = Math.min(this.world.height - 50, data.y);

        var minTiles = 1;
        var maxTiles = 5;

        data.numTiles = minTiles +
        Math.random() * (maxTiles - minTiles);

        return data;

    },
    createPlatform: function () {
        var next = this.generateNext();
        if (next) {
            this.currentPlatform =
            this.platformPool.getFirstDead();
            if (!this.currentPlatform) {
                this.currentPlatform = new Platform(this.game, this.floorPool, next.numTiles,this.game.world.width + next.separation,next.y, -this.worldSpeed, this.coinsPool);
            } else {
                this.currentPlatform.prepare(next.numTiles,this.game.world.width + next.separation,next.y,-this.worldSpeed, this.coinsPool);
            }
            this.platformPool.add(this.currentPlatform);
        }
    }

}