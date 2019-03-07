import React from 'react';

export default function Skills({title, skills}) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {skills.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </>
  );
}
