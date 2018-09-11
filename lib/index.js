const util = require('util');
const fs = require('fs');
const path = require('path');

const readFile = util.promisify(fs.readFile);

module.exports = adExtendJS = async () => {
  const env = process.env.NODE_ENV;
  return await readFile(path.resolve(__dirname, `./ad-extends-${env}.js`), 'utf-8');
}
