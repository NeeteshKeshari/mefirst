var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

// Roll dice Event
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice1 === 6 && dice2 === 6) {
            //Player looses score if two 6 dice will come
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('flash-effect');
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            document.querySelector('.boy-img-' + activePlayer).style.left = '0';
            setTimeout(function(){
              document.querySelector('.player-' + activePlayer + '-panel').classList.remove('flash-effect');
            }, 1200);
            setTimeout(nextPlayer, 2000);
        }
        else if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            setTimeout(nextPlayer, 500);
        }
    }
});

// Hold Button Event
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        document.querySelector('.boy-img-' + activePlayer).style.left = scores[activePlayer] + '%';

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 93;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

// Next Player Funtion
function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    hideDice();
}

document.querySelector('.btn-new').addEventListener('click', init);

// init function
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.boy-img-0').style.left = '0';
    document.querySelector('.boy-img-1').style.left = '0';
    document.getElementById('name-0').textContent = 'Lazy Boy';
    document.getElementById('name-1').textContent = 'Sport Boy';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// Hide Dice function
function hideDice() {
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}
