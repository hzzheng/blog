export const imports = {
  'index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "index" */ 'index.mdx'),
  'gatsbyjs/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "gatsbyjs-index" */ 'gatsbyjs/index.mdx'),
}
