import styles from './Header.module.css';
import logo from '../assets/images/logo.svg';
import experienceLogo from '../assets/images/experience.svg';
import house from '../assets/images/icons/house.svg';
import Hero from './Hero';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '../context/UserContext';

export default function Header({ setIsOpen }) {
 const [logoutVisible, setLogoutVisible] = useState(false);

 const { setUser, user } = useContext(UserContext);

 const router = useRouter();

 const logOut = () => {
  setUser({});
  window.localStorage.removeItem('loggedAppUser');
  return setLogoutVisible(false);
 };

 const refLogout = useRef();

 const handleClickHome = () => {
  router.push('/');
 };
 useEffect(() => {
  const closeLogout = (e) => {
   if (refLogout.current && !refLogout.current.contains(e.target)) {
    setLogoutVisible(false);
   }
  };
  document.addEventListener('mousedown', closeLogout);

  return () => {
   document.removeEventListener('mousedown', closeLogout);
  };
 }, []);

 return (
  <div className={styles.headerWrapper}>
   <header className={styles.headerContainer}>
    <div className={styles.navContainer}>
     <div className={styles.navLogoContainer}>
      <Image
       className={styles.imageContainer}
       src={experienceLogo}
       alt='logo'
       onClick={handleClickHome}
      />
      <span className={styles.navTitle}>Catalog</span>
     </div>
     {Object.keys(user).length === 0 ? (
      <button className={styles.buttom}>
       <Image className={styles.houseImage} src={house} alt='house' />
       <span onClick={() => setIsOpen(true)} className={styles.buttomText}>
        login
       </span>
      </button>
     ) : (
      <div className={styles.dropdown}>
       <button className={styles.buttom} onClick={() => setLogoutVisible(true)}>
        <Image className={styles.houseImage} src={house} alt='house' />
        <span className={styles.buttomText}>
         {`${user?.firstName.charAt(0)} ${user?.lastName.charAt(0)}`}
        </span>
       </button>
       {logoutVisible && (
        <div ref={refLogout}>
         <p className={styles.dropdownContent} onClick={() => logOut()}>
          Logout
         </p>
        </div>
       )}
      </div>
     )}
    </div>
    <Hero
     img={logo}
     author={'Luciano Polo'}
     subjectType={'Painting'}
     experience={'Create'}
     gradeLevel={'9th'}
    />
   </header>
  </div>
 );
}
