import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'suitcss-utils-display';
import 'suitcss-utils-list';

export default function Employment({title, jobs}) {
  return (
    <>
      <h2>{title}</h2>
      <JobList jobs={jobs} />
    </>
  );
}

function JobList({jobs}) {
  return (
    <ul className="u-listReset u-listNone">
      {jobs.map((job, i) => (
        <li key={i}>
          <Job {...job} />
        </li>
      ))}
    </ul>
  );
}

function Job({company, role, start_date, end_date, notes}) {
  return (
    <section className="entry vcalendar">
      <header>
        <h3 css={styles.heading} className="fn org">
          {company}
          <span>{role}</span>
        </h3>
        <dl css={styles.dates} className="vevent">
          <dt className="u-hiddenVisually">From</dt>
          <dd>
            <time className="dtstart">{start_date}</time>
          </dd>
          <dt css={styles.to}>to</dt>
          <dd>
            {end_date ? <time className="dtend">{end_date}</time> : 'Present'}
          </dd>
        </dl>
      </header>
      {notes && (
        <div className="summary">
          {notes.map((note, i) => (
            <ReactMarkdown key={i} source={note} />
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  heading: {
    marginBottom: 0,

    '& span': {
      fontSize: '0.75em',
      display: 'block',
      color: '#444',
    },
  },

  dates: {
    display: 'flex',
    fontSize: '0.85rem',
    marginTop: 0,

    '& dd': {
      margin: 0,
    },
  },

  to: {
    margin: '0 0.3em',
  },
};
