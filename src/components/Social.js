import React from 'react';

export default function Social({links}) {
  const items = links.map(l => (
    <li css={styles.root} key={l.label}>
      <a css={styles.link} href={l.url}>
        {l.label}
      </a>
    </li>
  ));
  return <ul>{items}</ul>;
}

const styles = {
  root: {
    '& + &': {
      marginTop: '0.2rem',
    },
  },

  link: {
    textDecoration: 'none',
  },
};
