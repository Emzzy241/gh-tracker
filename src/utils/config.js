const Conf = require('conf');

const config = new Conf({
    projectName: 'gh-tracker',
    schema: {
        token: {
            type: 'string',
            default: '',
        }
    }
});

async function getConfig() {
    return {
        token: config.get('token')
    };
}

async function setToken(token) {
    config.set('token', token);
}

module.exports = {
    getConfig,
    setToken
};