/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  serverDependenciesToBundle: [
    'mdx-bundler',
    'remark-gfm',
    'remark-breaks',
    'rehype-slug',
  ],
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
}
