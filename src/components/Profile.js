import React from 'react';
import me from '../images/me.jpg';

export default function Profile() {
  return (
    <div css={styles.root}>
      <div css={styles.content}>
        <h2 css={styles.header}>Hello!</h2>
        <p>
          This site is where I write down all the bits and pieces I've learned
          whilst working on professional projects and open source.
        </p>
      </div>
      <img
        css={styles.img}
        src={me}
        alt="Simon playing drums and singing into a microphone"
      />
    </div>
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
    borderRadius: '50%',
    width: 100,
    height: 100,
  },
};
