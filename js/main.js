// constants
const pigImgs = new Array();

// app variables
var dice1;
var dice2;
var score1;
var score2;
var rollScore;
var rollTextDisplay;
var currentRoundScore = 0;
var turn;

// images
pigImgs[0] = 'images/Pos1_Sider_Left.png'
pigImgs[1] = 'images/Pos2_Sider_Right.png'
pigImgs[2] = 'images/Pos3_Razorback.png'
pigImgs[3] = 'images/Pos4_Trotter.png'
pigImgs[4] = 'images/Pos5_Snouter.png'
pigImgs[5] = 'images/Pos6_Leaning_Jowler.png'

// cached elements
// var dice = document.querySelectorAll('.dice');

// event listeners
$('.roll').on('click', roll);
$('.roll').on('mousedown', rotate)
$('.roll').on('mouseup', stopRotate)
$('.bank').on('click', bank);

// functions

// rotate the images of pig dice when mouse is pressed down
function rotate() {
    var rollDice1 = $('#dice1').attr('src', pigImgs[0]);
    var rollDice2 = $('#dice2').attr('src', pigImgs[1]);
    $('img').css({
        '-webkit-animation-name': 'rotate',
        '-webkit-animation-duration': '0.3s',
        '-webkit-animation-iteration-count': 'infinite',
        '-webkit-animation-timing-function': 'linear',
    }

    );
}
// stop rotate the images of pig when mouse is released
function stopRotate() {
    $('img').css({
        '-webkit-animation-iteration-count': '1',
        '-webkit-animation-timing-function': 'ease-out'
    });
}

function init() {
    turn = 1;
    score1 = 0;
    score2 = 0;
    render();
}

function calc() {                                   // calculate the result of one rolled pig
    var result; var pos; var pts; var imgIdx;
    var rand = Math.floor(Math.random() * 100);     // randomize a number between 0 to 99
    if (rand <= 34) {                               // p(Sider Left) = 0.35; range 0-34
        pos = 'Sider';
        pts = 1;
        imgIdx = 0;
    } else if (rand > 34 && rand <= 64) {           // p(Sider Right) = 0.30; range 35-64
        pos = 'Sider';
        pts = 1;
        imgIdx = 1;
    } else if (rand > 64 && rand <= 84) {           // p(Razorback) = 0.20; range 65-84
        pos = 'Razorback';
        pts = 5;
        imgIdx = 2;
    } else if (rand > 84 && rand <= 94) {           // p(Trotter) = 0.10; range 85-94
        pos = 'Trotter';
        pts = 5;
        imgIdx = 3;
    } else if (rand > 94 && rand <= 98) {           // p(Snouter) = 0.04; range 95-98
        pos = 'Snouter'
        pts = 10;
        imgIdx = 4;
    } else if (rand > 98) {                         // p(Leaning Jowler) = 0.01; range 99
        pos = 'Leaning Jowler'
        pts = 15;
        imgIdx = 5;
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
        if (dice1[2] === 0 || dice1[2] === 1) {     // dice1 and dice2 are the same sider
            rollScore = 1;                          // score is 1
            rollTextDisplay = `Sider`;
        } else {                                    // dice1 and dice2 are not sider
            rollScore = (dice1[1] + dice2[1]) * 2;  // score is double pts
            rollTextDisplay = `Double ${dice1[0]}`;
        }
    } else if (dice1[2] === 0 && dice2[2] === 1) {  // else if dice1 is sider left and dice2 is sider right
        rollScore = 0;
        rollTextDisplay = `Pig Out`;
    } else if (dice1[2] === 1 && dice2[2] === 0) {  // else if dice1 is sider right and dice2 is sider left
        rollScore = 0;
        rollTextDisplay = `Pig Out`;
    }
    // else if (dice1[2] !== dice2[2]) {               // if two dice are different
    //     if (dice1[2] === 0 || dice1[2] === 1) {     // if one dice is a sider and the other is not
    //         rollScore = Math.max(dice1[1], dice2[1]);   // the sider is worth 0
    //         rollTextDisplay = `${dice1[0]} and ${dice2[0]}`;
    //     } else if (dice2[2] === 0 || dice2[2] === 1) {
    //         rollScore = Math.max(dice1[1], dice2[1]);
    //         rollTextDisplay = `${dice1[0]} and ${dice2[0]}`;
    //     }
    else {                                      // if both dice are not the same
        rollScore = dice1[1] + dice2[1];
        rollTextDisplay = `${dice1[0]} and ${dice2[0]}`;
    }
}
function turnUpdate() {
    if (turn % 2 !== 0) {
        $('.right-container').css({ 'opacity': '0.2' });
        $('button.bank2').prop('disabled', true);
        $('.left-container').css({ 'opacity': '1' });
        $('button.bank1').prop('disabled', false);
    } else {
        $('.right-container').css({ 'opacity': '1' });
        $('button.bank2').prop('disabled', false);
        $('.left-container').css({ 'opacity': '0.2' });
        $('button.bank1').prop('disabled', true);
    }
}
function scoreUpdate() {
    rollTextDisplay === 'Pig Out' ? currentRoundScore = 0 : currentRoundScore += rollScore;
}

function bank() {
    turn % 2 !== 0 ? score1 += currentRoundScore : score2 += currentRoundScore;
    turn++;
    render();
}

function render() {
    $('#dice1').attr('src', pigImgs[dice1[2]]);
    $('#dice2').attr('src', pigImgs[dice2[2]]);
    $('.rollscore').html(`${rollTextDisplay} ${rollScore} pts`);
    $('.thisturnscore').html(`${currentRoundScore} pts`);
    turnUpdate();
}

init();

/*
 Notes
 P(Sider_Left)  = 0.35  = 1 pt      range: 0-34
 P(Sider_Right) = 0.30  = 1 pt      range: 35-64
 P(Razorback)   = 0.20  = 5 pts     range: 65-84
 P(Trotter)     = 0.10  = 5 pts     range: 85-94
 P(Snouter)     = 0.04  = 10 pts    range: 95-98
 P(Leaning)     = 0.01  = 15 pts    range: 99
*/