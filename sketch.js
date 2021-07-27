var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 5;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.setCollider("circle", 0, 0, 800);
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

//boy.debug = true;

}

function draw() {

  if(gameState===PLAY){
      background(0);
      boy.x = World.mouseX;

      path.velocityY=path.velocityY+0.0075;

      edges= createEdgeSprites();
      boy.collide(edges);
    
    //code to reset the background
      if(path.y > 400 ){
        path.y = height/3.5;
      }
    
      createCash();
      createDiamonds();
      createJwellery();
      createSword();
  
      if (cashG.isTouching(boy)){
        cashG.destroyEach();
        treasureCollection=treasureCollection+50;
      }


      if (jwelleryG.isTouching(boy)){
        jwelleryG.destroyEach();
        treasureCollection=treasureCollection+100;
      }


      if (diamondsG.isTouching(boy)){
        diamondsG.destroyEach();
        treasureCollection=treasureCollection+150;  
      }


      if (swordGroup.isTouching(boy)) {
          gameState=END;
      }

  }

  if (gameState===END){
    cashG.setLifetimeEach(-1);
    cashG.setVelocityYEach(0);
    diamondsG.setLifetimeEach(-1);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setLifetimeEach(-1);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setLifetimeEach(-1);
    swordGroup.setVelocityYEach(0);
    path.velocityY = 0;
    boy.addAnimation("SahilRunning", endImg);
    boy.x =200;
    boy.y = 300;
    boy.scale=1;
    cashG.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    swordGroup.destroyEach();

  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = path.velocityY;
  cash.lifetime = 600;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = path.velocityY;
  //diamonds.velocityY = 3;
  diamonds.lifetime = 600;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = path.velocityY;
  //jwellery.velocityY = 3;
  jwellery.lifetime = 600;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = path.velocityY;
  //sword.velocityY = 3;
  sword.lifetime = 600;
  swordGroup.add(sword);
  }
}