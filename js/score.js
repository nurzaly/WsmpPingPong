
function updateScore(user){

    var score = parseInt(localStorage.getItem(user)) + 1;
    localStorage.setItem(user, score);

    if(score == POINT_PER_ROUND){
        switch(round){
            case 1:
                $playerGame1.text(localStorage.getItem(KEY_PLAYER_SCORE));
                $computerGame1.text(localStorage.getItem(KEY_COMPUTER_SCORE));
            break;

            case 2:
                $playerGame2.text(localStorage.getItem(KEY_PLAYER_SCORE));
                $computerGame2.text(localStorage.getItem(KEY_COMPUTER_SCORE));
            break;

            case 3:
                $playerGame3.text(localStorage.getItem(KEY_PLAYER_SCORE));
                $computerGame3.text(localStorage.getItem(KEY_COMPUTER_SCORE));
            break;
        }

        

        $playerScore.text(localStorage.setItem(KEY_PLAYER_SCORE, 0));
        $computerScore.text(localStorage.setItem(KEY_COMPUTER_SCORE, 0));
        

        if(user == KEY_PLAYER_SCORE){
            playerWin++;
            winnerChecker();
        }

        if(user == KEY_COMPUTER_SCORE){
            computerWin++;
            winnerChecker();
        }

        round++;
    }

    
    $playerScore.text(localStorage.getItem(KEY_PLAYER_SCORE));
    $computerScore.text(localStorage.getItem(KEY_COMPUTER_SCORE));
}

function winnerChecker(){
    if(playerWin == 2){
        $('#restart h2').text('You are the Winner');
        $('#restart-box').show();
    }
    if(computerWin == 2){
        $('#restart h2').text('You are the Loser');
        $('#restart-box').show();
    }
    
}