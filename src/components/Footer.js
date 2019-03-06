import React from 'react';

export default function Footer() {
  return (
    <footer css={styles.root}>
      <p>Simon Smith {new Date().getFullYear()}</p>
      <p>
        Source{' '}
        <a href="https://github.com/simonsmith/simonsmith.io">on Github</a>
      </p>
    </footer>
  );
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
  },
};
