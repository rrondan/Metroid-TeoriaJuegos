//SAMUS JS
Samus = function(game,x,y){

	Phaser.Sprite.call(this,game,x,y,'SammusAssets');

	this.game = game;
	this.velocidad = 150;
	
	this.body.collideWorldBounds = true;
	this.body.allowGravity = true;

	this.anchor.setTo(0.5,0.5);
	game.camera.follow(this);
	game.physics.arcade.enable(this);

	this.loadAnimations();

	this.inputEnabled = true;

	this.derecha = true;
	this.izquierda = false;
	this.arriba = false;
	this.abajo = false;
	this.direccion = 0; //Derecha = 0 , Izquierda = 1


	this.bindKeys();

	this.animations.play('ParadoDerecha');

};

Samus.prototype = Object.create(Phaser.Sprite.prototype);
Samus.prototype.constructor = Samus;

Samus.prototype.bindKeys = function(){

	TeclaArriba = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	TeclaArriba.onDown.add(this.TeclaArribaPresionado,this);
	TeclaArriba.onUp.add(this.TeclaArribaonUp,this);

	TeclaAbajo = this.game.input.keyboard.addKey(dPhaser.Keyboard.DOWN);
	TeclaAbajo.onDown.add(this.TeclaAbajoPresionado,this);
	TeclaAbajo.onUp.add(this.TeclaAbajoonUp,this);

	TeclaDerecha = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	TeclaDerecha.onDown.add(this.TeclaDerechaPresionado,this);
	TeclaDerecha.onUp.add(this.TeclaDerechaonUp,this);

	TeclaIzquierda = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	TeclaIzquierda.onDown.add(this.TeclaIzquierdaPresionado,this);
	TeclaIzquierda.onUp.add(this.TeclaIzquierdaonUp,this);

};

Samus.prototype.TeclaArribaPresionado = function(){
	if(!this.arriba && this.derecha && !this.izquierda){
		this.animations.play('DiagonalDerecha');	
	}else if(!this.arriba && this.izquierda && !this.derecha){
		this.animations.play('DiagonalIzquierda');
	}else if(!this.arriba && this.direccion == 0){
		this.animations.play('ArribaD');
	}else if(!this.arriba && this.direccion == 1){
		this.animations.play('ArribaI');
	}
	this.arriba = true;	
};

Samus.prototype.TeclaArribaonUp = function(){
	if(!this.derecha && !this.izquierda){
		if(this.direccion == 0){
			this.animations.play('QuietoDerecha')
		}else if(this.direccion == 1){
			this.animations.play('QuietoIzquierda')
		}
	}else if(this.derecha){
		this.animations.play('Derecha');
	}else if(this.izquierda){
		this.animations.play('Izquierda');
	}
	this.arriba = false;
};

Samus.prototype.TeclaDerechaPresionado = function(){
	if(!this.arriba){
		if(!this.abajo){
			this.animations.play('Derecha');
		}else if(this.abajo){
			this.animations.play('BolitaD');
		}
	}else if(this.arriba){
		this.animations.play('DiagonalDerecha');
	}
	this.derecha = true;
	this.direccion = 0;
};

Samus.prototype.TeclaDerechaonUp = function(){
	if(this.arriba){
		this.animations.play('ArribaD');
	}else if(this.abajo){
		this.animations.play('AgachadoDerecha');
	}else if (direccion == 0 ){
		this.animations.play('QuietoDerecha');
	}
	this.derecha = false;
};

Samus.prototype.TeclaIzquierdaPresionado = function(){
	if(!this.arriba){
		if(!this.abajo){
			this.animations.play('Izquierda');
		}else if(this.abajo){
			this.animations.play('BolitaI');
		}
	}else if (this.arriba){
		this.animations.play('DiagonalIzquierda');
	}
	this.izquierda = true;
	this.direccion = 1;
};

Samus.prototype.TeclaIzquierdaonUp = function(){
	if(this.arriba){
		this.animations.play('ArribaI');
	}else if(this.abajo){
		this.animations.play('AgachadoIzquierda');
	}else if(direccion == 1){
		this.animations.play('QuietoIzquierda');
	}
	this.izquierda = false;
};

Samus.prototype.TeclaAbajoPresionado = function(){
	if(!this.arriba){
		if(this.derecha){
			this.animations.play('BolitaD');
		}else if(this.izquierda){
			this.animations.play('BolitaI');
		}else if(this.direccion == 0 ){
			this.animations.play('AgachadoDerecha');
		}else if(this.direccion == 1){
			this.animations.play('AgachadoIzquierda');
		}
	}
	this.abajo = true;
};

Samus.prototype.TeclaAbajoonUp = function(){
	if(!this.arriba){
		if(this.derecha){
			this.animations.play('Derecha');
		}else if(this.izquierda){
			this.animations.play('Izquierda');
		}else if(this.direccion == 0){
			this.animations.play('QuietoDerecha');
		}else if(this.direccion == 1){
			this.animations.play('QuietoIzquierda');
		}
	}

	this.abajo = false;
};

Samus.prototype.update = function(){

};

Samus.prototype.loadAnimations = function(){
	this.animations.add('ArribaD',[
		'Arriba/1.png'],10,true,false);
	this.animations.add('ArribaI',[
		'Arriba/0.png'],10,true,false);

	this.animations.add('BolitaD',[
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
		'Bolita/1.png',
		'Bolita/0.png'],15,false,false);
	this.animations.add('BolitaI',[
		'Bolita/12.png',
		'Bolita/11.png',
		'Bolita/10.png',
		'Bolita/9.png',
		'Bolita/8.png',
		'Bolita/7.png',
		'Bolita/6.png',
		'Bolita/5.png',
		'Bolita/4.png',
		'Bolita/3.png',
		'Bolita/2.png',
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
		'QuietoDerecha/0.png'],true,false);
	this.animations.add('AgachadoDerecha',[
		'QuietoDerecha/1.png',
		'QuietoDerecha/2.png',
		'QuietoDerecha/3.png',
		'QuietoDerecha/4.png',
		'QuietoDerecha/5.png'],true,false);

	this.animations.add('QuietoIzquierda',[
		'QuietoIzquierda/0.png'],true,false);
	this.animations.add('AgachadoIzquierda',[
		'QuietoIzquierda/1.png',
		'QuietoIzquierda/2.png',
		'QuietoIzquierda/3.png',
		'QuietoIzquierda/4.png',
		'QuietoIzquierda/5.png'],true,false);

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

};
