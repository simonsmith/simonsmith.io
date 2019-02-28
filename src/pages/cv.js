import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';

export default function CvPage({data}) {
  const {
    node: {cv},
  } = data.allYamlYaml.edges[0];
  return (
    <Layout>
      <SEO title="CV" />
      <h1>{cv.title}</h1>
      <p>{cv.intro}</p>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allYamlYaml {
      edges {
        node {
          id
          cv {
            title
            intro
            employment {
              company
              role
              start_date
              end_date
              description
            }
          }
        }
      }
    }
  }
`;
