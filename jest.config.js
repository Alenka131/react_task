const config = {
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  setupFilesAfterEnv: [
    '<rootDir>src/setupTests.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testEnvironment: 'jsdom',
};

module.exports = config;
