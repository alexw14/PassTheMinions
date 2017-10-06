// constants

// app variables
// images
var pigImgs = new Array();
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

// functions

function compute() {                                // compute the result of one rolled pig
    var result;
    var rand = Math.floor(Math.random() * 100);    // randomize a number between 0 to 99
    if (rand <= 34) {                               // p(Sider Left) = 0.35; range 0-34
        result = 1;
    } else if (rand > 34 && rand <= 64) {           // p(Sider Right) = 0.30; range 35-64
        result = 1;
    } else if (rand > 64 && rand <= 84) {           // p(Razorback) = 0.20; range 65-84
        result = 5;
    } else if (rand > 84 && rand <= 94) {           // p(Trotter) = 0.10; range 85-94
        result = 5;
    } else if (rand > 94 && rand <= 98) {           // p(Snouter) = 0.04; range 95-98
        result = 10;
    } else if (rand > 98) {                         // p(Leaning Jowler) = 0.01; range 99
        result = 15;
    }
    return result;
}

// when roll is clicked, loop through images
function roll() {
    // var stopped = true;
    // var t;
    var random1 = Math.floor(Math.random() * 6);
    var random2 = Math.floor(Math.random() * 6);
    function change() {
        $('#dice1').attr('src', pigImgs[random1]);
        $('#dice2').attr('src', pigImgs[random2]);
    }
    change();
    // function stopstart() {
    //     if (stopped) {
    //         stopped = false;
    //         t = setInterval(change, 500);
    //     } else {
    //         clearInterval(t);
    //         stopped = true;
    //     }
    // }
    // stopstart();
}

function init() {

}

function render() {

}

/* Notes
 P(Sider_Left)  = 0.35  = 1 pt      range: 0-34
 P(Sider_Right) = 0.30  = 1 pt      range: 35-64
 P(Razorback)   = 0.20  = 5 pts     range: 65-84
 P(Trotter)     = 0.10  = 5 pts     range: 85-94
 P(Snouter)     = 0.04  = 10 pts    range: 95-98
 P(Leaning)     = 0.01  = 15 pts    range: 99
*/