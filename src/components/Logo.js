import React from 'react';
import {Link} from 'gatsby';

export default function Logo({text}) {
  return (
    <Link to="/" css={styles.root}>
      {text}
    </Link>
  );
}

const styles = {
  root: {
    fontSize: '1.6rem',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
