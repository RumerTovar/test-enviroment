import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './VerificationModal.module.css';
import key from '../../assets/images/icons/key.svg';
import rocket from '../../assets/images/icons/rocket.svg';
import Input from './Input';
import { useForm } from '../../hooks/activateAccount/useForm';

export default function VerificationModal({ setVerificationModal, setIsOpen }) {
 const [isOpenInputModal, setIsOpenInputModal] = useState(false);
 const [isSubmitted, setIsSubmitted] = useState(false);

 const {
  handleChange,
  handleSubmit,
  handleResend,
  handleClick,
  handleLogin,
  form,
  errors,
 } = useForm(
  setIsSubmitted,
  setIsOpenInputModal,
  setVerificationModal,
  setIsOpen
 );

 const refModal = useRef();
 useEffect(() => {
  const closeModal = (e) => {
   if (refModal.current && !refModal.current.contains(e.target)) {
    setVerificationModal(false);
    setIsOpenInputModal(false);
   }
  };
  document.addEventListener('mousedown', closeModal);

  return () => {
   document.removeEventListener('mousedown', closeModal);
  };
 }, []);

 return (
  <>
   {!isOpenInputModal ? (
    <div className={styles.modal}>
     <div className={styles.modalContent} ref={refModal}>
      <h3 className={styles.modalTitle}>Account Verification</h3>
      <p className={styles.description}>
       A verification code has been sent to your email address to activate your
       account.
      </p>
      <button
       type='submit'
       className={styles.loginButton}
       onClick={handleClick}>
       <span>I have a code</span>
      </button>
     </div>
    </div>
   ) : (
    <div className={styles.modal}>
     <div className={styles.modalContent} ref={refModal}>
      <h3 className={styles.modalTitle}>Account Verification</h3>
      {!isSubmitted ? (
       <>
        <p className={styles.description}>Please enter the verification code</p>
        <form className={styles.formButton}>
         <Input
          label=''
          type='text'
          name='code'
          placeholder='Verification code'
          onChange={handleChange}
          value={form}
          errors={errors}
         />

         <div className={styles.recoverPassword}>
          <p onClick={handleResend}>Resend the code</p>
         </div>
         <button
          type='submit'
          className={styles.loginButton}
          onClick={handleSubmit}>
          <Image src={key} alt='log in icon' width={12} height={12} />
          <span>Submit</span>
         </button>
        </form>
       </>
      ) : (
       <>
        <p className={styles.description}>
         Your account was successfully activated, please login to your account.
        </p>
        <button
         type='submit'
         className={styles.loginButton}
         onClick={handleLogin}>
         <Image src={rocket} alt='log in icon' width={12} height={12} />
         <span>log in</span>
        </button>
       </>
      )}
     </div>
    </div>
   )}
  </>
 );
}
