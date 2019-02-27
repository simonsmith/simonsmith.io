import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import Nav from './Nav';
import Logo from './Logo';

export default function Header() {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={renderHeader}
    />
  );
}

function renderHeader(data) {
  const {title} = data.site.siteMetadata;
  return (
    <header role="banner" css={styles.root}>
      <div css={styles.layout}>
        <div css={styles.logo}>
          <Logo text={title} />
        </div>
        <Nav />
      </div>
    </header>
  );
}

const styles = {
  root: {
    fontFamily: 'Arvo',
    paddingTop: '1.2rem',
    paddingBottom: '1.2rem',
  },

  logo: {
    '@media (max-width: 600px)': {
      marginBottom: '0.8rem',
    },
  },

  layout: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
};
