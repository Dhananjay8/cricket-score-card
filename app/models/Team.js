class TeamModel {
  constructor(params) {
    const oThis = this;

    oThis.name = params.name || 'DEFAULT_NAME';
    oThis.playersCount = params.playersCount;
    oThis.score = params.score || 0;
    oThis.wicketsDown = params.wicketsDown || 0;
  }

  updateScore(run) {
    const oThis = this;

    oThis.score = Number(oThis.score) + run;
  }

  updateWicketsDown() {
    const oThis = this;

    oThis.wicketsDown += 1;
  }

  getPlayersCount() {
    const oThis = this;

    return oThis.playersCount;
  }

  getScore() {
    const oThis = this;

    return oThis.score;
  }

  getWicketsDown() {
    const oThis = this;

    return oThis.wicketsDown;
  }

  getName() {
    const oThis = this;

    return oThis.name;
  }
}

module.exports = TeamModel;
