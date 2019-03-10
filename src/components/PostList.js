import React from 'react';
import {Link} from 'gatsby';
import 'suitcss-utils-list';

export default function PostList({data}) {
  return (
    <ul className="u-listReset u-listNone">
      {data.map(item => (
        <PostItem key={item.node.id} post={item.node} />
      ))}
    </ul>
  );
}

function PostItem({post: {frontmatter}}) {
  if (frontmatter.draft) {
    return null;
  }
  return (
    <li css={styles.listItem}>
      <Link css={styles.link} to={frontmatter.path}>
        {frontmatter.title}
      </Link>
      <time css={styles.date}>{frontmatter.date}</time>
    </li>
  );
}

const styles = {
  listItem: {
    lineHeight: '1.5',

    '& + &': {
      marginTop: '1.5rem',
    },
  },

  date: {
    display: 'block',
    color: '#888',
    fontSize: '0.9rem',
    marginTop: '0.2rem',
  },

  link: {
    fontSize: '1.5rem',
    fontFamily: 'Arvo, serif',
    color: '#414141',
    textDecoration: 'none',
  },
};
