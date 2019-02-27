import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import PostList from '../components/PostList';

export default function IndexPage({data}) {
  const {edges} = data.allMarkdownRemark;
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <PostList data={edges} />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
