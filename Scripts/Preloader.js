Preloader = function(game){
}

Preloader.prototype = {
	preload:function(){
	
	this.load.image('background', 'assets/images/background.png');
	this.load.image('loading', 'assets/images/loading.png');
	this.load.image('mini_boss', 'assets/images/mini_boss.png');
	this.load.image('floor_tile', 'assets/images/floor_tile.png');
	this.load.image('wall_boss', 'assets/images/wall_boss.png');
	this.load.spritesheet('player','assets/images/player_spritesheet.png',51,67,5,2,3);

	this.load.atlasJSONArray('SammusAssets', 'assets/images/Sammus.png', 'animaciones/Sammus.json');


	},
	create:function(){
		this.state.start('Game');
	}
}