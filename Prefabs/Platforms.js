Platform = function(game,floorPool,numTiles,x,y,speed,coinsPool){
    Phaser.Group.call(this,game);
    this.enableBody = true;
    
    this.coinsPool = coinsPool;
    this.floorPool = floorPool;
    this.game = game;
    this.tileSize = 40;
    this.prepare(numTiles,x,y,speed);
}

Platform.prototype = Object.create(Phaser.Group.prototype);

Platform.prototype.constructor = Platform;

Platform.prototype.prepare = function(numTiles,x,y,speed,coinsPool){
  // console.log(numTiles,x,y,speed);
    this.alive = true;
    var i = 0;
    
    while(i < numTiles){
        
        var floor = this.floorPool.getFirstExists(false); //get first dead para el parcial
        if (!floor) {
            floor = new Phaser.Sprite(this.game,x+i*this.tileSize,y,'floor');
        }else{
            floor.reset(x+i*tileSize,y);
        }
        this.add(floor);
        i++;
    }
    this.setAll('body.immovable',true);
    this.setAll('body.allowGravity',false);
    this.setAll('body.velocity.x',speed);
    this.addCoins(speed);
    
}

Platform.prototype.addCoins = function(speed){
    var coinsY = 90 + Math.random()*110;
    var hascoin;
    this.forEach(function(tile){
        hascoin = Math.random()<=0.4;
        if(hascoin){
            var coin = this.coinsPool.getFirstExists(false);//false trae muertos, true trae cualquiera
           // console.log(coin);
            if(!coin){
                coin = new Phaser.Sprite(this.game,tile.x,tile.y-coinsY,'coin');
                this.coinsPool.add(coin);
                //console.log(coin);
            }else{
                coin.reset(tile.x,tile.y-coinsY)
               
               
            }
             coin.body.velocity.x = speed;
             coin.body.allowGravity = false;
        }
    },this);
    
}

Platform.prototype.kill = function(){
    
    this.callAll("kill"); // como el setAll
    var sprites = [];
    this.forEach(function(tile){    sprites.push(tile);   },this);
    sprites.forEach(function(tile){ this.floorPool.add(tile);   },this);
}