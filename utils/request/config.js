const apiUrlTable = {
  release: 'https://app.domolife.cn',
  test: 'http://ts.domolife.cn',
  dev: 'http://dev.domolife.cn',

};

// const apiUrl = apiUrlTable.release;
const apiUrl = apiUrlTable.test;
// const apiUrl = apiUrlTable.dev;

module.exports = {
  apiUrl: apiUrl
}