import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function CvSection({title, items}) {
  return (
    <section>
      <h2>{title}</h2>
      {items.map((note, i) => (
        <ReactMarkdown key={i} source={note} />
      ))}
    </section>
  );
}
