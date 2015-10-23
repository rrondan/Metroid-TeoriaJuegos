Platform = function(game,floorPool,numTiles,x,y,speed,enemysPool){
    Phaser.Group.call(this,game);
    this.enableBody = true;
    
    this.enemysPool = enemysPool;
    this.floorPool = floorPool;
    this.game = game;
    this.tileSize = 40;
    this.prepare(numTiles,x,y,speed);
}

Platform.prototype = Object.create(Phaser.Group.prototype);

Platform.prototype.constructor = Platform;

Platform.prototype.prepare = function(numTiles,x,y,speed,enemysPool){
  // console.log(numTiles,x,y,speed);
    this.alive = true;
    var i = 0;
    
    while(i < numTiles){
        
        var floor = this.floorPool.getFirstExists(false); //get first dead para el parcial
        if (!floor) {
            floor = new Phaser.Sprite(this.game,x+i*this.tileSize,y,'floor_tile');
        }else{
            floor.reset(x+i*tileSize,y);
        }
        this.add(floor);
        i++;
    }
    this.setAll('body.immovable',true);
    this.setAll('body.allowGravity',false);
    this.setAll('body.velocity.x',speed);
    this.addEnemy(speed);
    
}

Platform.prototype.addEnemy = function(speed){
    var enemyY = 220   ;//+ Math.random()*110;
    var hasEnemy;
    this.forEach(function(tile){
        hasEnemy = Math.random()<=0.4;
        if(hasEnemy){
            var enemy = this.enemysPool.getFirstExists(false);//false trae muertos, true trae cualquiera
           // console.log(enemy);
            if(!enemy){
                enemy = new Phaser.Sprite(this.game,tile.x,tile.y-enemyY,'enemy');
                enemy.animations.add('moving',[0,1,2,3,2,1],8,true);
                enemy.play('moving');
                this.enemysPool.add(enemy);
                //console.log(enemy);
            }else{
                enemy.reset(tile.x,tile.y-enemyY)
               
               
            }
             enemy.body.velocity.x = speed;
             enemy.body.allowGravity = false;
        }
    },this);
    
}

Platform.prototype.kill = function(){
    
    this.callAll("kill"); // como el setAll
    var sprites = [];
    this.forEach(function(tile){    sprites.push(tile);   },this);
    sprites.forEach(function(tile){ this.floorPool.add(tile);   },this);
}