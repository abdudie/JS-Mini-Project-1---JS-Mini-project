// select the canvas
const canvas = document.getElementById("myGame");
const context = canvas.getContext("2d");

//Draw rectagle Function
function drawRect(x,y,w,h,color){
    context.fillStyle = color
    context.fillRect(x,y,w,h)
}

canvas.getContext

//computer paddle
const com = {
    x: canvas.width/2 - 50/2,
    y: 10,
    width: 80,
    height: 10,
    color: "white",
    score: 0
}


//User Paddle
const user = {
    x: canvas.width/2 - 50/2,
    y: canvas.height - 10 - 10,
    width: 80,
    height: 10,
    color: "white",
    score: 0
}


//Center Line
function centerLine(){
    context.beginPath()
    context.setLineDash([10])
    context.moveTo(0,canvas.height/2)
    context.lineTo(canvas.width,canvas.height/2)
    context.strokeStyle = "white"
    context.stroke()
}


//Draw Circle
function drawCircle(x,y,r,color){
    context.fillStyle = color
    context.beginPath()
    context.arc(x,y,r,0,Math.PI*2,false)
    context.closePath()
    context.fill()
}

//Create a ball
const ball = {
    x:canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 1,
    velocityX: 5,
    velocityY: 5,
    color: "white"
}


//Scores
function drawText(text,x,y,color){
    context.fillStyle = color
    context.font = "32px josefine sans"
    context.fillText(text,x,y)
}



//render The Game
function render(){
    //Make canvas
    drawRect(0,0,400,600, "black")
    // conputer paddle
    drawRect(com.x,com.y,com.width,com.height,com.color)
    //user paddle
    drawRect(user.x,user.y,user.width,user.height,user.color)
    //CenterLine
    centerLine()
    //Ball
    drawCircle(ball.x, ball.y, ball.radius, "white")
    //scores of user and com
    drawText(com.score,20,canvas.height/2-30)
    drawText(user.score,20,canvas.height/2+50)

}
//control user paddle
// canvas.addEventListener("mousemove", movepaddle);
// function movepaddle(e){
//     let rect = canvas.getBoundingClientRect();
//     user.x = e.clientX - rect.left - user.width/2;
// }

//control the upper paddle
window.addEventListener('keydown', control)
function control(e){
    if(e.keyCode === 37){
        if(com.x>50){
            com.x -= 80;
        }
      
    } else if(e.keyCode === 39){
        if(com.x<310){
            com.x += 80
        }
    
    }
    else if(e.keyCode === 65){
        if(user.x>50){
            user.x -= 80;
        }
      
    } else if(e.keyCode === 68){
        if(user.x<310){
            user.x += 80
        }
    
    }
}

//collision detection
function collision(b,p){ //b-ball, p-player
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return p.right > b.left && p.left < b.right && b.bottom > p.top && b.top < p.bottom
}

//reset ball
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speed = 1;
    ball.velocityY = -ball.velocityY;
}

//game Over function
function ShowGameOver(){
    //Hide Canvas
    canvas.style.display = "none";
    const ping = document.getElementById("ping")
    ping.style.display = "none";
    //container
    const result = document.getElementById("result");
    result.style.display = "block"

}
//update
function update(){
    ball.x += ball.velocityX*ball.speed;
    ball.y += ball.velocityY*ball.speed; 

    //control the computer paddle
    // let computerLevel = 0.1;
    // com.x += (ball.x - (com.x + com.width/2)) + computerLevel;
    // if(ball.speed > 2){
    //     com.x += ball.x + 100;
    // }

    //reflect the ball
    if(ball.x+ball.radius>canvas.width || ball.x - ball.radius < 0){
        ball.velocityX = -ball.velocityX;
    }

    // if collision happens
    let player = (ball.y < canvas.height/2) ? com : user;
    if(collision(ball, player)){
        ball.velocityY = -ball.velocityY;
        // ball.speed += 0.1;
    }

    // points
    if(ball.y - ball.radius < 0){
        user.score++;
        resetBall();
    } else if(ball.y + ball.radius > canvas.height){
        com.score++;
        resetBall();
    }

    //Game over
    if(user.score>4 || com.score>4){
        clearInterval(loop);
        ShowGameOver();
    }
}

//start the game
function start(){
    update();
    render();
}

//loop
const loop = setInterval(start, 1000/50)
