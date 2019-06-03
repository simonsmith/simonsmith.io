import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Employment from '../components/Employment';
import Skills from '../components/Skills';
import CvSection from '../components/CvSection';

function getData(data) {
  const edge = data.allYamlYaml.edges.find(e => e.node.cv);
  return edge.node.cv;
}

export default function CvPage({data}) {
  const cv = getData(data);
  return (
    <Layout>
      <SEO title="CV" />
      <article>
        <header>
          <h1 css={styles.heading}>
            <span className="u-hiddenScreen">{cv.name}</span> {cv.title}
          </h1>
          <p css={styles.site} className="u-hiddenScreen">
            {cv.website}
          </p>
          <p>{cv.intro}</p>
        </header>
        <Employment title={cv.employment.title} jobs={cv.employment.items} />
        <div css={styles.item}>
          <Skills title={cv.skills.title} skills={cv.skills.items} />
        </div>
        <div css={[styles.item, {'page-break-before': 'always'}]}>
          <CvSection title={cv.projects.title} items={cv.projects.items} />
        </div>
        <div css={styles.item}>
          <CvSection title={cv.interests.title} items={cv.interests.items} />
        </div>
      </article>
    </Layout>
  );
}

const styles = {
  heading: {
    '@media print': {
      marginBottom: 0,
    },
  },

  site: {
    '@media print': {
      marginTop: 5,
    },
  },

  item: {
    marginTop: '2.2rem',
  },
};

export const pageQuery = graphql`
  query {
    allYamlYaml {
      edges {
        node {
          id
          cv {
            title
            intro
            name
            website
            employment {
              title
              items {
                company
                role
                start_date
                end_date
                notes
              }
            }
            skills {
              title
              items
            }
            projects {
              title
              items
            }
            interests {
              title
              items
            }
          }
        }
      }
    }
  }
`;
