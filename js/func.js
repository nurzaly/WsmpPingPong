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

    if(ball.top + $ball.height()/2 < computerPaddle.top + $computerPaddle.height()/2){
        computerPaddle.direction = -1;
    }

    if(ball.top + $ball.height()/2 > computerPaddle.top + $computerPaddle.height()/2){
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