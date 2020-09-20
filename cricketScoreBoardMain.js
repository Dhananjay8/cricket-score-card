const process = require('process');

const rootPrefix = '.',
  Team = require(rootPrefix + '/app/models/Team'),
  helperFunctions = require(rootPrefix + '/lib/helper'),
  ScoreBoardLogic = require(rootPrefix + '/app/services/ScoreBoardLogic');

/**
 * Main performer class.
 *
 */
class mainPerformer {
  constructor(params) {
    const oThis = this;

    oThis.overs = 0;
    oThis.playerCount = 0;
    oThis.team1 = null;
    oThis.team2 = null;
  }

  /**
   * Perform.
   *
   * @returns {Promise<void>}
   */
  async perform() {
    const oThis = this;

    console.log("Starting Cricket Match ...");

    await oThis._readInputs();

    return new ScoreBoardLogic(oThis.team1, oThis.team2, Number(oThis.overs)).perform();
  }

  /**
   * Read input from user.
   *
   * @returns {Promise<void>}
   * @private
   */
  async _readInputs() {
    const oThis = this;

    oThis.playerCount = await helperFunctions.askQuestion('*** No. of players for each team: ');

    if(!oThis.playerCount || typeof oThis.playerCount != 'string' || !parseInt(oThis.playerCount)) {
      throw new Error('Validation failed.')
    }

    oThis._setTeams();

    oThis.overs = await helperFunctions.askQuestion('*** Number of overs: ');

    if(!oThis.overs || typeof oThis.overs != 'string' || !parseInt(oThis.overs)) {
      throw new Error('Validation failed.')
    }
  }

  /**
   * Set teams for match.
   *
   * @private
   */
  _setTeams() {
    const oThis = this;

    oThis.team1 = new Team({name: "Team 1", playersCount: Number(oThis.playerCount)} );
    oThis.team2 = new Team({name: "Team 2", playersCount: Number(oThis.playerCount)} );
  }
}

/**
 * Start execution.
 *
 */
new mainPerformer().perform().then(function (r) {
  console.log(r);
  process.exit(0);
}).catch(function (err) {
  console.error(err);
  process.exit(1);
});
