Game = function (game) {

}
Game.prototype = {
    preload: function () {
    },
    create: function () {

		this.score = 0;
		this.background = this.add.tileSprite(0,0,this.world.width,this.world.height,'background');
		this.background.tileScale.y = 2.50;
		//Global.worldSpeed = 200;
		this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.world.setBounds(0, 0, 49000, 49000);
		this.enemysPool = this.add.group();
		this.enemysPool.enableBody = true;
		
		this.background.autoScroll(-Global.worldSpeed,0);
        this.playerLife = 10;
        this.boss_life=20;

		this.isJumping = false;
		this.jumpPeaked = false;
		this.startJumpY = 0;
		this.frontStyle={front: '40px Arial',fill:'#FFCC00',stroke:'#333',strokeThickness:5};//stroke = borde
		this.textScore = this.add.text(150,100,'Seig Heil',this.frontStyle);
		this.textScore.text = this.playerLife;

        this.bullets = this.add.group();
        this.bullets.enableBody = true;
      //  this.bullets.body.allowGravity = false; 
/*		this.player = this.add.sprite(24,48,'player');

		this.player.anchor.setTo(0.5,0.5);
        this.player.animations.add('running',[0,1,2,3,2,1],15,true);
		this.player.play('running');
  */     
        this.mini_boss = this.add.sprite(2000,127,'mini_boss');
        this.wall_boss = this.add.sprite(-60,128,'wall_boss');

  
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.physics.arcade.gravity.y = 1000;
        //this.physics.arcade.enable(this.player);
		this.physics.arcade.enable(this.wall_boss);
        this.physics.arcade.enable(this.mini_boss);

         this.wall_boss.body.immovable =true;
         this.wall_boss.body.allowGravity = false; 
 //       this.wall_boss.body.x =this.player.body.x -60 ;
   //     this.wall_boss.body.y = 50 ;
        this.wall_boss.body.velocity.x = 50 ;
        this.mini_boss.body.immovable =true;
        this.mini_boss.body.allowGravity = false;
      //  this.mini_boss.body.x = 1000;
    //    this.mini_boss.body.y =-10;
 
        this.elapsed = 0;
        this.limit = 250;

		this.platformPool = this.add.group();
		this.floorPool = this.add.group();

		this.currentPlatform = new Platform(this.game,this.floorPool,200,0,240,0/*Global.worldSpeed*/,this.enemysPool);

		this.platformPool.add(this.currentPlatform);

        this.player = new Samus(this.game,24,48,this.background);

        
        if(Global.refresh){
             this.gameRefresh();
         }
    },
    update: function () {

        /*      this.bullets.forEach(function(element){
            if(element.x < 10 || element.x > 20000 || element.y > 600 || element.y <0){
                element.kill();
            }
        });*/


        //    this.enemysPool.forEachAlive(function(enemy){
        //   this.createMonsterBullet(0,0);
        //     });
        this.platformPool.forEachAlive(function (platform) {
                this.textScore.x = this.game.camera.x;
            this.game.physics.arcade.collide(this.player, platform);
            this.game.physics.arcade.collide(this.player, this.wall_boss);
            this.game.physics.arcade.collide(this.player, this.mini_boss);
            
            this.game.physics.arcade.collide(this.mini_boss,platform);

               this.game.physics.arcade.collide(this.player, this.enemysPool, this.checkCollision, null, this);
               this.game.physics.arcade.collide( this.wall_boss, this.player,this.checkCollision, null, this);
               this.game.physics.arcade.collide(this.player, this.mini_boss, this.checkCollision, null, this);
            if (this.currentPlatform.length && this.currentPlatform.children[this.currentPlatform.length - 1].right < 0) {
                platform.kill();
            }
        }, this);
        //console.log(this.player.body.x );
        
        if(this.wall_boss.body.x + this.wall_boss.width >= this.mini_boss.body.x -this.player.width-10){
                   this.gameOver();
        }
        
        /*
        if (this.player.body.touching.down) {
            this.player.body.velocity.x = this.worldSpeed;
        } else {
            this.player.body.velocity.x = 0;
        }*/
        if (this.currentPlatform.length && this.currentPlatform.children[this.currentPlatform.length - 1].right	< this.game.world.width) {
            this.createPlatform();
        }
        if (this.player.top >= this.game.world.height) {
            this.gameOver();
        }


        if(this.cursors.left.isDown && !this.cursors.up.isDown){
            this.player.body.velocity.x = -250;


            this.player.anchor.setTo(0.5,0.5);
            Global.worldSpeed = -200;
            this.elapsed+= this.game.time.elapsed;
            
            if(this.elapsed>=this.limit){
                this.elapsed = 0;
            this.createBullet(this.player.body.velocity.x -150 ,0,0);
            }
       
            this.background.autoScroll(-Global.worldSpeed,0);

        }

        if(this.cursors.right.isDown && !this.cursors.up.isDown){
        
            this.player.body.velocity.x = 250;
            this.elapsed+= this.game.time.elapsed;
            if(this.elapsed>=this.limit){
                this.elapsed = 0;
                this.createBullet(this.player.body.velocity.x + 150,0,40);
            }

            Global.worldSpeed = 200;
            this.background.autoScroll(-Global.worldSpeed,0);
        }

        if(this.cursors.up.isDown && this.cursors.right.isDown && !this.cursors.left.isDown){
            this.player.body.velocity.x = 250;
         this.elapsed+= this.game.time.elapsed;
        if(this.elapsed>=this.limit){
            this.elapsed = 0;
        this.createBullet(this.player.body.velocity.x + 150,-50,40);
        }

        Global.worldSpeed = 200;
        this.background.autoScroll(-Global.worldSpeed,0);
}

        if(this.cursors.up.isDown && !this.cursors.right.isDown && this.cursors.left.isDown){
this.player.body.velocity.x = -250;
         this.elapsed+= this.game.time.elapsed;
        if(this.elapsed>=this.limit){
            this.elapsed = 0;
        this.createBullet(this.player.body.velocity.x - 150,-50,0);
        }

        Global.worldSpeed = 200;
        this.background.autoScroll(-Global.worldSpeed,0);
}
       /*if(this.cursors.up.isDown){
this.player.body.velocity.x = 180;
//this.player.body.acceleration.x-=50;
//this.player.play('walking') ;
//this.player.scale.setTo(1,1);}
        Global.worldSpeed = 200;
        this.background.autoScroll(-Global.worldSpeed,0);
}*/

    this.game.physics.arcade.collide(this.mini_boss, this.bullets, this.checkCollision, null, this);
    this.game.physics.arcade.collide(this.player, this.bullets, this.checkMonsterCollision, null, this);

    },

    checkCollision: function(bullet) {
        this.boss_life--; // sp2.destroy();
        bullet.kill();
        if(this.boss_life<=0){
            this.gameOver();
        }
    },
    
    checkMonsterCollision: function() {
        this.player--; // sp2.destroy();

        if(this.player<=0){
            this.gameOver();
        }
    },

    render: function(){
        //    this.game.debug.body(this.player.referencePoint);

        //    this.game.debug.body(this.player);

        //this.game.debug.bodyInfo(this.lobomon, 32, 32);
    },
    gameRefresh: function () {
        this.player.kill();
        this.game.world.remove(this.background);
        //<   this.game.world.remove(this.water);
     Global.refresh = false;
        this.game.state.start('Game');


    },

    gameOver: function () {
        this.player.kill();
        this.game.world.remove(this.background);
     //<   this.game.world.remove(this.water);
        Global.refresh = false;
        this.game.state.start('GameOver');


    },
    
    createBullet:function(x,y,px){

        var bullet = this.bullets.getFirstDead(false);

        if(!bullet){
            bullet = this.game.add.sprite(0,0,'bullet');

            bullet.x = this.player.body.x+px;
     
            bullet.y = this.player.body.y-10;
            this.physics.arcade.enable(bullet);
           bullet.body.allowGravity = false; 
            this.bullets.add(bullet);
        }
    
        bullet.body.collideWorldBounds = true;
        bullet.body.velocity.x = x;
        bullet.body.velocity.y = y;

    },

    createMonsterBullet:function(x,y){

        var bullet = this.bullets.getFirstDead(false);

        if(!bullet){
            bullet = this.game.add.sprite(0,0,'bullet');
            bullet.x =x;
     
            bullet.y = y+10;
            this.physics.arcade.enable(bullet);
           bullet.body.allowGravity = false; 
            this.bullets.add(bullet);
        }
    
        bullet.body.collideWorldBounds = true;
        bullet.body.velocity.x = 0;
        bullet.body.velocity.y = 50;

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
                this.currentPlatform = new Platform(this.game, this.floorPool, next.numTiles,this.game.world.width + next.separation,next.y, 0/*-Global.worldSpeed*/, this.enemysPool);
            } else {
                this.currentPlatform.prepare(next.numTiles,this.game.world.width + next.separation,next.y,0/*-Global.worldSpeed*/, this.enemysPool);
            }
            this.platformPool.add(this.currentPlatform);
        }
    },
    
    reduceLife:function(){
        console.log("seig heil");
        this.player.velocity.x = 400;
        this.player.velocity.y = -200;
        this.playerLife--;
        if(this.playerLife <= 0){
          this.gameOver();

    }

}
}