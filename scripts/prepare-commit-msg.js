const { execSync } = require('child_process')

if (!process.env.SKIP_PREPARE_COMMIT_MSG) {
  execSync('exec < /dev/tty && git cz --hook --colors', {
    stdio: 'inherit',
  })
}
