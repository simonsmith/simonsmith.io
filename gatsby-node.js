const path = require('path');

exports.createPages = async ({actions, graphql}) => {
  const {createPage} = actions;
  const PostTemplate = path.resolve(`src/templates/Post.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]}
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.frontmatter.path,
        component: PostTemplate,
        context: {},
      });
    });
  });
};
