import { useState } from 'react';
import { DgraphChangePassword } from './DgraphChangePassword';
import { DgraphDestroyToken } from './DgraphDestroyToken';
import { validateForm } from './validateForm';

const initialForm = {
 password: '',
 confirmPassword: '',
};

export const useForm = (userEmail) => {
 const [form, setForm] = useState(initialForm);
 const [errors, setErrors] = useState({});
 const [isSubmitted, setIsSubmitted] = useState(false);

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
  if (errors.password === true && errors.confirmPassword === true) {
   const password = form.password;

   DgraphChangePassword(password, userEmail, setIsSubmitted);
   DgraphDestroyToken(userEmail);
  } else {
   return console.log('wrong form');
  }
 };

 return {
  form,
  errors,
  isSubmitted,
  handleChange,
  handleBlur,
  handleSubmit,
 };
};
