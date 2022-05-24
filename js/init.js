
//Object instant
const $board = $('#board');
const $ball = $('#ball');
const $computerPaddle = $('#computer-paddle');
const $playerPaddle = $('#player-paddle');
const $playerScore = $('#player-score');
const $computerScore = $('#computer-score');
const $computerGame1 = $('#computer-game1');
const $computerGame2 = $('#computer-game2');
const $computerGame3 = $('#computer-game3');
const $playerGame1 = $('#player-game1');
const $playerGame2 = $('#player-game2');
const $playerGame3 = $('#player-game3');


//Ball direction
const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = - Math.PI / 4;
const DONW_LEFT = 3 * Math.PI / 4;
const DOWN_RIGHT = Math.PI / 4;

const POINT_PER_ROUND = 2;
const KEY_PLAYER_SCORE = 'playerScore';
const KEY_COMPUTER_SCORE = 'computerScore';


const TIME = 30;
const DIRECTION = Array(UP_LEFT, UP_RIGHT, DONW_LEFT, DOWN_RIGHT);

const PADDLE_UP = -1;
const PADDLE_DOWN = 1;

let ball = null;
let interval = null;
let computerPaddle = null;
let playerPaddle = null;
let isGameOn = true;
let round = 1;

computerPaddle = {
    direction: PADDLE_UP,
    SPEED: 1,
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

$(document).ready(function(){

    localStorage.setItem(KEY_COMPUTER_SCORE, 0);
    localStorage.setItem(KEY_PLAYER_SCORE, 0);

    $board.click(function(){
        startGame();
    });
});

function init(){

    ball = {
        top: $board.height()/2 - $ball.height()/2,
        left: $board.width()/2 - $ball.width()/2,
        speed: 10,
        angle: DIRECTION[Math.floor(Math.random() * (3 - 0) + 0)]
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
}

function startGame(){
    isGameOn = true;
    interval = setInterval(update, TIME);
}
