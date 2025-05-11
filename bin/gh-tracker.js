#!/usr/bin/env node

// This is the entry point for our CLI tool
// The shebang line above tells Unix-like systems to run this file with Node.js
// This actually helps in ensuring that my CLI tool is cross-platform, in the sense that it works well even while using other OS like Linux, 

const cli = require('../src/cli');
cli.run();

