import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Profile from '../components/Profile';

export default function IndexPage() {
  return (
    <Layout withHeader={false} withFooter={false} centered>
      <SEO title="Home" />
      <Profile />
    </Layout>
  );
}
