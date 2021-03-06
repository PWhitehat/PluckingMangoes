
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObject;
var mango1,mango2,mango3,mango4,mango5,mango6;
var world,boy;
var mangoBodyPosition, stoneBodyPosition;

function preload(){
	boy=loadImage("images/boy.png");
  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new mango(1100,100,30);
	mango2=new mango(1000,100,20);
	mango3=new mango(1100,170,20);
	mango4=new mango(1175,180,30);
	mango5=new mango(1030,180,40);
	mango6=new mango(925,200,40);

	treeObj=new tree(1050,580);
	groundObject=new ground(width/2,600,width,20);
	stoneObj = new Stone(225, 400, 50);
	launcherObject = new Sling(stoneObj.body, {x: 225, y: 400});

	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
		  width: 1300,
		  height: 600,
		  wireframes: false
		}
	});
	
	Engine.run(engine);

	//Render.run(render);

}

function mouseDragged() {

	Matter.Body.setPosition(stoneObj.body, {x: mouseX, y: mouseY});
  
}
  
function mouseReleased() {
  
	launcherObject.fly();
  
}
  
function keyPressed() {
  
	if (keyCode === 32) {
  
	  Matter.Body.setPosition(stoneObj.body, {x: 200, y: 50});
	  launcherObject.attach(stoneObj.body);
  
	}
  
}

function detectCollision(lstone,lmango){
	/*var collision = Matter.SAT.collides(lstone,lmango);
	if(collision.collided){
		console.log("collided");
		Matter.Body.setStatic(lmango,false);	
	}*/
  mangoBodyPosition=lmango.body.position;
  stoneBodyPosition=lstone.body.position;
  
  var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
  //console.log(distance)
 // console.log(lmango.r+lstone.r)
  	if(distance<=lmango.r+lstone.r)
    {
      //console.log(distance);
  	  Matter.Body.setStatic(lmango.body,false);
    }

  }

function draw() {

  background(230);

  Engine.update(engine);

  fill("black");
  text("Press space to try again!", 100, 100);
  image(boy ,200,340,200,300);
  

  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  stoneObj.display();
  launcherObject.display();
  groundObject.display();

  detectCollision(stoneObj,mango1);
  detectCollision(stoneObj,mango2);
  detectCollision(stoneObj,mango3);
  detectCollision(stoneObj,mango4);
  detectCollision(stoneObj,mango5);
  detectCollision(stoneObj,mango6);

}
