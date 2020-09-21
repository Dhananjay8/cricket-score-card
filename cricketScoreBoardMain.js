const process = require('process');

const rootPrefix = '.',
  Team = require(rootPrefix + '/app/models/Team'),
  validatorsFunctions = require(rootPrefix + '/lib/validators'),
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

    if(!validatorsFunctions.validateNonEmptyString(oThis.playerCount) || !validatorsFunctions.validateInteger(oThis.playerCount)) {
      return Promise.reject('Validation failed for playerCount.');
    }

    if(!parseInt(oThis.playerCount) || parseInt(oThis.playerCount) <= 2) {
      return Promise.reject(`Minimum 3 players are required for a match.`)
    }

    oThis._setTeams();

    oThis.overs = await helperFunctions.askQuestion('*** Number of overs: ');

    if(!validatorsFunctions.validateNonEmptyString(oThis.overs) || !validatorsFunctions.validateInteger(oThis.overs)) {
      return Promise.reject('Validation failed for overs.');
    }

    if(!parseInt(oThis.overs) || parseInt(oThis.overs) <= 1) {
      return Promise.reject(`${oThis.overs} number is not allowed.`)
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
