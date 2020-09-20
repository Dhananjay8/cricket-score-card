const rootPrefix = '../..',
  DeliveryOutputBase = require(rootPrefix + '/lib/deliveryOutput/Base');

class Run extends DeliveryOutputBase {
  constructor(params) {
    super(params.score, 'RUN');
  }
}

module.exports = Run;
