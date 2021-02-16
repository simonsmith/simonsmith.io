import React from 'react';
import me from '../images/me.jpg';

export default function Profile({title, text}) {
  return (
    <article css={styles.root}>
      <header css={styles.content}>
        <h2 css={styles.header}>{title}</h2>
        <p>{text}</p>
      </header>
      <img css={styles.img} src={me} alt="Simon sitting at a table" />
    </article>
  );
}

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  header: {
    marginTop: 0,
    marginBottom: '0.8rem',
    fontSize: '1.3rem',
  },

  content: {
    order: 2,
    marginLeft: '1rem',

    '& p': {
      margin: 0,
      fontSize: '0.9rem',
    },
  },

  img: {
    order: 1,
    border: '1px solid #ddd',
    padding: 4,
    height: 'auto',
    maxWidth: 160,
  },
};
