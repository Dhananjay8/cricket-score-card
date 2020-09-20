class DeliveryOutputBase {
  constructor(score, outputType) {
    const oThis = this;

    oThis.score = score;
    oThis.outputType = outputType;
  }

  getScore() {
    const oThis = this;

    return oThis.score;
  }

  getOutputType() {
    const oThis = this;

    return oThis.outputType;
  }
}

module.exports = DeliveryOutputBase;
