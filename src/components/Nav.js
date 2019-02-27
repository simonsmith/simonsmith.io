import React from 'react';
import {Link} from 'gatsby';
import {resetList} from './styles';

export default function Nav() {
  return (
    <nav role="navigation">
      <ul css={[styles.root, resetList]}>
        <li>
          <Link to="/">Blog</Link>
        </li>
        <li>
          <a href="https://github.com/simonsmith">Github</a>
        </li>
        <li>
          <a href="https://twitter.com/blinkdesign">Twitter</a>
        </li>
        <li>
          <a href="mailto:me@simonsmith.io">Email</a>
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
