import React from 'react';
import me from '../images/me-green.webp';
import resumeIcon from '../images/resume.webp';
import githubIcon from '../images/github.webp';
import emailIcon from '../images/email.webp';
import blogIcon from '../images/blog.webp';
import {Link} from 'gatsby';

export default function Profile() {
  return (
    <article css={styles.root}>
      <header css={styles.header}>
        <div css={styles.headerInner}>
          <h1>Simon Smith</h1>
          <p>Technical Lead</p>
          <ul css={styles.info}>
            <li>
              <InfoItem
                src={githubIcon}
                text="Github"
                link="https://github.com/simonsmith"
              />
            </li>
            <li>
              <InfoItem
                src={emailIcon}
                text="Email"
                link="mailto:shotsminim@gmail.com"
              />
            </li>
            <li>
              <InfoItem
                src={resumeIcon}
                text="View CV"
                link="https://flowcv.com/resume/4k4g7wi75l"
              />
            </li>
          </ul>
        </div>
        <img css={styles.img} src={me} alt="" />
      </header>
      <div css={styles.content}>
        <p>
          Established technical leader with over 15 years of hands-on experience
          across the entire stack, with a focus and interest in front end
          technologies and the challenges they provide.
        </p>
        <p>
          Proven track record of leading cross-functional teams and delivering
          high-quality, scalable solutions. Passionate about staying at the
          forefront of emerging front-end technologies, best practices and user
          experience patterns.
        </p>
      </div>
      <div css={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
        <div css={infoItemStyles}>
          <img src={blogIcon} alt="" width="25" />
          <Link to="/blog">Read my blog</Link>
        </div>
      </div>
    </article>
  );
}

const InfoItem = ({src, text, link}) => {
  return (
    <div css={infoItemStyles}>
      <img src={src} alt="" width="20" />
      <a href={link}>{text}</a>
    </div>
  );
};

const infoItemStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  '& a': {
    fontSize: '0.8rem',
  },
};

const styles = {
  root: {
    maxWidth: '640px',
  },

  header: {
    display: 'flex',
    alignItems: 'center',

    '@media (max-width: 475px)': {
      flexDirection: 'column',
      alignItems: 'center',

      '& > img': {
        order: 1,
        marginBottom: '1rem',
      },

      '& > div': {
        order: 2,
      },

      '& h1, & p': {
        textAlign: 'center',
      },
    },

    '& h1': {
      marginTop: 0,
      marginBottom: 0,
      fontSize: '2rem',
    },

    '& p': {
      fontSize: '1.2rem',
      marginTop: 0,
      marginBottom: 0,
    },

    '& img': {
      '@media (min-width: 475px)': {
        marginLeft: 'auto',
      },
      '@media (max-width: 475px)': {
        // order: 1,
      },
    },
  },

  info: {
    margin: 0,
    padding: 0,
    marginTop: '1rem',
    listStyle: 'none',
    display: 'flex',
    gap: '28px',
  },

  content: {
    marginTop: '2rem',
    '& p': {
      marginTop: 0,
    },
  },

  img: {
    border: '1px solid #ddd',
    padding: 5,
    height: 'auto',
    maxWidth: 110,
  },
};
