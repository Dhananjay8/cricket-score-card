const process = require('process'),
  readline = require('readline');

class helperClass {

  /**
   * To take input from user.
   *
   * @param questionStr
   * @returns {Promise<*>}
   */
  async askQuestion(questionStr) {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(resolve => {
      rl.question(questionStr, (answer) => {
        resolve(answer);
        rl.close();
      });
    });
  }
}

module.exports = new helperClass();
