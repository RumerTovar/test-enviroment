import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ author }) {
 return (
  <div className={styles.footerContainer}>
   <footer>
    <span>
     Design & illustrations by{' '}
     <a
      href='mailto:lucianopolo@fakemail.com'
      target='_blank'
      rel='noreferrer'
      className={styles.authorFooter}>
      {author}
     </a>
    </span>
   </footer>
  </div>
 );
}
