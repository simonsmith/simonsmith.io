import React from 'react';

export default function Skills({title, skills}) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {skills.map((s, i) => (
          <li css={styles.item} key={i}>
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}

const styles = {
  item: {
    '& + &': {
      marginTop: '0.2rem',
    },
  },
};
