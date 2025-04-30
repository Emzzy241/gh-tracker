// This file defines the CLI command structure
const { program } = require('commander');

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
  
  // Parse the command line arguments
  program.parse(process.argv);
  
  // If no command is specified, show the help
  if (process.argv.length === 2) {
    program.help();
  }
}

// Export the run function so it can be called from bin/gh-tracker.js
module.exports = { run };