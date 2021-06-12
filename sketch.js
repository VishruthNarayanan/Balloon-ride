var balloon, background;
function preload() {
  backgroundImg = loadImage("cityImage.png")
  balloonImage = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png");
}

function setup(){
   database = firebase.database();
   console.log(database);
    createCanvas(1500,700);

balloon = createSprite (250,650, 150, 150)
  balloon.addAnimation("balloon", balloonImage);
  balloon.scale = 0.4;

  var balloon1 = database.ref('balloon/position');
  balloon1.on("value", readPosition, showError);
}

function draw(){

    background(backgroundImg);
  
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
      }
      else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
      }
      else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
      }
      else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10);
      }
      drawSprites();
    
  }
  
  function writePosition(x,y){
    database.ref('balloon/position').set({
      'x': position.x + x ,
      'y': position.y + y
    })
  }
  
  function readPosition(data){
    position = data.val();
    console.log(position.x);
    balloon.x = position.x;
    balloon.y = position.y;
  }
    
  function showError(){
    console.log("Error in writing to the database");
  }

