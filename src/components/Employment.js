import React from 'react';
import ReactMarkdown from 'react-markdown';

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
    <ul>
      {jobs.map((job, i) => (
        <li key={i}>
          <Job {...job} />
        </li>
      ))}
    </ul>
  );
}

function Job({company, role, website, start_date, end_date, notes}) {
  return (
    <section className="entry vcalendar">
      <header>
        <h3 className="fn org">
          {company}
          <span>{role}</span>
        </h3>
        <div>
          {website && (
            <a className="company-url location" href={`http://${website}`}>
              {website}
            </a>
          )}
          <dl className="vevent">
            <dt className="u-hiddenVisually">From</dt>
            <dd>
              <time className="dtstart">{start_date}</time>
            </dd>
            <dt>to</dt>
            <dd>
              {end_date ? <time className="dtend">{end_date}</time> : 'Present'}
            </dd>
          </dl>
        </div>
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
  root: {
    background: 'red',
  },
};
