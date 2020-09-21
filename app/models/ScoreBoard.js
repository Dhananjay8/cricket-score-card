const rootPrefix = '../..',
  helperFunctions = require(rootPrefix + '/lib/helper'),
  globalConstants = require(rootPrefix + '/lib/constants/global'),
  batsmanConstants = require(rootPrefix + '/lib/constants/batsman'),
  validatorsFunctions = require(rootPrefix + '/lib/validators'),
  outputTypeConstants = require(rootPrefix + '/lib/constants/outputType'),
  deliveryOutputFactory = require(rootPrefix + '/lib/deliveryOutput/factory'),
  Batsman = require(rootPrefix + '/app/models/Batsman');

class ScoreBoard {
  /**
   * Constructor for score board.
   *
   * @param battingTeam
   * @param bowlingTeam
   * @param inningNumber
   * @param totalOvers
   */
  constructor(battingTeam, bowlingTeam, inningNumber, totalOvers) {
    const oThis = this;

    oThis.battingTeam = battingTeam;
    oThis.bowlingTeam = bowlingTeam;
    oThis.inningNumber = inningNumber;

    oThis.gameOver = false;
    oThis.totalOvers = totalOvers;
    oThis.currOver = 0;
  }

  /**
   * Setup score board.
   *
   * @returns {Promise<void>}
   */
  async setupScoreBoard() {
    const oThis = this;

    await oThis.setUpBattingOrder();
  }

  /**
   * Setting up batting order.
   *
   * @returns {Promise<>}
   */
  async setUpBattingOrder() {
    const oThis = this;

    console.log("\n\n*** Batting order for " + oThis.battingTeam.getName() + ":");

    let playersCount = oThis.battingTeam.getPlayersCount();
    oThis.battingOrder = new Array(playersCount);

    for(let i = 0; i < playersCount; i++) {
      let input = await helperFunctions.askQuestion('');

      if(!validatorsFunctions.validateAlphaString(input)) {
        return Promise.reject('Validation failed for batsman name.');
      }

      oThis.battingOrder[i] = new Batsman({name: input});
    }

    oThis.onStrike = oThis.battingOrder[0];
    oThis.onStrike.setStatus(batsmanConstants.BATTING);
    oThis.offStrike = oThis.battingOrder[1];
    oThis.offStrike.setStatus(batsmanConstants.BATTING);
  }

  /**
   * Play function.
   *
   * @returns {Promise<void>}
   */
  async play() {
    const oThis = this;

    for(let overCount = 1; overCount <= oThis.totalOvers; overCount++){
      console.log("\nOver " + overCount + ":");

      await oThis.deliverOver();

      if(oThis.currDelivery === globalConstants.BALLS_IN_OVER) {
        oThis.currOver = overCount;
      }
      console.log("\n   ***   ScoreBoard   ***   ");

      oThis.displayScoreBoard();

      if(oThis.gameOver || !oThis.getInningStatus()) {
        return;
      }
    }
  }

  /**
   * Deliver over logic.
   *
   * @returns {Promise<void>}
   */
  async deliverOver() {
    const oThis = this;

    for(let ballCount = 0; ballCount< globalConstants.BALLS_IN_OVER; ballCount++) {
      let input =  await oThis.getDeliveryOutput();

      // console.log('deliverOver::input---', input);
      const deliveryOutput = await deliveryOutputFactory.getOutput(input);
      // console.log('deliverOver::deliveryOutput---', deliveryOutput);

      if(!deliveryOutput) continue;

      switch (deliveryOutput.getOutputType()) {
        case 'RUN':
          // console.log('deliveryOutput.getScore()----', typeof deliveryOutput.getScore());
          oThis.battingTeam.updateScore(deliveryOutput.getScore());
          // console.log("======", oThis.battingTeam.getScore());
          oThis.onStrike.updateScore(deliveryOutput.getScore());
          if(deliveryOutput.getScore()%2 == 1) {
            oThis.togglePlayers();
          }
          oThis.currDelivery = ballCount+1;
          break;
        case 'NO_BALL':
          oThis.battingTeam.updateScore(deliveryOutput.getScore());
          //oThis.onStrike.updateScore(deliveryOutput.getScore()-1);
          if(deliveryOutput.getScore()%2 == 1) {
            oThis.togglePlayers();
          }
          oThis.currDelivery = ballCount;
          ballCount -= 1;
          break;
        case 'WIDE':
          oThis.battingTeam.updateScore(deliveryOutput.getScore());
          oThis.currDelivery = ballCount;
          ballCount -= 1;
          break;
        case 'WICKET':
          oThis.battingTeam.updateWicketsDown();
          oThis.onStrike.setStatus(batsmanConstants.OUT);
          oThis.onStrike.updateScore(deliveryOutput.getScore());
          oThis.currDelivery = ballCount+1;
          if(!oThis.getInningStatus()) {
            return;
          }
          oThis.onStrike = oThis.battingOrder[oThis.battingTeam.getWicketsDown()+1];
          oThis.onStrike.setStatus(batsmanConstants.BATTING);
          break;
        default:
          break;
      }

      if(oThis.inningNumber == 2 && oThis.battingTeam.getScore() > oThis.bowlingTeam.getScore()) {
        oThis.gameOver = true;
        return;
      }
    }

    if(!oThis.gameOver) {
      oThis.togglePlayers();
    }
  }

  /**
   * Display scoreboard.
   *
   */
  displayScoreBoard() {
    const oThis = this;

    console.log("ScoreBoard For Team: " + oThis.battingTeam.getName());
    console.log("PlayerName Score 4s 6s Balls");

    for(let i=0; i<oThis.battingTeam.getPlayersCount(); i++) {
      const batsman = oThis.battingOrder[i];
      if(batsman.getStatus() === batsmanConstants.BATTING) {
        console.log(batsman.getName() + "*   " + batsman.getScore() + "  " + batsman.getRunUnitVsCount(globalConstants.FOUR)
          + "  " + batsman.getRunUnitVsCount(globalConstants.SIX) + "  " + batsman.getBalls());
      } else {
        console.log(batsman.getName() + "    " + batsman.getScore() + "  " + batsman.getRunUnitVsCount(globalConstants.FOUR)
          + "  " + batsman.getRunUnitVsCount(globalConstants.SIX) + "  " + batsman.getBalls());
      }
    }

    console.log("Total: "+ oThis.battingTeam.getScore() + "/" + oThis.battingTeam.getWicketsDown());

    if(oThis.currDelivery === globalConstants.BALLS_IN_OVER) {
      console.log("Over: " + oThis.currOver);
    } else {
      console.log("Over: " + oThis.currOver + "." + oThis.currDelivery);
    }
  }

  /**
   * Get delivery output.
   *
   * @returns {Promise<*>}
   */
  async getDeliveryOutput() {
    const oThis = this;

    let deliveryOutput = await helperFunctions.askQuestion('');

    if( !validatorsFunctions.validateNonEmptyString(deliveryOutput) ) {
      return Promise.reject(`Validation failed for ball delivery. Value: ${deliveryOutput} is invalid.`);
    } else {
      deliveryOutput = deliveryOutput.trim();
    }

    while( Number(deliveryOutput) > 6 || Number(deliveryOutput) < 0 || Number(deliveryOutput) == 5) {
      deliveryOutput = await helperFunctions.askQuestion(`${deliveryOutput} is invalid delivery, Please Retry!`);
    }

    return deliveryOutput;
  }

  /**
   * Toggle players.
   *
   */
  togglePlayers() {
    const oThis = this;

    const p = oThis.onStrike;
    oThis.onStrike = oThis.offStrike;
    oThis.offStrike = p;
  }

  /**
   * Get inning status.
   *
   * @returns {boolean}
   */
  getInningStatus() {
    const oThis = this;

    return !(oThis.battingTeam.getWicketsDown() === oThis.battingTeam.getPlayersCount()-1);
  }
}

module.exports = ScoreBoard;
