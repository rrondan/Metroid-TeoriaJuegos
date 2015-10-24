Preloader = function(game){
}

Preloader.prototype = {
	preload:function(){
	
	this.load.image('background', 'assets/images/background.png');
	this.load.image('loading', 'assets/images/loading.png');
	this.load.image('mini_boss', 'assets/images/mini_boss.png');
	this.load.image('floor_tile', 'assets/images/floor_tile.png');
	this.load.image('wall_boss', 'assets/images/wall_boss.png');
	this.load.image('idle', 'assets/images/idle.png');
	this.load.image('bullet', 'assets/images/bullet.png');
	this.load.spritesheet('player','assets/images/player_spritesheet.png',51,67,5,2,3);
	this.load.spritesheet('lft_run','assets/images/left_run.png',30,45,11);
	this.load.spritesheet('lft_diag','assets/images/left_diag.png',30,45,11);
	this.load.spritesheet('lft_shoot','assets/images/left_shoot.png',30,45,10);
	this.load.spritesheet('right_shoot','assets/images/right_shoot.png',30,45,10);
	this.load.spritesheet('right_diag','assets/images/right_diag.png',30,45,11);
	this.load.spritesheet('right_run','assets/images/right_run.png',30,45,11);
	
	this.load.spritesheet('enemy','assets/images/enemy.png',41,30,4);
	this.load.audio('loop','assets/music/Super Metroid - Prologue Theme Acapella.mp3');
    this.loopsound = this.game.add.sound('loop',0.2,true);
    this.loopsound.play();

	this.load.atlasJSONArray('SammusAssets', 'assets/images/Sammus.png', 'animaciones/Sammus.json');


	},
	create:function(){
		this.state.start('Game');
	}
}