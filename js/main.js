
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
        updateScore(KEY_PLAYER_SCORE);
        init();
        //ball.angle = ball.angle === DOWN_LEFT ? DOWN_RIGHT : UP_RIGHT;
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
        isGameOn = false;
        clearInterval(interval);
        updateScore(KEY_COMPUTER_SCORE);
        init();
        //ball.angle = ball.angle === DOWN_RIGHT ? DONW_LEFT : UP_LEFT;
    }

}

init();





