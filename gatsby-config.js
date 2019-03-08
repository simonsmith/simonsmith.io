module.exports = {
  siteMetadata: {
    title: 'simonsmith.io',
    description:
      'Personal blog covering JavaScript, CSS and other forms of front end tech',
    disqus: {
      url: 'https://simonsmith.io',
      script: '//simonsmithio.disqus.com/embed.js',
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-6798894-3',
        // Puts tracking script in the head instead of the body
        head: false,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 740,
              linkImagesToOriginal: false,
              quality: 80,
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-unwrap-images',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-emotion',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/yaml`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/markdown`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        start_url: '/',
        icon: 'src/images/site-icon.png',
      },
    },
  ],
};
