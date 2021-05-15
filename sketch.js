var dog,sadDog,happyDog,database;
var foodS,foodStock;
var feed,addFood;
var foodObj;
var milkObj,mImage,foodn;
var name1,feedTime,gameState=1,readState;
var lastFed,currentTime,Iname,name2,vmilk;
var deaddog,bedroom,garden,injection,livingroom,runningright,runningleft,washroom,lazyDog,foodI,foodAvailable,bathB,sleepB,playB,letsplayB;

function preload(){
sadDog     =   loadImage("images/dogImg.png");
happyDog  =    loadImage("images/dogImg1.png");
mImage     =   loadImage("images/milk.png");
deaddog    =   loadImage("images/deadDog.png");
bedroom =      loadImage("images/Bed Room.png");
garden =       loadImage("images/Garden.png");
injection =    loadImage("images/Injection.png");
livingroom =   loadImage("images/Living Room.png");
lazyDog =      loadImage("images/Lazy.png");
runningright = loadImage("images/running.png");
runningleft =  loadImage("images/runningLeft.png");
washroom =     loadImage("images/Wash Room.png");
foodI     =    loadImage("images/Food Stock.png");
}

function setup() {
  
  database=firebase.database();
  foodStock=database.ref('food')
  foodStock.on("value",readStock);
  createCanvas(500,500);
  
  //foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  Iname = database.ref('Name');
  Iname.on("value",function(data){
    name2=data.val();
  });
    
          
  dog=createSprite(250,600,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodAvailable = createSprite(400,120,10,10);
  foodAvailable.addImage(foodI);
  foodAvailable.scale=0.1;
  
  feed=createButton("Feed the dog");
  feed.position(360,55);
  //feed.mousePressed(feedDog);
  

  addFood=createButton("Add Food");
  addFood.position(460,55);
  //addFood.mousePressed(addFoods);
  
  bathB = createButton("I want to take bath");
  bathB.position(540,55);
  

  sleepB = createButton("I want to sleep");
  sleepB.position(670,55);
  

  playB=createButton("Let's Play!!");
  playB.position(700,83);
  

  letsplayB=createButton("Let's Play in park");
  letsplayB.position(570,83);
  
  name1 = createInput("MUKU");
  name1.position(550,510);
  
  }

function draw() {
  currentTime = hour();
  background(46,139,87);
  /*if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
 }else if(currentTime==(lastFed+2)){
  update("Sleeping");
    foodObj.bedroom();
 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
    foodObj.washroom();
 }else{
  update("Hungry")
  foodObj.display();
 }*/

 if(foodS ==0){
   dog.addImage(happyDog);
  // foodObj.visble=false;
 }else{
   dog.addImage(sadDog);
  // foodObj.visible=true;
 }

 if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
    text(":" +   foodS ,450,120);
 }
 if(gameState===2){
  dog.addImage(sadDog);
  dog.scale=0.175;
 //foodObj.visible=false;
  dog.y=250;
  text(":" +   foodS ,450,120);
}
if(bathB.mousePressed(function(){
  gameState=3;
  database.ref('/').update({'gameState':gameState});
}));

if(gameState===3){
  dog.addImage(washroom);
  dog.scale=1.05;
 //foodObj.visble=false;
 text(":" +   foodS ,450,120);
}
if(sleepB.mousePressed(function(){
  gameState=4;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===4){
  dog.addImage(bedroom);
  dog.scale=1;
// foodObj.visble=false;
text(":" +   foodS ,450,120);
}
if(playB.mousePressed(function(){
  gameState=5;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===5){
  dog.addImage(livingroom);
  dog.scale=1;
 // foodObj.visble=false;
 text(":" +   foodS ,450,120);
}
if(letsplayB.mousePressed(function(){
  gameState=6;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===6){
  dog.addImage(garden);
  dog.scale=1;
 //foodObj.visble=false;
  dog.y=175;
  text(":" +   foodS ,450,120);
  }

if(feed.mousePressed(function(){
  lastFed=hour()
  foodS=foodS-1;
  gameState=1;
  database.ref('/').update({'gameState':gameState});
  database.ref('/').update({
        FeedTime :hour(),
        lastFed : hour(),
     
   })
}));
if(addFood.mousePressed(function(){
  foodS=foodS+1;
  gameState=2;
  database.ref('/').update({'gameState':gameState});
  database.ref('/').update({
    Food:foodS
      })
}));



  textSize(20);
  stroke("pink");
  strokeWeight(2);
  text(":" +   foodS ,450,120);
  text("Name your dog :" ,20,475)
  stroke("pink");
  strokeWeight(2);
  textSize(18); 
  console.log(gameState);
  
   
  


  if (lastFed>=12){
    text("LAST FED :" + lastFed + "th Hour",20,50);
  }
  else if (lastFed===0){
    text("LAST FED : 12AM ",20,50);
  } 
  else{
    text("LAST FED :" + feedTime + "th Hour",20,50);
  }

  if(foodS<=0){
    foodS=0;
  }

  
    //console.log(currentTime);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
 
}
function writeStock(x){
  database.ref('/').update({
    food:x
  })
}


//function to update food stock and last fed time
function feedDog(){
  if(foodS>0){
   dog.addImage(happyDog);
 //  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime :hour(),
      //lastFed : hour(),
    
  })
}
}

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog);
//  foodObj.updateFoodStock(foodObj.getFoodStock()+1);
  foodS++;
  database.ref('/').update({
    Food:foodS
      })
}

//function to update gameStatesin database
function update(state){
  database.ref('/').update({
    gameState:state
  });
}





 /*if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
  }else{
    feed.show();
    addFood.show();
    text("I'am not hungry",200,200);
    dog.addImage(sadDog);
  }
  if (gameState==="Playing"){
    textSize(25);
    stroke("yellow");
    strokeWeight(3);
    //text("Let's Play",200,50);
    name1.hide();
    background();
    }else if(gameState==="Sleeping"){
      textSize(25);
      stroke("red");
      strokeWeight(3);
      text("Good Night",200,50);
      background();
    }else if (gameState==="Bathing"){
      textSize(25);
      stroke("red");
      strokeWeight(3);
      text("Hmmmm",200,50);
      background();
    }*/
  
