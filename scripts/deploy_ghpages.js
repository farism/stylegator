const fs = require('fs-extra')
const { exec } = require('execa-pro')
const tmp = require('tmp')

const { version } = require('../lerna.json')

tmp.setGracefulCleanup()

const deploy = async () => {
  const target = process.argv.slice(2)[0] || version
  const [{ stdout: remote }] = await exec('git config remote.origin.url')
  const { name, removeCallback } = await tmp.dirSync()
  await exec(
    [
      `cd ${name}`,
      `git init`,
      `git remote add --fetch ${remote}`,
      `git checkout -b gh-pages`,
      `git checkout gh-pages`,
      `rm -rf ${target}`,
      `cp -r ../packages/documentation/build ${target}`,
      `git add --all`,
      `git commit --allow-empty -m "[ci skip] deploy gh pages"`,
      `git push --force --quiet origin gh-pages`,
      `cd ${process.cwd()}`,
    ],
    {
      reject: false,
      stdio: 'inherit',
    }
  )
  removeCallback()
}

deploy()
