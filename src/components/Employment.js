import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'suitcss-utils-display';
import 'suitcss-utils-list';

const text = require('!!raw-loader!./treatwell.md');

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

function Job({company, role2, role2_start, role, start_date, end_date, notes}) {
  let additionalRole = null;
  if (role2 && role2_start) {
    additionalRole = (
      <>
        <span>{role2}</span>
        <dl css={styles.dates} className="vevent">
          <dt className="u-hiddenVisually">From</dt>
          <dd>
            <time className="dtstart">{role2_start}</time>
          </dd>
          <dt css={styles.to}>to</dt>
          <dd>Present</dd>
        </dl>
      </>
    );
  }

  // quick and dirty workaround to getting markdown to work
  // for a single item. We just care about Treatwell here
  let noteComponent;
  if (Array.isArray(notes)) {
    noteComponent = (
      <div className="summary">
        {notes.map((note, i) => (
          <ReactMarkdown key={i} source={note} />
        ))}
      </div>
    );
  }
  if (company === 'Treatwell') {
    noteComponent = <ReactMarkdown source={text} />;
  }

  return (
    <section className="entry vcalendar">
      <header>
        <h3 css={styles.heading} className="fn org">
          {company}
        </h3>
        {additionalRole}
        <span>{role}</span>
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
      <div className="summary">{noteComponent}</div>
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
