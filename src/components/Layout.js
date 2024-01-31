import React from 'react';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';

import 'normalize.css';
import '../styles/global.css';
import '../styles/print.css';

export default function Layout({
  children,
  withHeader = true,
  withFooter = true,
  centered = false,
}) {
  const mainStyles = {
    flex: 1,
    display: 'flex',
  };
  if (centered) {
    mainStyles.placeItems = 'center';
  }
  return (
    <div css={styles.root}>
      {withHeader && (
        <div css={styles.header}>
          <Container>
            <Header />
          </Container>
        </div>
      )}
      <main css={mainStyles} role="main">
        <Container>{children}</Container>
      </main>
      {withFooter && (
        <div css={styles.footer}>
          <Container wide>
            <Footer />
          </Container>
        </div>
      )}
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
    borderBottom: '1px solid #ddd',

    '@media print': {
      display: 'none',
    },
  },

  footer: {
    marginTop: '4rem',

    '@media print': {
      display: 'none',
    },
  },
};
