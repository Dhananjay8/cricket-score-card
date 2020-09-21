const BigNumber = require('bignumber.js');

class Validators {

  static validateNonEmptyString(variable) {
    return !!(Validators.validateString(variable) && variable && variable.trim().length !== 0);
  }

  static validateString(variable) {
    return typeof variable === 'string';
  }

  static validateInteger(variable) {
    try {
      const variableInBn = new BigNumber(String(variable));
      // Variable is integer and its length is less than 37 digits
      if (variableInBn.isInteger() && variableInBn.toString(10).length <= 37) {
        return true;
      }
    } catch (e) {}

    return false;
  }

  static validateAlphaNumericString(variable) {
    if (Validators.isVarNullOrUndefined(variable)) {
      return false;
    }

    return /^[a-zA-Z0-9]+$/i.test(variable);
  }

  static isVarNullOrUndefined(variable) {
    return typeof variable === 'undefined' || variable == null;
  }

  static validateAlphaString(variable) {
    if (Validators.isVarNullOrUndefined(variable)) {
      return false;
    }

    return /^[a-z]+$/i.test(variable);
  }
}

module.exports = Validators;
