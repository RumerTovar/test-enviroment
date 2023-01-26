import styles from './LoginModal.module.css';
import lightBulb from '../../assets/images/icons/lightBulb.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';
import { useGooglehook } from '../../hooks/googleLogin/useGooglehook';
import { useEffect, useRef, useState } from 'react';
import Input from './Input';
import { useForm } from '../../hooks/localLogin/useForm';
import Image from 'next/image';

export default function Modal({
 setIsOpen,
 setSignUpModalIsOpen,
 setPasswordForgottenModal,
 setVerificationModal,
}) {
 const [loginError, setLoginError] = useState(false);
 const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(
  setIsOpen,
  setLoginError,
  setVerificationModal
 );
 const { login } = useGooglehook(
  setIsOpen,
  setLoginError,
  setVerificationModal
 );

 const refModal = useRef();

 const handleClickSignUp = () => {
  setIsOpen(false);
  setSignUpModalIsOpen(true);
 };

 const handleClickPasswordForgotten = () => {
  setIsOpen(false);
  setPasswordForgottenModal(true);
 };

 useEffect(() => {
  const closeModal = (e) => {
   if (refModal.current && !refModal.current.contains(e.target)) {
    setIsOpen(false);
   }
  };
  document.addEventListener('mousedown', closeModal);

  return () => {
   document.removeEventListener('mousedown', closeModal);
  };
 }, []);

 return (
  <>
   <div className={styles.modal}>
    <div className={styles.modalContent} ref={refModal}>
     <h3 className={styles.modalTitle}>Welcome back</h3>
     <p className={styles.description}>Log back into your account.</p>
     {loginError && <p className={styles.errors}>{loginError}</p>}
     <form className={styles.formButton}>
      <Input
       label='Email'
       type='text'
       name='email'
       placeholder='luciano.polo@fakemail.com'
       onBlur={handleBlur}
       onChange={handleChange}
       value={form}
       errors={errors}
      />
      <Input
       label='Password'
       type='password'
       name='password'
       placeholder='password'
       onBlur={handleBlur}
       onChange={handleChange}
       value={form}
       errors={errors}
      />
      <div className={styles.recoverPassword}>
       <p onClick={handleClickPasswordForgotten}>Forgot your password?</p>
      </div>
      <button
       type='submit'
       className={styles.loginButton}
       onClick={handleSubmit}>
       <Image src={rocketIcon} alt='log in icon' /> <span>log in</span>
      </button>
     </form>
     <hr className={styles.spaceBar} />
     <button className={styles.signUpButton} onClick={login}>
      <span>continue with google</span>
     </button>
     <button className={styles.signUpButton}>
      <span>continue with apple</span>
     </button>
     <hr className={styles.spaceBar} />
     <p className={styles.description}>Not part of our community yet?</p>
     <button className={styles.signUpButton} onClick={handleClickSignUp}>
      <Image src={lightBulb} alt='log in icon' /> <span>sign up</span>
     </button>
    </div>
   </div>
  </>
 );
}
