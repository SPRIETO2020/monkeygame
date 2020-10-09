//game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//sprites
var monkey , monkey_running;
var ground;
var banana ,bananaImg, obstacle, obstacleImg;
var bananaGroup, obstacleGroup;
var survivalTime;


function preload(){
  //load monkey animation
  monkey_running = loadAnimation ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  //load images
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
}


function setup() {
  createCanvas (400,400);
  
  //creating monkey sprite
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  //creating ground sprite
  ground = createSprite (400,350,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  survivalTime = 0;
}


function draw() {
  background("white");
  
  //displaying score
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time: "+ survivalTime, 100,50);

  if(gameState === PLAY){
    
    //making ground infinite
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //spawn the bananas
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    /*if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
        gameState = END;
    }*/
  }
  
  monkey.collide(ground);
  
  drawSprites();
}


function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(100,120));
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
  }
}


function spawnObstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(600,330,10,40);
   obstacle.velocityX = -(6 + survivalTime/100);
   obstacle.addImage(obstacleImg);
   obstacle.scale = 0.1;
   obstacle.lifetime = 200;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}