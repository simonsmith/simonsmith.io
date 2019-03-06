import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';

function getData(data) {
  const edge = data.allYamlYaml.edges.find(e => e.node.cv);
  return edge.node.cv;
}

export default function CvPage({data}) {
  const cv = getData(data);
  return (
    <Layout>
      <SEO title="CV" />
      <h1>{cv.title}</h1>
      <p>{cv.intro}</p>
      <h2>Employment</h2>
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
              notes
            }
          }
        }
      }
    }
  }
`;
