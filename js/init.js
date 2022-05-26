
//Object instant
const $modalBox = $('#modal-box');
const $btnStart = $('#btn-start');
const $mode = $('#mode');

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
const KEY_GAME_MODE = 'gameMode';
const KEY_GAME_MODE_NAME = 'gameModeName';
const MODE_EASY = 1;
const MODE_MEDIUM = 2;
const MODE_HARD = 3;


const TIME = 30;
const DIRECTION = Array(UP_LEFT, UP_RIGHT, DONW_LEFT, DOWN_RIGHT);

const PADDLE_UP = -1;
const PADDLE_DOWN = 1;

let ball = null;
let interval = null;
let computerPaddle = null;
let playerPaddle = null;
let isGameOn = false;
let round = 1;
let playerWin = 0;
let computerWin = 0;
let sound = new Audio('audio/bounce.mp3');



document.onkeydown = function(e){

    if(!isGameOn) return;

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
    localStorage.setItem(KEY_GAME_MODE, 0);

    $('#modal-box h2').hide();
    $btnStart.click(function(){
        if(parseInt(localStorage.getItem(KEY_GAME_MODE)) >= 1){
            $modalBox.hide();
        }
        else{
            $('#modal-box h2').text('Please select game mode to start').show();
        }
    });

    $('#modal-box ul li').click(function(){
        localStorage.setItem(KEY_GAME_MODE, $(this).data('value'));
        localStorage.setItem(KEY_GAME_MODE_NAME, $(this).text());
        $mode.text(localStorage.getItem(KEY_GAME_MODE_NAME));
        $('#modal-box ul li').css('background-color','transparent ');
        $('#modal-box h2').text('').hide();
        $(this).css('background-color', 'red');
    })

    $('#btn-restart').click(function(){
        location.reload();
    });

    $board.click(function(){
        if(!isGameOn) startGame();
    });

    
});

function init(){

    computerPaddle = {
        direction: PADDLE_UP,
        SPEED: 2,
        top: $board.height()/2 - $computerPaddle.height()/2
    };
    
    playerPaddle = {
        direction: 1,
        SPEED: 50,
        top: $board.height()/2 - $playerPaddle.height()/2
    };

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
    computerPaddle.SPEED *= parseInt(localStorage.getItem(KEY_GAME_MODE));
    console.log(computerPaddle.SPEED);
    interval = setInterval(update, TIME);
}
