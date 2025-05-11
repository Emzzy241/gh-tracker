const Table = require('cli-table3');
const chalk = require('chalk');

function truncate(str, maxLength = 50) {
  if (!str) return '';
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function getStateColor(state) {
  switch (state.toLowerCase()) {
    case 'open':
      return chalk.green;
    case 'closed':
      return chalk.red;
    case 'merged':
      return chalk.magenta;
    default:
      return chalk.white;
  }
}

function getLabelString(labels) {
  if (!labels || labels.length === 0) return '';
  return labels
    .slice(0, 3)
    .map(label => chalk.hex(label.color || '#767676')(`■ ${label.name}`))
    .join(' ');
}

function displayIssuesTable(issues) {
  const table = new Table({
    head: [
      chalk.bold('#'),
      chalk.bold('Title'),
      chalk.bold('State'),
      chalk.bold('Author'),
      chalk.bold('Labels'),
      chalk.bold('Created')
    ],
    colWidths: [8, 40, 12, 15, 25, 12],
    wordWrap: true
  });

  issues.forEach(issue => {
    const stateColor = getStateColor(issue.state);
    
    table.push([
      chalk.cyan(`#${issue.number}`),
      truncate(issue.title, 38),
      stateColor(issue.state),
      issue.user.login,
      getLabelString(issue.labels),
      formatDate(issue.created_at)
    ]);
  });

  console.log(table.toString());
}

function displayPullRequestsTable(pullRequests) {
  const table = new Table({
    head: [
      chalk.bold('#'),
      chalk.bold('Title'),
      chalk.bold('State'),
      chalk.bold('Author'),
      chalk.bold('Branch'),
      chalk.bold('Created')
    ],
    colWidths: [8, 40, 12, 15, 25, 12],
    wordWrap: true
  });

  pullRequests.forEach(pr => {
    let stateDisplay = pr.state;
    let stateColor = getStateColor(pr.state);

    if (pr.merged) {
      stateDisplay = 'merged';
      stateColor = getStateColor('merged');
    }
    
    table.push([
      chalk.cyan(`#${pr.number}`),
      truncate(pr.title, 38),
      stateColor(stateDisplay),
      pr.user.login,
      truncate(pr.head.ref, 23),
      formatDate(pr.created_at)
    ]);
  });

  console.log(table.toString());
}

module.exports = {
  displayIssuesTable,
  displayPullRequestsTable
};