class BatsmanModel {
  constructor(params) {
    const oThis = this;

    oThis.name = params.name || 'DEFAULT';
    oThis.balls = params.playersCount || 0;

    oThis.score = params.score || 0;
    oThis.runUnit = params.runUnit || new Array(20).fill(0);

    oThis.status = params.status || 'NOT_PLAYED';
  }

  updateScore(run) {
    const oThis = this;

    oThis.runUnit[run] = Number(oThis.runUnit[run]) +  1;
    oThis.balls += 1;
    oThis.score = Number(oThis.score) + run;
  }

  getScore() {
    const oThis = this;

    return oThis.score;
  }

  getBalls() {
    const oThis = this;

    return oThis.balls;
  }

  getRunUnitVsCount(unit) {
    const oThis = this;

    return oThis.runUnit[unit];
  }

  getName() {
    const oThis = this;

    return oThis.name;
  }

  getStatus() {
    const oThis = this;

    return oThis.status;
  }

  setStatus(status) {
    const oThis = this;

    oThis.status = status;
  }
}

module.exports = BatsmanModel;
