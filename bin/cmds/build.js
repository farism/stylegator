const config = require('./config').build

module.exports = {
  command: 'build [options]',
  description: 'builds a styleguider project for production',
  builder: function(yargs) {
    yargs
      .options({
        t: {
          alias: 'html',
          description: 'optional html template file',
        },
        o: {
          alias: 'output-path',
          description: 'output directory',
        },
        minify: {
          description: 'minify the *.css and *.js files',
        },
      })
      .config({})
      .help('help')
  },
  handler: function(argv) {
    require('../../src/cli')
      .build(argv)
      .catch(e => {})
  },
}
