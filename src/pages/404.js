import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';

import image from '../images/404.png';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>That page was not found...</h1>
    <div css={{textAlign: 'center'}}>
      <img css={{maxWidth: '100%', height: 'auto'}} src={image} alt="" />
    </div>
  </Layout>
);

export default NotFoundPage;
