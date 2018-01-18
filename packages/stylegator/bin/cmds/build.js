const config = require('./config').build

module.exports = {
  command: 'build',
  description: 'builds a Stylegator project for production',
  handler: function(argv) {
    require('../../lib/cli')
      .build(argv)
      .then(console.log)
      .catch(console.error)
  },
}
