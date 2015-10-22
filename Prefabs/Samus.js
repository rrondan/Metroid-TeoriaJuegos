//SAMUS JS
Samus = function(game,x,y){

};

Samus.prototype = Object.create(Phaser.Sprite.prototype);
Samus.prototype.constructor = Samus;

Samus.prototype.update = function(){

}

Samus.prototype.loadAnimations = function(){
	this.animations.add('Arriba',[
		'Arriba/0.png',
		'Arriba/1.png'],10,true,false);

	this.animations.add('Bolita',[
		'Bolita/0.png',
		'Bolita/1.png',
		'Bolita/2.png',
		'Bolita/3.png',
		'Bolita/4.png',
		'Bolita/5.png',
		'Bolita/6.png',
		'Bolita/7.png',
		'Bolita/8.png',
		'Bolita/9.png',
		'Bolita/10.png',
		'Bolita/11.png',
		'Bolita/12.png'],15,true,false);

	
}
