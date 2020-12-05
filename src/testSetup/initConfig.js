require('ts-node');

const { setup } = require('./initSetup');

module.exports = async function () {
  await setup();
  return null;
};
