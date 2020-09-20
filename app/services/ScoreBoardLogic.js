const rootPrefix = '../..',
  globalConstants = require(rootPrefix + '/lib/constants/global'),
  ScoreBoard = require(rootPrefix + '/app/models/ScoreBoard');

/**
 * Score board logic.
 *
 */
class ScoreBoardLogic {
  /**
   * Constructor for score board logic.
   *
   * @param {Team} battingTeam - object for batting team.
   * @param {Team} bowlingTeam - object for bowling team.
   * @param {number} overs - number of overs.
   */
  constructor(battingTeam, bowlingTeam, overs) {
    const oThis = this;

    oThis.battingTeam = battingTeam;
    oThis.bowlingTeam = bowlingTeam;
    oThis.overs = overs;

    oThis.innings = new Array(globalConstants.TOTAL_INNINGS);
    oThis.inningsCount = 0;
  }

  /**
   * Perform.
   *
   * @returns {Promise<void>}
   */
  async perform() {
    const oThis = this;

    while(oThis.inningsCount < globalConstants.TOTAL_INNINGS) {
      await oThis.initializeInning();
      let currentInning = oThis.innings[oThis.inningsCount-1];
      await currentInning.play();
      oThis.toggleTeam();
    }

    return oThis.decideWinner();
  }

  /**
   * Start inning.
   *
   * @returns {Promise<void>}
   */
  async initializeInning() {
    const oThis = this;

    oThis.inningsCount++;
    oThis.innings[oThis.inningsCount-1] = new ScoreBoard(oThis.battingTeam, oThis.bowlingTeam, oThis.inningsCount, oThis.overs);

    await oThis.innings[oThis.inningsCount-1].setupScoreBoard();
  }

  /**
   * Switch teams.
   *
   */
  toggleTeam() {
    const oThis = this;

    let team = oThis.battingTeam;
    oThis.battingTeam = oThis.bowlingTeam;
    oThis.bowlingTeam = team;
  }

  /**
   * Decide final winner of the match.
   *
   */
  decideWinner() {
    const oThis = this;

    console.log(`****   SCOREBOARD   ****   `);

    if(oThis.battingTeam.getScore() > oThis.bowlingTeam.getScore()) {
      console.log("Result: " + oThis.battingTeam.getName() + " won the match by " + (oThis.battingTeam.getScore() - oThis.bowlingTeam.getScore()) + " runs");
    } else if (oThis.battingTeam.getScore() < oThis.bowlingTeam.getScore()){
      console.log("Result: " + oThis.bowlingTeam.getName() + " won the match by " + (oThis.bowlingTeam.getPlayersCount()-oThis.bowlingTeam.getWicketsDown()-1) + " wickets");
    } else {
      console.log("Result: Tie ");
    }
  }

}

module.exports = ScoreBoardLogic;
