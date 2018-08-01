import yargs from 'yargs'
import findUp from 'find-up'

import { version } from '../package'
import build from './build'
import dev from './dev'

const configPath = findUp.sync('stylegator.config.js')
const config = configPath ? require(configPath) : {}

yargs
  .version(version)
  .help('help')
  .showHelpOnFail(true, 'use --help for available options')
  .config(config)
  .command(build)
  .command(dev)
  .demandCommand().argv
