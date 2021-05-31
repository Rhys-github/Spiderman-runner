 var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spidy, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var PowerGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;
var web , webImg , webGroup

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("s1.png","s2.png","s3.png");
  trex_collided = loadAnimation("collide1.png");
  
  groundImage = loadImage("bg1.jpg");
  
  cloudImage = loadImage("power2.png");
  
  obstacle1 = loadImage("enemy11.png");
  obstacle2 = loadImage("enemy22.png");
  obstacle3 = loadImage("enemy11.png");
  obstacle4 = loadImage("enemy22.png");
  obstacle5 = loadImage("enemy11.png");
  obstacle6 = loadImage("enemy22.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  webImg = loadImage("web1.png")
}

function setup() {
  createCanvas(500, 200);
  ground = createSprite(300,180,600,20);
  ground.addImage("ground",groundImage);
  ground.scale = 0.4
 // ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.velocityX = -2

  spidy = createSprite(50,180,20,50);
  
  spidy.addAnimation("running", trex_running);
  spidy.scale = 0.2;
  spidy.addAnimation("collided", trex_collided);
  
 
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  PowerGroup = new Group();
  obstaclesGroup = new Group();
  webGroup = new Group();
  
  score = 0;
}

function draw() {
  //spidy.debug = true;
  background("skyBlue");
  
                                                                                                                                             
  if (gameState===PLAY){
    
    //camera.position.x = spidy.x ;
    ground.velocityX = -(6 + 3*score/5);
  ground.velocityX = -6
    if(keyDown("space")) {
      spidy.velocityY = -12;
    }
  
    spidy.velocityY = spidy.velocityY + 0.8
  
    if (ground.x < 175){
      ground.x = 300;
    }
  
    spidy.collide(invisibleGround);
    spawnPower();
    spawnObstacles();
  
  
    if(keyWentDown("S")){
     spawnWeb()

    }
      
      for (var i = 0 ; i < obstaclesGroup.length ; i++){
        if(obstaclesGroup.get(i).isTouching(webGroup)){
          obstaclesGroup.get(i).destroy();
          webGroup.destroyEach()
          score = score+1
        }
      }
      
      for (var i = 0 ; i < PowerGroup.length ; i++){
        if(PowerGroup.get(i).isTouching(spidy)){
          PowerGroup.get(i).destroy();
          score = score+1
        }
      }
    
    if(obstaclesGroup.isTouching(spidy)){
        gameState = END;
    } 
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    spidy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    PowerGroup.setVelocityXEach(0);
    
    
    //change the trex animation
    spidy.changeAnimation("collided",trex_collided);
    spidy.scale = 1
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    PowerGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  
  
  drawSprites();
  fill("white")
  text("Score: "+ score, 300,50)
}

function spawnWeb() {
  //write code here to spawn the clouds
 
    var web = createSprite(spidy.x,120,40,10);
    web.y = spidy.y
    web.addImage(webImg);
    web.scale = 0.1;
    web.velocityX = 3;
    
     //assign lifetime to the variable
    web.lifetime = 200;
    
    //adjust the depth
    web.depth = spidy.depth;
    spidy.depth = spidy.depth + 1;
    
    //add each cloud to the group
    webGroup.add(web);
  
  
}

function spawnPower() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var power = createSprite(600,120,40,10);
    power.y = Math.round(random(80,120));
    power.addImage(cloudImage);
    power.scale = 0.1;
    power.velocityX = -3;
    
     //assign lifetime to the variable
    power.lifetime = 200;
    
    //adjust the depth
    power.depth = spidy.depth;
    spidy.depth = spidy.depth + 1;
    
    //add each cloud to the group
    PowerGroup.add(power);
  }
  
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
   obstacle.velocityX = -(6 + 3*score/5);
  obstacle.velocityX = -2
    obstacle.y = Math.round(random(50,165))
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2  ;
    obstacle.lifetime = 300;
   // obstacle.debug = true
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  PowerGroup.destroyEach();
  
  spidy.changeAnimation("running",trex_running);
  spidy.scale = 0.2
 
  
  score = 0;
  
}