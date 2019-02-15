export const imports = {
  'tutorials/gatsbyjs/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "tutorials-gatsbyjs-index" */ 'tutorials/gatsbyjs/index.mdx'),
}
