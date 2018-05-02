const path = require('path')
const { exec, shell } = require('execa-pro')

const { version } = require('../lerna.json')

const cwd = path.join(process.cwd(), 'tmp/gh-pages')

;(async () => {
  const target = process.argv.slice(2)[0]
  const remote = await exec('git config remote.origin.url')
  await exec(`mkdirp ${cwd}`)
  await exec(
    [
      `git init`,
      `git remote add --fetch origin ${remote[0].stdout}`,
      `git checkout -b gh-pages`,
      `git checkout gh-pages`,
      `rm -rf ${target || 'latest'}`,
      `mkdirp v`,
      `cp -r ../../packages/docs/build ${target || `v/${version}`}`,
      `cp -r ../../packages/docs/build ${target || 'latest'}`,
      `cp -r ../../packages/docs/build/404.html 404.html`,
      `git add --all`,
      `git commit --allow-empty -m gh-pages`,
      `git push --force --quiet origin gh-pages`,
    ],
    {
      cwd,
      stdio: 'inherit',
      reject: false,
    }
  )
})()
