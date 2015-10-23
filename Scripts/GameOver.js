GameOver = function(game){
}

GameOver.prototype = {
	preload:function(){
	
	this.load.image('loading', 'assets/images/loading.png');
	 this.background = this.game.add.sprite(0, 0, 'loading');
//this.background = this.add.tileSprite(0,0,this.world.width,this.world.height,'loading');
	


	},
	create:function(){
		
var btnStart= this.game.add.button(0,0,'start',this.startGame);

btnStart.anchor.setTo(0.5,0.5);
btnStart.x = game.world.centerX;
btnStart.y = game.world.centerY;

	//var bg= game.add.sprite(0,0,'bg');
	btnStart.bringToTop();
//	 group = game.add.group();
},

 startGame:function () {
	start.destroy();
//comenzar=true;
	console.log("start");
	// body...
}
}