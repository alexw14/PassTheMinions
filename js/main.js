// constants
const imgs = new Array();

// app variables
var dice1, dice2, playerScore, rollScore, rollTextDisplay, currentRoundScore, turn, numPlayers, hasWinner;

// images
imgs[0] = 'images/minion_rotate.png';
imgs[1] = 'images/silly.png';
imgs[2] = 'images/bored.png';
imgs[3] = 'images/cupcake.png';
imgs[4] = 'images/happy.png';
imgs[5] = 'images/hula.png';
imgs[6] = 'images/banana.png';

// cached elements

// event listeners
$('.roll').on('mousedown', rotate);
$('.roll').on('mouseup', function () {
    stopRotate();
    roll();
});
$(document).on('keydown', function (e) {
    if (e.keyCode === 32) {
        rotate();
    }
});
$(document).on('keyup', function (e) {
    if (e.keyCode === 32) {
        stopRotate();
        roll();
    }
});
$('.bank').on('click', bank);
$(document).on('keyup', function (e) {
    if (e.keyCode === 66) {
        bank();
    }
});
$('.newgame').on('click', init);
$('.about').on('click', function () {
    $(`.hidden1`).show();
});
$(`.hidden1`).on('click', 'button', function () {
    $(`.hidden1`).hide();
})
$('.how').on('click', function () {
    $(`.hidden2`).show();
});
$(`.hidden2`).on('click', 'button', function () {
    $(`.hidden2`).hide();
});
$('.numPlayers').on('click', function () {
    $(`.hidden3`).show();
});
$(`.hidden3`).on('click', 'button', function (num) {
    numPlayers = (parseInt(num.target.innerHTML));
    $('.hidden3').hide();
    init();
});

// functions

// rotate the images of pig dice when mouse is pressed down
function rotate() {
    var rollDice1 = $('#dice1').attr('src', 'images/minion_rotate.png');
    var rollDice2 = $('#dice2').attr('src', 'images/minion_rotate.png');
    $('.rotate').css({
        '-webkit-animation-name': 'rotate',
        '-webkit-animation-duration': '0.3s',
        '-webkit-animation-iteration-count': 'infinite',
        '-webkit-animation-timing-function': 'linear'
    });
}
// stop rotate the images of pig when mouse is released
function stopRotate() {
    $('.rotate').css({
        '-webkit-animation-iteration-count': '1',
        '-webkit-animation-timing-function': 'ease-out'
    });
}

function init() {
    turn = 0;
    hasWinner = false;
    playerScore = new Array(numPlayers);
    playerScore.fill(0);
    rollScore = 0;
    rollTextDisplay = '';
    currentRoundScore = null;
    dice1 = ['', 0, 0];
    dice2 = ['', 0, 0];
    render();
}

function calc() {                                   // calculate the result of one rolled pig
    var result; var pos; var pts; var imgIdx;
    var rand = Math.floor(Math.random() * 100);     // randomize a number between 0 to 99
    if (rand <= 31) {                               // p(Silly) = 0.32; range 0-31
        pos = 'Silly';
        pts = 1;
        imgIdx = 1;
    } else if (rand > 31 && rand <= 63) {           // p(Bored) = 0.32; range 32-63
        pos = 'Bored';
        pts = 1;
        imgIdx = 2;
    } else if (rand > 63 && rand <= 79) {           // p(Cupcake) = 0.16; range 64-79
        pos = 'Cupcake';
        pts = 5;
        imgIdx = 3;
    } else if (rand > 79 && rand <= 94) {           // p(Happy) = 0.15; range 80-94
        pos = 'Happy';
        pts = 5;
        imgIdx = 4;
    } else if (rand > 94 && rand <= 98) {           // p(Hula) = 0.04; range 95-98
        pos = 'Hula'
        pts = 10;
        imgIdx = 5;
    } else if (rand > 98) {                         // p(Banana) = 0.01; range 99
        pos = 'Banana'
        pts = 15;
        imgIdx = 6;
    }
    return result = [pos, pts, imgIdx];            // return an array of [random number, points, image index]
}

function roll() {
    dice1 = calc();        // roll dice 1
    dice2 = calc();        // roll dice 2
    checkDice();
    scoreUpdate();
    render();
}

function checkDice() {
    rollScore = 0;      // initial roll score is 0
    if (dice1[2] === dice2[2]) {                    // if dice1 and dice2 are the same
        if (dice1[2] === 1 || dice1[2] === 2) {     // dice1 and dice2 are the same sider
            rollScore = 1;                          // score is 1
            dice1[2] === 1 ? rollTextDisplay = `Double Silly` : rollTextDisplay = `Double Bored`
        } else {                                    // dice1 and dice2 are not sider
            rollScore = (dice1[1] + dice2[1]) * 2;  // score is double pts
            rollTextDisplay = `Double ${dice1[0]}`;
        }
    } else if (dice1[2] === 1 && dice2[2] === 2) {  // else if dice1 is sider left and dice2 is sider right
        rollScore = 0;
        rollTextDisplay = `Pass the Minions!`;
    } else if (dice1[2] === 2 && dice2[2] === 1) {  // else if dice1 is sider right and dice2 is sider left
        rollScore = 0;
        rollTextDisplay = `Pass the Minions!`;
    }
    else if (dice1[2] !== dice2[2]) {               // if two dice are different
        if (dice1[2] === 1 || dice1[2] === 2) {     // if one dice is a sider and the other is not
            rollScore = Math.max(dice1[1], dice2[1]);   // the sider is worth 0
            rollTextDisplay = `${dice1[0]} and ${dice2[0]}`;
        } else if (dice2[2] === 1 || dice2[2] === 2) {
            rollScore = Math.max(dice1[1], dice2[1]);
            rollTextDisplay = `${dice1[0]} and ${dice2[0]}`;
        }
        else {                                      // if both dice are not the same
            rollScore = dice1[1] + dice2[1];
            rollTextDisplay = `${dice1[0]} and ${dice2[0]}`;
        }
    }
}
function scoreUpdate() {
    rollTextDisplay === 'Pass the Minions!' ? currentRoundScore = 0 : currentRoundScore += rollScore;
}

function bank() {
    if (hasWinner === true) return;
    playerScore[turn] += currentRoundScore;
    currentRoundScore = 0;
    render();
}
function checkWinner() {
    if (hasWinner === true) return;
    if (playerScore[turn] >= 100) {
        $(`.display`).html(`Minion ${turn + 1} Wins!`)
        $(`.newgame`).css({ 'visibility': 'visible' });
        $(`button.bank`).prop(`disabled`, true);
        showGif();
        hasWinner = true;
    }
}
function showGif() {
    $(`#gif`).fadeIn(1000);
    $(`#gif`).delay(2000).fadeOut(1000);
}
function turnUpdate() {
    if (currentRoundScore === 0) {
        turn = (turn === numPlayers - 1) ? 0 : turn + 1;
    }
    $(`.box`).css({ 'opacity': '0.5' });
    $(`button.bank`).prop(`disabled`, true);
    $(`.p${turn + 1}`).css({ 'opacity': '1' });
    $(`button.bank${turn + 1}`).prop(`disabled`, false);
}
function render() {
    $(`.score${turn + 1}`).html(`Points: ${playerScore[turn]}`);
    checkWinner();
    $('#dice1').attr('src', imgs[dice1[2]]);
    $('#dice2').attr('src', imgs[dice2[2]]);
    $('.rollscore').html(`${rollTextDisplay} <br> +${rollScore}`);
    if (hasWinner === true) return;
    $('.newgame').css({ 'visibility': 'hidden' });
    if (hasWinner === false) turnUpdate();
    currentRoundScore === 0 ? $(`.display`).html(`Minion ${turn + 1}'s turn!`) : $(`.display`).html(`${currentRoundScore}`);
    if (currentRoundScore === null) {
        $(`.display`).html(`Let's Play!`);
        for (var i = 1; i <= 4; i++) {
            $(`.score${i}`).html(`Points: 0`);
        }
    }
}

init();
