import React from 'react';

export default function Footer() {
  return (
    <div css={styles.root}>
      <p>Simon Smith {new Date().getFullYear()}</p>
      <p>
        Source{' '}
        <a href="https://github.com/simonsmith/simonsmith.io">on Github</a>
      </p>
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
  },
};
