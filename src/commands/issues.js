const ora = require('ora');
const issuesApi = require('../api/issues');
const formatter = require('../utils/formatter');

module.exports = async function issuesCommand(repo, options) {
    const spinner = ora(`Fetching issues for ${repo}...`).start();

    try {
        const issues = await issuesApi.getIssues(repo, {
            state: options.state,
            labels: options.label,
            limit: options.limit
        });

        spinner.succeed(`Found ${issues.length} issues in ${repo}.`);

        if (issues.length === 0) {
            console.log('No issues match your criteria.');
            return;
        }

        if (options.json) {
            console.log(JSON.stringify(issues, null, 2));
            return;
        } else {
            formatter.displayIssuesTable(issues);
        }

        console.log(formatter.formatIssues(issues));
    } catch (error) {
        spinner.fail(`Error fetching issues: ${error.message}`);
        process.exit(1);
        console.error('Error fetching issues:', error.message);
    }
};