import React from 'react';
import {Link} from 'gatsby';
import 'suitcss-utils-list';

export default function Nav() {
  return (
    <nav role="navigation">
      <ul className="u-listReset u-listNone" css={styles.root}>
        <li>
          <Link to="/">Blog</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  root: {
    display: 'flex',
    fontSize: '1.1rem',
    textTransform: 'lowercase',

    '& li + li': {
      marginLeft: '1rem',
    },

    '& a': {
      textDecoration: 'none',
    },
  },
};
