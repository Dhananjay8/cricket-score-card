const rootPrefix = '../..',
  globalConstants = require(rootPrefix + '/lib/constants/global'),
  outputTypeConstants = require(rootPrefix + '/lib/constants/outputType'),
  NoBall = require(rootPrefix + '/lib/deliveryOutput/NoBall'),
  Run = require(rootPrefix + '/lib/deliveryOutput/Run'),
  Wicket = require(rootPrefix + '/lib/deliveryOutput/Wicket'),
  Wide = require(rootPrefix + '/lib/deliveryOutput/Wide');

class DeliveryOutputFactory {
  getOutput(output) {
    const oThis = this;

    const partsArray = output.split('.');

    let run = 0,
      outputStr = null;

    // console.log('partsArray-----', partsArray);
    // console.log('parseInt(partsArray[0]-----', parseInt(partsArray[0]) );


    if(partsArray && partsArray.length < 2) {
      if(parseInt(partsArray[0])) {
        run = parseInt(partsArray[0]);
        outputStr = 'R';
      } else if(partsArray[0] === '0') {
        run = 0;
        outputStr = 'R';
      } else {
        run = 0;
        outputStr = partsArray[0];
      }
    } else {
      outputStr = partsArray.pop();
      run = parseInt(partsArray[0]);
    }

    console.debug('DeliveryOutputFactory::run------>', run);
    let outputType = outputTypeConstants[outputStr];
    console.debug('DeliveryOutputFactory::ball type------>', outputStr, outputType);

    switch (outputType) {
      case "RUN":
        return new Run({score: run});
      case "WIDE":
        return new Wide({score: globalConstants.DEFAULT_WIDE_RUN + run});
      case "WICKET":
        return new Wicket({score: 0});
      case "NO_BALL":
        return new NoBall({score: globalConstants.DEFAULT_NO_BALL_RUN + run});
      default:
        return null;
    }
  }

  parseIntegerWithSuffixString(input) {
    const oThis = this;

    if(input && parseInt(input)) {
      return parseInt(input);
    } else {
      return '0';
    }
  }

  parseStringWithPrefixInt(input) {
    const oThis = this;

    let intPrefix = oThis.parseIntegerWithSuffixString(input);

    console.log('input----', input);
    console.log('intPrefix----', intPrefix);
    console.log('input.split(intPrefix).pop()----', input.split(intPrefix).pop());

    if(intPrefix > 0) {
      return "R";
    }
    if(intPrefix === '0' && input.split(intPrefix).pop()) {
      return input.split(intPrefix).pop();
    } else if(input.split(intPrefix).pop()) {
      return input.split(intPrefix).pop();
    } else {
      return "R";
    }
  }
}

module.exports = new DeliveryOutputFactory();
