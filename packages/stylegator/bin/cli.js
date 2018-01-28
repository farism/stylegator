#!/usr/bin/env node

require('yargs')
  .version(require('../package').version)
  .help('help')
  .showHelpOnFail(true, 'use --help for available options')
  .commandDir('./cmds')
  .demandCommand().argv
