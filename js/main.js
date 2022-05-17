const $board = $('#board');
const $ball = $('#ball');
const $computerPaddle = $('#computer-paddle');
const $playerPaddle = $('#player-paddle');

const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = - Math.PI / 4;
const DONW_LEFT = 3 * Math.PI / 4;
const DOWN_RIGHT = Math.PI / 4;

const PADDLE_UP = -1;
const PADDLE_DOWN = 1;

let ball = null;
let interval = null;
let computerPaddle = null;
let playerPaddle = null;
let isGameOn = true;

computerPaddle = {
    direction: PADDLE_UP,
    SPEED: 3,
    top: $board.height()/2 - $computerPaddle.height()/2
};

playerPaddle = {
    direction: 1,
    SPEED: 50,
    top: $board.height()/2 - $playerPaddle.height()/2
};


document.onkeydown = function(e){
    switch (e.which){
        case 38: //key up
        playerPaddle.direction = PADDLE_UP;
        break;

        case 40: // key down
        playerPaddle.direction = PADDLE_DOWN;
        break;
    }

    updatePlayerPaddle();
}

function init(){

    ball = {
        top: $board.height()/2 - $ball.height()/2,
        left: $board.width()/2 - $ball.width()/2,
        speed: 10,
        angle: UP_LEFT
    };

    $computerPaddle.css({
        top:`${computerPaddle.top}px`
    });

    $playerPaddle.css({
        top:`${playerPaddle.top}px`
    });

    $ball.css({
        top:`${ball.top}px`,
        left:`${ball.left}px`
    });

    startGame();
}

function startGame(){

    interval = setInterval(update, 20);
}

function update(){
    if(!isGameOn) return;
    updateComputerPaddle();
    updateBall();
}

function updateBall(){

    ball.top += ball.speed * Math.sin(ball.angle);
    ball.left += ball.speed * Math.cos(ball.angle);

    $ball.css({
        top: `${ball.top}px`,
        left: `${ball.left}px`
    });

    if(isBallHitTop()){
        if(ball.angle === UP_RIGHT){
            ball.angle = DOWN_RIGHT
        }
        else{
            ball.angle = DONW_LEFT
        }
    }

    if(isBallHitComputerPaddle()){
        ball.angle = ball.angle === DONW_LEFT ? DOWN_RIGHT : UP_RIGHT;
    }

    if(isBallHitLeft()){
        isGameOn = false;
        clearInterval(interval);
    }

    if(isBallHitBottom()){
        if(ball.angle === DOWN_RIGHT){
            ball.angle = UP_RIGHT;
        }
        else{
            ball.angle = UP_LEFT;
        }
    }

    if(isBallHitPlayerPaddle()){
      ball.angle = ball.angle === DOWN_RIGHT ? DONW_LEFT : UP_LEFT;
    }

    if(isBallHitRight()){
        //isGameOn = false;
        //clearInterval(interval);
        console.log(ball.angle);
        ball.angle = ball.angle === DOWN_RIGHT ? DONW_LEFT : UP_LEFT;
    }

}

function updatePlayerPaddle(){

    playerPaddle.top += playerPaddle.direction * playerPaddle.SPEED;

    if(playerPaddle.top <= 0){
        playerPaddle.top = 0;
    }

    if(playerPaddle.top >= $board.height() - $playerPaddle.height()){
        playerPaddle.top = $board.height() - $playerPaddle.height();
    }

    $playerPaddle.css({
        top:`${playerPaddle.top}px`
    });

}

function updateComputerPaddle(){

    if(ball.top < computerPaddle.top){
        computerPaddle.direction = -1;
    }

    if(ball.top > computerPaddle.top){
        computerPaddle.direction = 1;
    }

    computerPaddle.top += computerPaddle.direction * computerPaddle.SPEED;

    if(computerPaddle.top > $board.height() - $computerPaddle.height()){
        //computerPaddle.direction = -1;
        computerPaddle.top = $board.height() - $computerPaddle.height();
    }

    if(computerPaddle.top < 0){
        //computerPaddle.direction = 1;
        computerPaddle.top = 0;
    }

    

    $computerPaddle.css({
        top:`${computerPaddle.top}px`
    });

}




function isBallHitTop(){
    return ball.top <= 0;
}

function isBallHitLeft(){
    return ball.left <= 0;
}

function isBallHitBottom(){
    return ball.top >= $board.height() - $ball.height();
}

function isBallHitRight(){
    return ball.left >= $board.width() - $ball.width();
}

function isBallHitPlayerPaddle(){
  return $ball.position().left + $ball.width() >= $playerPaddle.position().left && ($ball.position().top + $ball.height()/2 > $playerPaddle.position().top && $ball.position().top + $ball.height()/2 < $playerPaddle.position().top + $playerPaddle.height() );
}

function isBallHitComputerPaddle(){
    return $ball.position().left <= $computerPaddle.width() && $ball.position().top >= $computerPaddle.position().top && $ball.position().top + $ball.height() <= $computerPaddle.position().top + $computerPaddle.height();
}

init();





