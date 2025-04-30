// config/token.js
const fs = require('fs');
const path = require('path');
const os = require('os');

const configPath = path.join(os.homedir(), '.gh-tracker-config.json');

function getToken() {
  if (!fs.existsSync(configPath)) return null;
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  return config.token || null;
}

function saveToken(token) {
  const config = { token };
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

module.exports = {
  getToken,
  saveToken,
};
