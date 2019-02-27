import React from 'react';
import Header from './Header';
import Container from './Container';

import 'normalize.css';
import '../styles/global.css';

export default function Layout({children}) {
  return (
    <div css={styles.root}>
      <div css={styles.header}>
        <Container wide>
          <Header />
        </Container>
      </div>
      <Container>{children}</Container>
      <div css={styles.footer}>
        <Container wide>
          <footer>footer text</footer>
        </Container>
      </div>
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '3rem',
    borderBottom: '1px solid #eee',
  },

  footer: {
    marginTop: '4rem',
  },
};
