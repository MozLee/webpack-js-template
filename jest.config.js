module.exports = {
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    testMatch: ['<rootDir>/src/test/\*\*/\*.js'],
    '^.+\\.js$': 'babel-jest'
  }
}
