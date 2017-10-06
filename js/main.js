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

function calc(rand, pts, idx) {                          // calculate the result of one rolled pig
    var result;
    var pts;
    var imgIdx;
    var rand = Math.floor(Math.random() * 100);     // randomize a number between 0 to 99
    if (rand <= 34) {                               // p(Sider Left) = 0.35; range 0-34
        pts = 1;
        imgIdx = 0;
    } else if (rand > 34 && rand <= 64) {           // p(Sider Right) = 0.30; range 35-64
        pts = 1;
        imgIdx = 1;
    } else if (rand > 64 && rand <= 84) {           // p(Razorback) = 0.20; range 65-84
        pts = 5;
        imgIdx = 2;
    } else if (rand > 84 && rand <= 94) {           // p(Trotter) = 0.10; range 85-94
        pts = 5;
        imgIdx = 3;
    } else if (rand > 94 && rand <= 98) {           // p(Snouter) = 0.04; range 95-98
        pts = 10;
        imgIdx = 4;
    } else if (rand > 98) {                         // p(Leaning Jowler) = 0.01; range 99
        pts = 15;
        imgIdx = 5;
    }
    return result = [rand, pts, imgIdx];            // return an array of [pig position, points]
}


function roll() {
    var d1 = calc();
    var d2 = calc();
    console.log(d1);
    console.log(d2);
    $('#dice1').attr('src', pigImgs[d1[2]]);
    $('#dice2').attr('src', pigImgs[d2[2]]);
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