import React from 'react';

export default function Container({children, wide}) {
  const css = [styles.container];
  if (wide) {
    css.push({maxWidth: 1100});
  }
  return <div css={css}>{children}</div>;
}

const styles = {
  container: {
    margin: '0 auto',
    maxWidth: '720px',
    boxSizing: 'content-box',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',

    '@media print': {
      maxWidth: '100%',
    },
  },
};
