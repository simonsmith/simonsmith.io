import React, {useEffect} from 'react';
import loadScript from '../scripts/load-script';
import urlJoin from 'url-join';

export default function Disqus({path, baseUrl, scriptUrl}) {
  useEffect(() => {
    loadScript(scriptUrl).then(() => {
      const url = urlJoin(baseUrl, path, '/');
      window.DISQUS.reset({
        reload: true,
        config: function () {
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
