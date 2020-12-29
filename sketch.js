var hBall,position={x:250,y:250};
var database,hBallPosition;

function setup(){
    createCanvas(500,500);
    database=firebase.database();
    hBall = createSprite(250,250,10,10);
    hBall.shapeColor = "red";

    //Refering to the database position
    hBallPosition=database.ref('ball/position');
    hBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position != undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        
        if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
    }
    drawSprites();
}

function writePosition(x1,y1){
    database.ref('ball/position').set(
        {
            x:position.x+x1,
            y:position.y+y1
        }
    )
}

function readPosition(data){
    position=data.val();
    hBall.x=position.x;
    hBall.y=position.y;
}

function showError(){
    console.log('Error');
}
