const config = require('./config').dev

module.exports = {
  command: 'dev',
  description: 'starts Stylegator in dev mode',
  builder: function(yargs) {
    yargs
      .options({})
      .config({})
      .help('help')
  },
  handler: function(argv) {
    require('../../lib/cli')
      .dev(argv)
      .then(console.log)
      .catch(console.error)
  },
}
