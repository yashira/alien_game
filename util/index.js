const yaml = require('yaml');
const fs = require('fs');

const readConfigFile = () => {
  const file = fs.readFileSync('./data/master_data.yml', 'utf-8');
  return yaml.parse(file);
};

module.exports = {
  getConfig: readConfigFile,
};
