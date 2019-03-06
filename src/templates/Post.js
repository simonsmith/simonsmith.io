import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Disqus from '../components/Disqus';

export default function PostTemplate({data, location}) {
  const {markdownRemark} = data;
  const {frontmatter, html} = markdownRemark;
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div>
        <h1 css={styles.header}>{frontmatter.title}</h1>
        <time css={styles.date}>{frontmatter.date}</time>
        <div css={styles.content} dangerouslySetInnerHTML={{__html: html}} />
        <Disqus path={location.pathname} />
      </div>
    </Layout>
  );
}

const styles = {
  header: {
    marginBottom: '.5rem',
  },

  date: {
    fontSize: '0.9rem',
    display: 'block',
  },

  content: {
    marginTop: '2rem',
  },
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: {path: {eq: $path}}) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
