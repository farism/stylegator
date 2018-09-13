module.exports = {
  title: 'Stylegator Documentation',
  webpack: (merge, config) => {
    config.module.rules[0].exclude = /(node_modules|packages\/(app|cli|core))/

    return config
  },
}
