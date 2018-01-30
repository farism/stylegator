import { build } from '@stylegator/core'

export default {
  command: 'build',
  description: 'Builds a static Stylegator app',
  builder: {
    'src-dir': {
      description: 'webpack src directory',
      default: 'src',
    },
    'entry-point': {
      description: 'webpack entry point',
      default: 'index.js',
    },
    'build-dir': {
      description: 'build output directory',
      default: 'build',
    },
    template: {
      description: 'html-webpack-plugin template file',
      default: 'index.html',
    },
    title: {
      description: 'html-webpack-plugin title string',
      default: 'Stylegator',
    },
  },
  handler: argv => {
    build(argv)
  },
}
