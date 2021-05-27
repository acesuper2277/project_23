var gameState = 1;
var gameState = 0;
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground,invisibleGround,invisibleGround2;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255);

    invisibleGround=createSprite(700, height-35, 380,10);
    invisibleGround.shapeColor=color(255);

	invisibleGround2=createSprite(100, height-35, 380,10);
	invisibleGround2.shapeColor=color(255);

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100
 	boxY=610;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);


	Engine.run(engine);
  
}


function draw() {


  rectMode(CENTER);
  background(0);

  packageSprite.y= packageBody.position.y
  packageBody.position.y = packageSprite.y

  drawSprites();

  if (packageSprite.isTouching(boxBase)){

	textSize(70);
	fill("cyan")
	text("Package Dilivered!",100,350);
  }

    if (packageSprite.y > 675){

		textSize(70);
		fill("red")
		text("Mission Failed!",190,350);

	}
  }
	

	gameState = 1

function keyPressed(){

	if (keyCode === LEFT_ARROW && gameState === 1){

        packageBody.position.x -= 20;
		packageSprite.x -= 20;
		helicopterSprite.x -= 20;
	  }

	if (keyCode === RIGHT_ARROW && gameState === 1){

		packageBody.position.x += 20;
        packageSprite.x += 20;
		helicopterSprite.x += 20;
	}

	if (keyCode === DOWN_ARROW){

		Matter.Body.setStatic(packageBody,false);
		gameState = 0;

	}
}
