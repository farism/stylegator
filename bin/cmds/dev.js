const config = require('./config').dev

module.exports = {
  command: 'dev [options]',
  description: 'starts styleguider in dev mode',
  builder: function(yargs) {
    yargs
      .options({
        t: {
          alias: 'html',
          description: 'html template file',
        },
        h: {
          alias: 'host',
          description: 'dev server address',
        },
        p: {
          alias: 'port',
          description: 'dev server port',
        },
      })
      .config({})
  },
  handler: function(argv) {
    require('../../src/cli')
      .dev(argv)
      .catch(e => {})
  },
}
