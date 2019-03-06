import React from 'react';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';

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
      <main css={{flex: 1}} role="main">
        <Container>{children}</Container>
      </main>
      <div css={styles.footer}>
        <Container>
          <Footer />
        </Container>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },

  header: {
    marginBottom: '3rem',
    borderBottom: '1px solid #eee',
  },

  footer: {
    marginTop: '4rem',
  },
};
