import styles from './Hero.module.css';
import Image from 'next/image';

function Hero({ img, author, subjectType, experience, gradeLevel }) {
 return (
  <>
   <div className={styles.headerTitleContainer}>
    <h1>Pick or Come Up With a Quote And Express it Artistically</h1>
    <div className={styles.imageContainer}>
     <Image src={img} alt='titleImage' />
    </div>
   </div>
   <div className={styles.headerDescription}>
    <div className={styles.descContent}>
     <p>author</p>
     <span className={styles.headerAuthor}>{author}</span>
    </div>
    <div className={styles.descContent}>
     <p>Experience</p>
     <span>{experience}</span>
    </div>
    <div className={styles.descContent}>
     <p>subject type</p>
     <span>{subjectType}</span>
    </div>
    <div className={styles.descContent}>
     <p>grade level</p>
     <span>{gradeLevel} grade</span>
    </div>
   </div>
  </>
 );
}

export default Hero;
