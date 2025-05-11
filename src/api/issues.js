const githubAPI = require('./github-api');

async function getIssues(repo, options = {}) {
    const { owner, repoName } = githubAPI.parseRepoString(repo);
    const { state = 'open', labels, limit = 10 } = options;


    // Construct query parameters
    const params = {
        state,
        per_page: limit,
        ...(labels && { labels })
    };

    try {
        // The issues endpoint returns both issues and PRs by default
        // Adding the filter parameter to exclude PRs
        return await githubAPI.request('GET', `/repos/${owner}/${repoName}/issues`, {
            ...params,
            // The pulls parameter isn't valid in the GitHub API, we'll filter PRs out afterward
        });
    } catch (error) {
        throw Error;
    }

}

// Helper function to filter out PRs from issues list
function filterOutPullRequests(issues) {
    return issues.filter(issue => !issue.pull_request);
}

module.exports = {
    async getIssues(repo, options = {}) {
        const issues = await getIssues(repo, options);
        return filterOutPullRequests(issues);
    }
};