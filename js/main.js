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
var dice = document.querySelectorAll('.dice');

// event listeners
$('.roll').on('click', roll);

// functions

// compute the output pigs
function compute() {
    var rand = Math.random();
    console.log(rand);
    rand = rand.toFixed(2) * 100;
    console.log(rand);
    if (rand <= 34) {
        console.log('Sider Left');
    } else if (rand > 34 && rand <= 64) {
        console.log('Sider Right');
    } else if (rand > 64 && rand <= 84) {
        console.log('Razorback');
    } else if (rand > 84 && rand <= 94) {
        console.log('Trotter');
    } else if (rand > 94 && rand <= 98) {
        console.log('Snouter');
    } else if (rand > 98) {
        console.log('Leaning Jowler');
    }
}

// when roll is clicked, loop through images
function roll() {

}

/* Notes
 P(Sider_Left)  = 0.35  = 1 pt      range: 0-34
 P(Sider_Right) = 0.30  = 1 pt      range: 35-64
 P(Razorback)   = 0.20  = 5 pts     range: 65-84
 P(Trotter)     = 0.10  = 5 pts     range: 85-94
 P(Snouter)     = 0.04  = 10 pts    range: 95-98
 P(Leaning)     = 0.01  = 15 pts    range: 99
*/