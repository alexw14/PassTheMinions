~ Initialize game
~ Both players score set to 0
~ Player rolls dice
    > run check dice function
        > if dice total is not equal to 7, add the total to the temp score
        > if dice total is equal to 7, end player's turn and switch to next player
        > run render to update display
    > if player decides bank, run bank function
        > add temp score to player total score, then switch to next player
        > run render to update display
    > if player rolls again, run check dice function
~ Check for winner
    > if score is greater than 100, player wins

~ additional features:
    ~ if 2 dice are the same (ex: 5 and 5), score is double (= 20 pts)
    ~ if rolled double 3 consecutive times, player total score = 0
    ~ allow users to input the max score
    ~ allow 4 players

~ other features (maybe):
    ~ implement another option within the game that users can choose
        >instead of trying to see who reaches a score first, have a set amount of turns (ex: 5 turns). The player with the highest score at the end of x turns is the winner.



Ice box - user stories (As a user, As a player..)
|
V
MVP minimum viable product
