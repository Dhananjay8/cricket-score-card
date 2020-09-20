const rootPrefix = '../..',
  DeliveryOutputBase = require(rootPrefix + '/lib/deliveryOutput/Base');

class Wide extends DeliveryOutputBase {
  constructor(params) {
    super(params.score, 'WIDE');
  }
}

module.exports = Wide;
