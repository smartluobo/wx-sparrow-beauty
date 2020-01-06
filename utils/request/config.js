const apiUrlTable = {
  release: 'https://app.domolife.cn',
  test: 'http://ts.domolife.cn',
  dev: 'https://www.eecup.cn',

};

// const apiUrl = apiUrlTable.release;
const apiUrl = apiUrlTable.dev;
// const apiUrl = apiUrlTable.dev;

module.exports = {
  apiUrl: apiUrl
}