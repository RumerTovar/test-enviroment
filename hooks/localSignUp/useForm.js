import { useState } from 'react';
import { validateForm } from './validateForm';
import { DgraphSignUp } from './DgraphSignUp';

const initialForm = {
 firstName: '',
 lastName: '',
 country: 'United States',
 email: '',
 password: '',
 confirmPassword: '',
};

export const useForm = (setSignUpModalIsOpen, setIsOpen) => {
 const [form, setForm] = useState(initialForm);
 const [errors, setErrors] = useState({});

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

 const handleSubmit = (e) => {
  e.preventDefault();
  setErrors(validateForm(form, undefined));
  if (
   errors.firstName === true &&
   errors.lastName === true &&
   errors.email === true &&
   errors.password === true &&
   errors.confirmPassword === true
  ) {
   DgraphSignUp(form, setErrors, setSignUpModalIsOpen, setIsOpen, validateForm);
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
