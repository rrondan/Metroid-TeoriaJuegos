//SAMUS JS
Samus = function(game,x,y,background,bullets){

	Phaser.Sprite.call(this,game,x,y,'SammusAssets');

	this.game = game;
	this.background = background;
	this.velocidad = 150;
	this.bullets = bullets;

	game.physics.arcade.enable(this);

	this.body.collideWorldBounds = true;
	this.body.allowGravity = true;

	this.anchor.setTo(0.5,0.5);
	game.camera.follow(this);
	game.physics.arcade.enable(this);

	this.loadAnimations();

	game.add.existing(this);

	this.inputEnabled = true;

	this.bindKeys();

	this.animations.play('ParadoDerecha');

	this.derecha = true;
	this.izquierda = false;
	this.arriba = false;
	this.abajo = false;
	this.direccion = 0; //Derecha = 0 , Izquierda = 1
	this.referencePoint = game.make.sprite(10, 0, null);
	game.physics.enable(this.referencePoint);
		this.referencePoint.body.allowGravity = false;
	this.addChild(this.referencePoint);

	this.elapsed = 0;
	this.limit = 1000;

};

Samus.prototype = Object.create(Phaser.Sprite.prototype);
Samus.prototype.constructor = Samus;

Samus.prototype.bindKeys = function(){

	TeclaArriba = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	TeclaArriba.onDown.add(this.TeclaArribaPresionado,this);
	TeclaArriba.onUp.add(this.TeclaArribaonUp,this);

	TeclaAbajo = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
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
	if( this.derecha && !this.izquierda){
		this.animations.play('DiagonalDerecha');	
		//this.body.velocity.x = 200;
	}else if( this.izquierda && !this.derecha){
		this.animations.play('DiagonalIzquierda');
	//	this.body.velocity.x = -200;
	}else if( this.direccion == 0){
		this.animations.play('ArribaD');
		//this.body.velocity.x = 0;
	}else if( this.direccion == 1){
		this.animations.play('ArribaI');
	//	this.body.velocity.x = 0;
	}
	this.arriba = true;	
};



Samus.prototype.TeclaArribaonUp = function(){
	if(!this.derecha && !this.izquierda){
		if(this.direccion == 0){
			this.animations.play('QuietoDerecha')
			this.body.velocity.x = 0;
		}else if(this.direccion == 1){
			this.animations.play('QuietoIzquierda')
			this.body.velocity.x = 0;
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
		//this.body.velocity.x = 200;

		}else if(this.abajo){
			this.animations.play('BolitaD');
	//	this.body.velocity.x = 200;

		}
	}else if(this.arriba){
		this.animations.play('DiagonalDerecha');
	//	this.body.velocity.x = 200;

	}
	this.derecha = true;
	this.direccion = 0;
};

Samus.prototype.TeclaDerechaonUp = function(){
	if(this.arriba){
		this.animations.play('ArribaD');
		this.body.velocity.x = 0;
	}else if(this.abajo){
		this.animations.play('AgachadoDerecha');
		this.body.velocity.x = 0;
	}else if (this.direccion == 0 ){
		this.animations.play('QuietoDerecha');
		this.body.velocity.x = 0;
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
	if(this.arriba && !this.derecha){
		this.animations.play('ArribaI');
		this.body.velocity.x = 0;
	}else if(this.abajo){
		this.animations.play('AgachadoIzquierda');
		this.body.velocity.x = 0;
	}else if(this.direccion == 1){
		this.animations.play('QuietoIzquierda');
		this.body.velocity.x = 0;
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
			this.body.velocity.x = 0;
		}else if(this.direccion == 1){
			this.animations.play('AgachadoIzquierda');
			this.body.velocity.x = 0;
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
			this.body.velocity.x = 0;
		}else if(this.direccion == 1){
			this.animations.play('QuietoIzquierda');
			this.body.velocity.x = 0;
		}
	}


	this.abajo = false;
};

Samus.prototype.update = function(){
console.log(this.body.velocity.x);


	if(!this.derecha && !this.izquierda && !this.body.touching.down)
	{
		this.body.velocity.x =0;
		this.background.autoScroll(0,0);
	}

	 if(!this.izquierda && this.arriba && !this.derecha){
            this.body.velocity.x = 0;

			this.elapsed+= this.game.time.elapsed;
            
            if(this.elapsed>=this.limit){
                this.elapsed = 0;
            	this.createBullet(0 ,-100,10);
            }
  }

	if(this.izquierda && !this.arriba){

            this.body.velocity.x = -250;

         //   this.anchor.setTo(0.5,0.5);
            Global.worldSpeed = -200;
            this.elapsed+= this.game.time.elapsed;
            
            if(this.elapsed>=this.limit){
                this.elapsed = 0;
            	this.createBullet(this.body.velocity.x -150 ,0,0);
            }
            this.background.autoScroll(-Global.worldSpeed,0);
	}

    if(this.derecha && !this.arriba){
            this.body.velocity.x = 250;
            this.elapsed+= this.game.time.elapsed;
            if(this.elapsed>=this.limit){
                this.elapsed = 0;
                this.createBullet(this.body.velocity.x + 150,0,40);
            }

            Global.worldSpeed = 200;
            this.background.autoScroll(-Global.worldSpeed,0);
    }

    if(this.arriba && this.derecha && !this.izquierda){
        this.body.velocity.x = 250;
        this.elapsed+= this.game.time.elapsed;
        if(this.elapsed>=this.limit){
            this.elapsed = 0;
        this.createBullet(this.body.velocity.x + 150,-50,40);
        }

        Global.worldSpeed = 200;
        this.background.autoScroll(-Global.worldSpeed,0);
	}

	if(this.arriba && !this.derecha && this.izquierda){
		
		this.body.velocity.x = -250;
        this.elapsed+= this.game.time.elapsed;
        if(this.elapsed>=this.limit){
            this.elapsed = 0;
        this.createBullet(this.body.velocity.x - 150,-50,0);
        }

        Global.worldSpeed = 200;
        this.background.autoScroll(-Global.worldSpeed,0);

	}



};

Samus.prototype.createBullet = function(x,y,px){

        var bullet = this.bullets.getFirstDead(false);

        if(!bullet){
            bullet = this.game.add.sprite(0,0,'bullet');

            bullet.x = this.body.x+px;
     
            bullet.y = this.body.y-10;
            this.game.physics.arcade.enable(bullet);
            bullet.body.allowGravity = false; 
            this.bullets.add(bullet);
        }
    
        bullet.body.collideWorldBounds = true;
        bullet.body.velocity.x = x;
        bullet.body.velocity.y = y;

    },


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
		'Bolita/0.png'],15,true,false);
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
		'Bolita/12.png'],15,true,false);

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
		'Derecha/10.png'],15,true,false);

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
		'DiagonalDerecha/11.png'],15,true,false);

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
		'DiagonalIzquierda/10.png'],15,true,false);

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
		'Izquierda/9.png'],15,true,false);

	this.animations.add('QuietoDerecha',[
		'QuietoDerecha/0.png'],true,false);
	this.animations.add('AgachadoDerecha',[
		'QuietoDerecha/1.png',
		'QuietoDerecha/2.png',
		'QuietoDerecha/3.png',
		'QuietoDerecha/4.png',
		'QuietoDerecha/5.png'],15,true,false);

	this.animations.add('QuietoIzquierda',[
		'QuietoIzquierda/0.png'],true,false);
	this.animations.add('AgachadoIzquierda',[
		'QuietoIzquierda/1.png',
		'QuietoIzquierda/2.png',
		'QuietoIzquierda/3.png',
		'QuietoIzquierda/4.png',
		'QuietoIzquierda/5.png'],15,true,false);

	this.animations.add('VolantinDerecha',[
		'VolantinDerecha/0.png',
		'VolantinDerecha/1.png',
		'VolantinDerecha/2.png',
		'VolantinDerecha/3.png',
		'VolantinDerecha/4.png',
		'VolantinDerecha/5.png',
		'VolantinDerecha/6.png',
		'VolantinDerecha/7.png',
		'VolantinDerecha/8.png'],15,false,false);

	this.animations.add('VolantinIzquierda',[
		'VolantinIzquierda/0.png',
		'VolantinIzquierda/1.png',
		'VolantinIzquierda/2.png',
		'VolantinIzquierda/3.png',
		'VolantinIzquierda/4.png',
		'VolantinIzquierda/5.png',
		'VolantinIzquierda/6.png',
		'VolantinIzquierda/7.png',
		'VolantinIzquierda/8.png'],15,false,false);

};
