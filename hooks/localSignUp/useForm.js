import { useState } from 'react';
import { validateForm } from './validateForm';
import { DgraphSignUp } from './DgraphSignUp';
import axios from 'axios';
import { useContext } from 'react';
import EmailContext from '../../context/EmailContext';

const url = `${process.env.NEXT_PUBLIC_LOCAL_HOMEPAGE}/api/activationToken`;

const initialForm = {
 firstName: '',
 lastName: '',
 country: 'United States',
 email: '',
 password: '',
 confirmPassword: '',
};

export const useForm = (setSignUpModalIsOpen, setVerificationModal) => {
 const [form, setForm] = useState(initialForm);
 const [errors, setErrors] = useState({});

 const { setEmail } = useContext(EmailContext);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({
   ...form,
   [name]: value,
  });
 };

 const handleBlur = (e) => {
  const target = e.target.name;
  const objKey = Object.keys(validateForm(form, target));
  const objValue = Object.values(validateForm(form, target));
  setErrors({
   ...errors,
   [objKey[0]]: objValue[0],
  });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors(validateForm(form, undefined));
  if (
   errors.firstName === true &&
   errors.lastName === true &&
   errors.email === true &&
   errors.password === true &&
   errors.confirmPassword === true
  ) {
   try {
    const {
     data: { activationToken },
    } = await axios(url);

    DgraphSignUp(
     form,
     setErrors,
     setSignUpModalIsOpen,
     setVerificationModal,
     validateForm,
     activationToken
    );
    setEmail(form.email);
   } catch (error) {
    console.error(error);
   }
  } else {
   return console.log('wrong form');
  }
 };

 return {
  form,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
 };
};
