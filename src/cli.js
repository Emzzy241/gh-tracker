// This file defines the CLI command structure
const { program } = require('commander');
const issuesCommand = require('./commands/issues');
const prsCommand = require('./commands/prs');
const { version } = require('../package.json')

// Define the main function that will be called when the CLI runs
function run() {
  // Set up the program with name, description, and version
  program
    .name('gh-tracker')
    .description('A GitHub issues and PR tracker for the terminal')
    .version('0.1.0');
  
  // Add a simple command to test that everything is working
  program
    .command('hello')
    .description('Test command to verify the CLI is working')
    .action(() => {
      console.log('Hello from gh-tracker! 👋');
      console.log('Your CLI tool is working correctly.');
    });

    // Adding more functionalities to be executed when the program runs
    // Defining a  CLI command using the commander library 
    program
      .command('issues <repo>')
      .description('List GitHub issues for a repository')
      .option('-s, --state <state>', 'Filter GitHub issues by state (open, closed, all)', 'open')
      .option('-l, --label <label>', 'Filter issues by label')
      .option('--limit <number>', 'Limit the number of results', parseInt, 10)
      .option('--json', 'Output as JSON')
      .action(issuesCommand);
      // The issuesCommand function will be defined in src/commands/issues.js and will handle the logic for fetching and displaying issues based on the provided arguments and options

    program
      .command('prs <repo>')
      .description('List GitHub pull requests for a repository')
      .option('-s, --state <state>', 'Filter GitHub pull requests by state (open, closed, all)' , 'open')
      .option('-l, --label <label>', 'Filter based on the number of results', parseInt, 10)
      .option('--limit <number>', 'Limit the number of results', parseInt, 10)
      .option('--json', 'Output as JSON')
      .action(prsCommand);
      // The prsCommand function will be defined in src/commands/prs.js and will handle the logic for fetching and displaying pull requests based on the provided arguments and options

      // Add config command to set the GitHub token
      program
        .command('config <token>')
        .description('Manage Configuration: Set the GitHub token for authentication')
        .option('--set-token <token>', 'Set the GitHub token')
        .option('--get-token', 'Get the GitHub token')
        .option('--delete-token', 'Delete the GitHub token')
        .action(async (options) => {
          const configUtil = require('./utils/configUtil');
          
          if (options.setToken) {
            
            await configUtil.setToken(options.setToken);
            console.log('GitHub token saved successfully.');
          }
          if (options.view) {
            const config = await configUtil.getConfig();
            // Not showing the actual token for security reasons, just show whethe rit's set or not
            console.log({
              ...config,
              token: config.token ? '**********' : 'undefined'
            })
          }
        });


  // Parse the command line arguments
  program.parse(process.argv);
  
  // If no command is specified, show the help
  if (process.argv.length === 2) {
    program.help();
  }
}

// Export the run function so it can be called from bin/gh-tracker.js
module.exports = { run };