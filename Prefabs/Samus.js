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
		'Bolita/12.png'],15,false,false);

	this.animations.add('Derecha',[
		'Derecha/0.png',
		'Derecha/1.png',
		'Derecha/2.png',
		'Derecha/3.png',
		'Derecha/4.png',
		'Derecha/5.png',
		'Derecha/6.png',
		'Derecha/7.png',
		'Derecha/8.png',
		'Derecha/9.png',
		'Derecha/10.png'],true,false);

	this.animations.add('DiagonalDerecha',[
		'DiagonalDerecha/0.png',
		'DiagonalDerecha/1.png',
		'DiagonalDerecha/2.png',
		'DiagonalDerecha/3.png',
		'DiagonalDerecha/4.png',
		'DiagonalDerecha/5.png',
		'DiagonalDerecha/6.png',
		'DiagonalDerecha/7.png',
		'DiagonalDerecha/8.png',
		'DiagonalDerecha/9.png',
		'DiagonalDerecha/10.png',
		'DiagonalDerecha/11.png'],true,false);

	this.animations.add('DiagonalIzquierda',[
		'DiagonalIzquierda/0.png',
		'DiagonalIzquierda/1.png',
		'DiagonalIzquierda/2.png',
		'DiagonalIzquierda/3.png',
		'DiagonalIzquierda/4.png',
		'DiagonalIzquierda/5.png',
		'DiagonalIzquierda/6.png',
		'DiagonalIzquierda/7.png',
		'DiagonalIzquierda/8.png',
		'DiagonalIzquierda/9.png',
		'DiagonalIzquierda/10.png'],true,false);

	this.animations.add('Izquierda',[
		'Izquierda/0.png',
		'Izquierda/1.png',
		'Izquierda/2.png',
		'Izquierda/3.png',
		'Izquierda/4.png',
		'Izquierda/5.png',
		'Izquierda/6.png',
		'Izquierda/7.png',
		'Izquierda/8.png',
		'Izquierda/9.png'],true,false);

	this.animations.add('QuietoDerecha',[
		'QuietoDerecha/0.png',
		'QuietoDerecha/1.png',
		'QuietoDerecha/2.png',
		'QuietoDerecha/3.png',
		'QuietoDerecha/4.png',
		'QuietoDerecha/5.png'],true,false);

	this.animations.add('QuietoIzquierda',[
		'QuieroIzquierda/0.png',
		'QuieroIzquierda/1.png',
		'QuieroIzquierda/2.png',
		'QuieroIzquierda/3.png',
		'QuieroIzquierda/4.png',
		'QuieroIzquierda/5.png'],true,false);

	this.animations.add('VolantinDerecha',[
		'VolantinDerecha/0.png',
		'VolantinDerecha/1.png',
		'VolantinDerecha/2.png',
		'VolantinDerecha/3.png',
		'VolantinDerecha/4.png',
		'VolantinDerecha/5.png',
		'VolantinDerecha/6.png',
		'VolantinDerecha/7.png',
		'VolantinDerecha/8.png'],false,false);

	this.animations.add('VolantinIzquierda',[
		'VolantinIzquierda/0.png',
		'VolantinIzquierda/1.png',
		'VolantinIzquierda/2.png',
		'VolantinIzquierda/3.png',
		'VolantinIzquierda/4.png',
		'VolantinIzquierda/5.png',
		'VolantinIzquierda/6.png',
		'VolantinIzquierda/7.png',
		'VolantinIzquierda/8.png'],false,false);

}
