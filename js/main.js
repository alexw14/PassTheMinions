// constants

// app variables
// images
var pigDice = new Array();
pigDice[0] = new Image();
pigDice[0].src = 'images/Pos1_Sider_Left.png';
pigDice[1] = new Image();
pigDice[1].src = 'images/Pos2_Sider_Right.png';
pigDice[2] = new Image();
pigDice[2].src = 'images/Pos3_Razorback.png';
pigDice[3] = new Image();
pigDice[3].src = 'images/Pos4_Trotter.png';
pigDice[4] = new Image();
pigDice[4].src = 'images/Pos5_Snouter.png';
pigDice[5] = new Image();
pigDice[5].src = 'images/Pos6_Leaning_Jowler.png';

// cached elements
var dice = document.querySelectorAll('.dice');

// event listeners
$('.roll').on('click', roll);

// functions


// when roll is clicked, loop through images
function roll(){

    for (var i=0; i<pigDice.length; i++) {
    $(dice).append(pigDice[i]);
    $(dice).append(pigDice[i]);
    }
}

/* Notes
 P(Sider_Left)  = 0.35  = 1 pt
 P(Sider_Right) = 0.35  = 1 pt
 P(Razorback)   = 0.17  = 5 pts
 P(Trotter)     = 0.17  = 5 pts
 P(Snouter)     = 0.05  = 10 pts
 P(Leaning)     = 0.01  = 15 pts
*/