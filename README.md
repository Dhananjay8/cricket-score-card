# cricket-score-card
Score Card for Cricket Match



#### Problem Statement:

```text
Write a cricket scorecard that will show the score for a team along with score of each player.
You will be given the number of players in each team, the number of overs and their batting order as input. 
Then, we can input overs ball by ball with the runs scored on that ball (could be wide, no ball or a wicket as well).
You are expected to print individual scores, number of balls faced, number of 4s, number of 6s for all the players from the batting side at the end of every over. 
You also need to print total score, total wickets. 
Essentially, you need to keep a track of all the players, strike changes (at the end of the over or after taking singles or 3s) and maintain their scores, 
also keep track of extra bowls that are being bowled (like wides or no balls). You also need to print which team won the match at the end.
``` 

##### Sample input and output :
```text
No. of players for each team: 5 No. of overs: 2
Batting Order for team 1:
P1
P2
P3
P4
P5 Over 1: 1
1 1 1 1 2
Scorecard for Team 1:
Player Name
P1* 3003 P2* 4003 P3 0000
Score
4s 6s
Balls
P4 0000 P5 0000 Total: 7/0
Overs: 1
.
.
.
```

#### Setup steps
```bash
npm install
```

#### Start steps
```bash
node cricketScoreBoardMain.js
```
