import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Profile from '../components/Profile';
import Social from '../components/Social';

function getContactData(data) {
  const edge = data.allYamlYaml.edges.find((e) => e.node.contact);
  return edge.node.contact;
}

export default function ContactPage({data}) {
  const {profile, social} = getContactData(data);
  return (
    <Layout>
      <SEO title="Contact" />
      <h1>Contact</h1>
      <div css={styles.social}>
        <Social links={social} />
      </div>
      <div css={styles.profile}>
        <Profile title={profile.title} text={profile.text} />
      </div>
    </Layout>
  );
}

const styles = {
  social: {
    marginTop: '1rem',
  },

  profile: {
    marginTop: '3rem',
  },
};

export const pageQuery = graphql`
  query {
    allYamlYaml {
      edges {
        node {
          contact {
            profile {
              title
              text
            }
            social {
              label
              url
            }
          }
        }
      }
    }
  }
`;
