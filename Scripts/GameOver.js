GameOver = function(game){
}

GameOver.prototype = {
	preload:function(){
	
	//this.load.image('loading', 'assets/images/loading.png');
	this.load.image('start', 'assets/images/super_metroid_snes_02.png');
	// this.background = this.game.add.sprite(0, 0, 'loading');
//this.background = this.add.tileSprite(0,0,this.world.width,this.world.height,'loading');
	


	},
	create:function(){
		
this.btnStart= this.game.add.button(0,0,'start',this.startGame);

//this.btnStart.anchor.setTo(0.5,0.5);
this.btnStart.x = 100;
this.btnStart.y = 0;

	//var bg= game.add.sprite(0,0,'bg');
	this.btnStart.bringToTop();
//	 group = game.add.group();
},

 startGame:function () {
	//start.destroy();
//comenzar=true;
	//console.log("start");
	this.game.world.remove(this.background);
     //<   this.game.world.remove(this.water);
   //  Global.refresh = false;
        this.game.state.start('Game');

	// body...
}
}