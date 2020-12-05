module.exports = {
  globalSetup: './src/testSetup/initConfig.js',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
};
