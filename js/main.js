const $board = $('#board');
const $ball = $('#ball');
const $computerPaddle = $('#computer-paddle');

const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = - Math.PI / 4;
const DONW_LEFT = 3 * Math.PI / 4;
const DOWN_RIGHT = Math.PI / 4;

let ball = null;
let interval = null;
let computerPaddle = null;

function setup(){
    computerPaddle = {
        direction: 1,
        SPEED: 5,
        top: $board.height()/2 - $computerPaddle.height()/2
    };

    ball = {
        top: 200,
        left: 200,
        speed: 5,
        angle: UP_LEFT
    };

    $computerPaddle.css({
        top:`${computerPaddle.top}px`
    })
}

function init(){

    

    interval = setInterval(update, 30);
}

function update(){
    //updateComputerPaddle();
    updateBall();
}

function updateBall(){

    ball.top += ball.speed * Math.sin(ball.angle);
    ball.left += ball.speed * Math.cos(ball.angle);

    $ball.css({
        top: `${ball.top}px`,
        left: `${ball.left}px`
    });

    if(isBallOverlapTop()){
        if(ball.angle === UP_RIGHT){
            ball.angle = DOWN_RIGHT
        }
        else{
            ball.angle = DONW_LEFT
        }
    }

}

function updateComputerPaddle(){

    if(computerPaddle.top > $board.height() - $computerPaddle.height()){
        computerPaddle.direction = -1;
    }

    if(computerPaddle.top < 0){
        computerPaddle.direction = 1;
    }

    computerPaddle.top += computerPaddle.direction * computerPaddle.SPEED;

    $computerPaddle.css({
        top:`${computerPaddle.top}px`
    });

}




function isBallOverlapTop(){
    return ball.top <= 0;
}

function ifBallOverLapLeft(){
    return ball.left <= 0;
}

setup();





