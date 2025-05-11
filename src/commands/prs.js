const ora = require('ora');
const pullsApi = require('../api/pulls');
const formatter = require('../utils/formatter');

module.exports = async function prsCommand(repo, options) {
  const spinner = ora(`Fetching pull requests for ${repo}...`).start();
  
  try {
    const pullRequests = await pullsApi.getPullRequests(repo, {
      state: options.state,
      limit: options.limit
    });
    
    spinner.succeed(`Found ${pullRequests.length} pull requests for ${repo}`);
    
    if (pullRequests.length === 0) {
      console.log('No pull requests match your criteria.');
      return;
    }
    
    if (options.json) {
      console.log(JSON.stringify(pullRequests, null, 2));
    } else {
      formatter.displayPullRequestsTable(pullRequests);
    }
  } catch (error) {
    spinner.fail(`Error: ${error.message}`);
    process.exit(1);
  }
};