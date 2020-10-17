module.exports = {
  // pathPrefix: '/blog',
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-73103095-1',
        // this option places the tracking script into the head of the DOM
        head: true
        // other options
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true
            }
          },
          'gatsby-remark-emojis'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#1CA083',
        showSpinner: false
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass'
  ]
}
