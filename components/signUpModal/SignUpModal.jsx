import styles from './SignUpModal.module.css';
import lightBulb from '../../assets/images/icons/lightBulb.svg';
import Input from './Input';
import { useEffect, useRef } from 'react';
import InputSelect from './InputSelect';
import { useForm } from '../../hooks/localSignUp/useForm';
import Image from 'next/image';

export default function SignUpModal({ setSignUpModalIsOpen, setIsOpen }) {
 const refModal = useRef();

 const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(
  setSignUpModalIsOpen,
  setIsOpen
 );

 useEffect(() => {
  const closeModal = (e) => {
   if (refModal.current && !refModal.current.contains(e.target)) {
    setSignUpModalIsOpen(false);
   }
  };
  document.addEventListener('mousedown', closeModal);

  return () => {
   document.removeEventListener('mousedown', closeModal);
  };
 }, [setSignUpModalIsOpen]);

 return (
  <>
   <div className={styles.modal}>
    <div className={styles.modalContent} ref={refModal}>
     <h3 className={styles.modalTitle}>Come join us!</h3>
     <p className={styles.description}>
      Create an account to manage and add experiences.
     </p>
     <form className={styles.formButton}>
      <Input
       label='First Name'
       type='text'
       name='firstName'
       placeholder='Luciano'
       onBlur={handleBlur}
       onChange={handleChange}
       value={form}
       errors={errors}
      />
      <Input
       label='Last Name'
       type='text'
       name='lastName'
       placeholder='Polo'
       onBlur={handleBlur}
       onChange={handleChange}
       value={form}
       errors={errors}
      />
      <InputSelect
       label='Country of residence'
       name='country'
       onChange={handleChange}
       value={form}
      />
      <Input
       label='Email'
       type='email'
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
      <Input
       label='Confirm password'
       type='password'
       name='confirmPassword'
       placeholder='password'
       onBlur={handleBlur}
       onChange={handleChange}
       value={form}
       errors={errors}
      />
      <button className={styles.loginButton} onClick={handleSubmit}>
       <Image src={lightBulb} alt='log in icon' /> <span>sign up</span>
      </button>
     </form>
    </div>
   </div>
  </>
 );
}
