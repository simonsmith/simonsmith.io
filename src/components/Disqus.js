import React, {useEffect} from 'react';
import loadScript from '../scripts/load-script';
import urlJoin from 'url-join';

const BASE_URL = 'https://simonsmith.io';

export default function Disqus({path}) {
  useEffect(() => {
    loadScript('//simonsmithio.disqus.com/embed.js').then(() => {
      const url = urlJoin(BASE_URL, path, '/');
      window.DISQUS.reset({
        reload: true,
        config: function() {
          this.page.url = url;
          this.page.identifier = url;
        },
      });
    });
  });
  return (
    <div css={styles.root}>
      <div id="disqus_thread" />
    </div>
  );
}

const styles = {
  root: {
    marginTop: '4rem',
  },
};
