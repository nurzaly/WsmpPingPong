
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
        ball.angle = ball.angle === UP_RIGHT ? DOWN_RIGHT : DONW_LEFT;
    }

    if(isBallHitComputerPaddle()){
        sound.play();
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
        ball.angle = ball.angle === DOWN_RIGHT ? UP_RIGHT : UP_LEFT;
    }

    if(isBallHitPlayerPaddle()){
        sound.play();
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





