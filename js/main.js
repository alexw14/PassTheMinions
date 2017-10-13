// Constants
const imgs = new Array();
// Images
imgs[0] = 'images/minion_rotate.png';
imgs[1] = 'images/silly.png';
imgs[2] = 'images/bored.png';
imgs[3] = 'images/cupcake.png';
imgs[4] = 'images/happy.png';
imgs[5] = 'images/hula.png';
imgs[6] = 'images/banana.png';

// App Variables
var dice1, dice2, playerScore, rollScore, rollTextDisplay, currentRoundScore, turn, numPlayers, hasWinner;

// Event Listeners
$('.roll').on('mousedown', rotate);         // Rotate the Minions when the roll button is pressed down
$('.roll').on('mouseup', function () {      // Stop rotate and invoke the roll function when the roll button is released
    stopRotate();
    roll();
});
$(document).on('keydown', function (e) {    // Rotate the Minions when the spacebar is pressed down
    if (e.keyCode === 32) {                 // spacebar keycode: 32
        rotate();
    }
});
$(document).on('keyup', function (e) {      // Stop rotate and invoke the roll function when the spacebar is released
    if (e.keyCode === 32) {
        stopRotate();
        roll();
    }
});
$('.bank').on('click', bank);               // Invoke the bank function when the bank button is clicked
$(document).on('keyup', function (e) {      // Invoke the bank function when the "B" key is released
    if (e.keyCode === 66) {                 // "B" keycode: 66
        bank();
    }
});
$('.newgame').on('click', init);            // Invoke the init function when the New Game button is clicked
$('.about').on('click', function () {       // Show the About page when About is clicked
    $(`.hidden1`).show();
});
$(`.hidden1`).on('click', 'button', function () {   // Hide the About page when the X button is clicked
    $(`.hidden1`).hide();
})
$('.how').on('click', function () {         // Show the How to Play page when How to Play is clicked
    $(`.hidden2`).show();
});
$(`.hidden2`).on('click', 'button', function () {   // Hide the How to Play page when the X button is clicked
    $(`.hidden2`).hide();
});
$('.numPlayers').on('click', function () {  // Show the Number of Players page when Number of Players is clicked
    $(`.hidden3`).show();
});
$(`.hidden3`).on('click', 'button', function (num) {    // Set numPlayers when the number is clicked,
    numPlayers = (parseInt(num.target.innerHTML));
    $('.hidden3').hide();                               // then hide the page,
    init();                                             // then start a new game
});

// Functions
// Rotate the images of Minion dice when mouse is pressed down
function rotate() {
    var rollDice1 = $('#dice1').attr('src', 'images/minion_rotate.png');    // Change the image of Minion during rotate
    var rollDice2 = $('#dice2').attr('src', 'images/minion_rotate.png');
    $('.rotate').addClass('rotate-dice');
}
// Stop rotate the images of Minions when mouse is released
function stopRotate() {
    $('.rotate').removeClass('rotate-dice');
}
function init() {
    turn = 0;
    hasWinner = false;
    playerScore = new Array(numPlayers);    // Set the playerScore array equal to the length of numPlayers
    playerScore.fill(0);                    // Fill the array with 0
    rollScore = 0;
    rollTextDisplay = '';
    currentRoundScore = null;
    dice1 = ['', 0, 0];
    dice2 = ['', 0, 0];
    render();
}
function roll() {
    dice1 = calc();        // roll dice 1
    dice2 = calc();        // roll dice 2
    checkDice();
    scoreUpdate();
    render();
}
function calc() {                                   // Calculate the result of one rolled dice
    var result; var pos; var pts; var imgIdx;       // Local variables
    var rand = Math.floor(Math.random() * 100);     // Randomize a number between 0 to 99
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
    return result = [pos, pts, imgIdx];             // Return an array of [position, points, image index]
}
function checkDice() {
    rollScore = 0;                                  // Initial roll score is 0
    if (dice1[2] === dice2[2]) {                    // If dice1 and dice2 are the same
        if (dice1[2] === 1 || dice1[2] === 2) {     // And if dice1 and dice2 are 'Silly' or 'Bored'
            rollScore = 1;                          // Score is 1
            dice1[2] === 1 ? rollTextDisplay = `Double Silly` : rollTextDisplay = `Double Bored`
        } else {                                    // Else if dice1 and dice2 are not 'Silly' or 'Bored'
            rollScore = (dice1[1] + dice2[1]) * 2;  // Score is double pts
            rollTextDisplay = `Double ${dice1[0]}`; // Display 'Double position'
        }
    } else if (dice1[2] === 1 && dice2[2] === 2) {  // Else if dice1 is 'Silly' and dice2 is 'Bored'
        rollScore = 0;                              // Score is 0
        rollTextDisplay = `Pass the Minions!`;
    } else if (dice1[2] === 2 && dice2[2] === 1) {  // Else if dice1 is 'Bored' and dice2 is 'Silly'
        rollScore = 0;                              // Score is 0
        rollTextDisplay = `Pass the Minions!`;
    }
    else if (dice1[2] !== dice2[2]) {               // Else if two dice are different
        if (dice1[2] === 1 || dice1[2] === 2) {     // if dice1 is 'Silly' or 'Bored'
            rollScore = Math.max(dice1[1], dice2[1]);   // then dice1 is worth 0 pts
            rollTextDisplay = `${dice1[0]} and ${dice2[0]}`;
        } else if (dice2[2] === 1 || dice2[2] === 2) {  // if dice2 is 'Silly' or 'Bored'
            rollScore = Math.max(dice1[1], dice2[1]);   // then dice2 is worth 0 pts
            rollTextDisplay = `${dice1[0]} and ${dice2[0]}`;
        }
        else {                                      // Else if both dice are different
            rollScore = dice1[1] + dice2[1];        // Add pts for a combined score
            rollTextDisplay = `${dice1[0]} and ${dice2[0]}`;
        }
    }
}
function scoreUpdate() {
    rollTextDisplay === 'Pass the Minions!' ? currentRoundScore = 0 : currentRoundScore += rollScore;
}
function bank() {
    if (hasWinner === true) return;         // If there is a winner, cannot add more points to player score
    playerScore[turn] += currentRoundScore; // Add current round score to the player score
    currentRoundScore = 0;                  // Then reset current roud score to 0
    render();
}
function checkWinner() {
    if (hasWinner === true) return;         // If there is a winner, ends function execution. Prevent showing Gif again.
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
    if (currentRoundScore === 0) {                          // Update turn when current round score is 0
        turn = (turn === numPlayers - 1) ? 0 : turn + 1;    // Turn increases from 0 -> 1, 1 -> 2, 2 -> 3, then 3 -> 0, if numPlayers=4
    }
    $(`.box`).css({ 'opacity': '0.5' });
    $(`button.bank`).prop(`disabled`, true);
    $(`.p${turn + 1}`).css({ 'opacity': '1' });
    $(`button.bank${turn + 1}`).prop(`disabled`, false);
}
function render() {
    $(`.score${turn + 1}`).html(`Points: ${playerScore[turn]}`);    // Update player's pts in their respective box
    checkWinner();
    $('#dice1').attr('src', imgs[dice1[2]]);                        // Update images of dice after roll on main display
    $('#dice2').attr('src', imgs[dice2[2]]);
    $('.rollscore').html(`${rollTextDisplay} <br> +${rollScore}`);  // Update the positions and points of each roll on main display
    if (hasWinner === true) return;                                 // If there is a winner, ends function execution
    $('.newgame').css({ 'visibility': 'hidden' });                  // Hide the New Game button
    if (hasWinner === false) turnUpdate();                          // If there is no winner, update turn
    currentRoundScore === 0 ? $(`.display`).html(`Minion ${turn + 1}'s turn!`) : $(`.display`).html(`${currentRoundScore}`);    // Display the correct player's turn or the current round score
    if (currentRoundScore === null) {                               // If the game is a new game
        $(`.display`).html(`Let's Play!`);
        for (var i = 1; i <= 4; i++) {
            $(`.score${i}`).html(`Points: 0`);                      // Change display of all player's points to 0
        }
    }
}
init();