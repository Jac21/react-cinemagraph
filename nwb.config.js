module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: {
      global: 'ReactCinemagraph',
      externals: {
        react: 'React'
      }
    }
  }
};