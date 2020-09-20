const rootPrefix = '../..',
  DeliveryOutputBase = require(rootPrefix + '/lib/deliveryOutput/Base');

class Wicket extends DeliveryOutputBase {
  constructor(params) {
    super(params.score, 'WICKET');
  }
}

module.exports = Wicket;
