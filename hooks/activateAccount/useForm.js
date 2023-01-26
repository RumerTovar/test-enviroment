import axios from 'axios';
import { useState } from 'react';
import { validateForm } from './validateForm';
import { useContext } from 'react';
import EmailContext from '../../context/EmailContext';
import { rensendCode } from './resendCode';
import { DgraphActivateAccount } from './DgraphActivateAccount';

const url = `${process.env.NEXT_PUBLIC_LOCAL_HOMEPAGE}/api/verifyActivationToken`;

const initialForm = {
 code: '',
};

export const useForm = (
 setIsSubmitted,
 setIsOpenInputModal,
 setVerificationModal,
 setIsOpen
) => {
 const [form, setForm] = useState(initialForm);
 const [errors, setErrors] = useState({});

 const { email } = useContext(EmailContext);
 const handleClick = () => {
  setIsOpenInputModal(true);
 };

 const handleLogin = () => {
  setVerificationModal(false);
  setIsOpen(true);
 };

 const handleResend = () => {
  rensendCode(email);
  setIsOpenInputModal(false);
  setVerificationModal(true);
 };

 const handleChange = (e) => {
  const { name, value } = e.target;
  const onlyNumbers = /^[0-9]*$/;

  if (onlyNumbers.test(value)) {
   setForm({
    ...form,
    [name]: value,
   });
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  setErrors(validateForm(form));

  if (errors.code === true) {
   const {
    data: { res },
   } = await axios.post(url, {
    email,
    code: form.code,
   });

   console.log(res);

   if (res === 'ok') {
    DgraphActivateAccount(email);
    setIsSubmitted(true);
   }

   if (res === 'invalid code') {
    return setErrors({
     ...errors,
     code: 'Invalid code',
    });
   }

   if (res === 'Invalid token') {
    return setErrors({
     ...errors,
     code:
      'Validation code has expired. Please request a new code and try again.',
    });
   }
  }
 };

 return {
  handleChange,
  handleSubmit,
  handleResend,
  handleClick,
  handleLogin,
  form,
  errors,
 };
};
