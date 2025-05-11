const githubAPI = require('./github-api');


async function getPullRequests(repo, options = {}) {
    const { owner, repoName } = githubAPI.parseRepoString(repo);
    const { state = 'open', limit = 10 } = options;

    // Construct query parameters
    const params = {
        state,
        per_page: limit,
    };

    try {
        return await githubAPI.request('GET', `/repos/${owner}/${repoName}/pulls`, params);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPullRequests
};