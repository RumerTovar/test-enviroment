import styles from './PasswordForgotten.module.css';
import { useEffect, useRef } from 'react';
import Input from './Input';
import key from '../../assets/images/icons/key.svg';
import Image from 'next/image';
import { useForm } from '../../hooks/PasswordForgotten/useForm';

export default function PasswordForgotten({ setPasswordForgottenModal }) {
 const refModal = useRef();

 const {
  form,
  error,
  setSuccessMessage,
  successMessage,
  handleChange,
  handleSubmit,
 } = useForm();

 useEffect(() => {
  const closeModal = (e) => {
   if (refModal.current && !refModal.current.contains(e.target)) {
    setSuccessMessage(false);
    setPasswordForgottenModal(false);
   }
  };
  document.addEventListener('mousedown', closeModal);

  return () => {
   document.removeEventListener('mousedown', closeModal);
  };
 }, [setPasswordForgottenModal, setSuccessMessage]);

 return (
  <>
   <div className={styles.modal}>
    <div className={styles.modalContent} ref={refModal}>
     <h3 className={styles.modalTitle}>Password forgotten?</h3>

     <p className={styles.description}>
      {`No worries, it happens to all of us and we're here to help!`} <br /> 💪
     </p>
     <hr className={styles.spaceBar} />
     {!successMessage ? (
      <>
       <p className={`${styles.description} ${styles.passwordMessage}`}>
        Please insert the email that you would like to use to change your
        password.
       </p>
       <form className={styles.formButton}>
        <Input
         label='Email'
         type='email'
         name='email'
         placeholder='luciano.polo@fakemail.com'
         onChange={handleChange}
         value={form.email}
         error={error}
        />
        <button
         type='submit'
         className={styles.loginButton}
         onClick={handleSubmit}>
         <Image
          className={styles.key}
          src={key}
          alt='log in icon'
          width={12}
          height={12}
         />
         <span>send me a link</span>
        </button>
       </form>
      </>
     ) : (
      <p className={styles.description}>
       Nice! Check your email, the link to reset your password is on its way!
      </p>
     )}
    </div>
   </div>
  </>
 );
}
