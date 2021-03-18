var towerImg, tower;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostImg;
var invisibleblock, invisibleblockGroup;
var gameState="play";
var gamestate="end";

var spookysound;

function preload(){
  towerImg =loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png", "ghost-jumping.png");
  spookysound = loadSound("spooky.wav");
  
}





function setup() {
  createCanvas(600, 600);
  
  spookysound.loop();
  
  tower=createSprite(300,300);
  tower.addImage("tower" ,towerImg);
  tower.velocityY=1;
  
  doorsGroup= new Group();
  climbersGroup = new Group();
  invisibleblockGroup = new Group();
  
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage("ghost", ghostImg);
  
  
}

function draw() {
  background(0);
  
  if (gameState === "play"){
  
  if (tower.y > 400){
    tower.y=300;
  }
  
  if (keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if (climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
      }
  if(invisibleblockGroup.isTouching(ghost)|| ghost.y>600){
     ghost.destroy();
    gameState="end";
     }
  
  spawndoors();
  drawSprites();
  }
  if (gameState === "end"){
stroke("yellow");
    fill("yellow");
    textSize(40);
    text("Game Over", 230, 250);
  }
}


function spawndoors(){
  if (frameCount%240===0){
    var door=createSprite(200,-50);
    var climber=createSprite(200,10);
    var invisibleblock=createSprite(200,15);

    invisibleblock.width=climber.width;
    invisibleblock.height=2;
    
    door.x=Math.round(random(120,400));
    climber.x=door.x;
      invisibleblock.x=door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    
    door.velocityY=1;
    climber.velocityY=1;
    invisibleblock.velocityY=1;

    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    door.lifetime=800;
    climber.lifetime=800;
    invisibleblock.lifetime=800;
    
    doorsGroup.add(door);
        invisibleblock.debug=true;
    climbersGroup.add(climber);
    invisibleblockGroup.add(invisibleblock);
    
  
  }
}

