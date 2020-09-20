const rootPrefix = '../..',
  DeliveryOutputBase = require(rootPrefix + '/lib/deliveryOutput/Base');

class NoBall extends DeliveryOutputBase {
  constructor(params) {
    super(params.score, 'NO_BALL');
  }
}

module.exports = NoBall;
