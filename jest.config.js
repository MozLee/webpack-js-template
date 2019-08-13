module.exports = {
  // eslint-disable-next-line no-useless-escape
  testMatch: ['<rootDir>/src/test/\*\*/\*.js'],
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    '^.+\\.js$': 'babel-jest'
  }
}
