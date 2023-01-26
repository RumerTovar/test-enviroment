import { useContext, useState } from 'react';
import EmailContext from '../../context/EmailContext';
import UserContext from '../../context/UserContext';
import { DgraphLogIn } from './DgraphLogIn';
import { validateForm } from './validateForm';

const initialForm = {
 email: '',
 password: '',
};

export const useForm = (setIsOpen, setLoginError, setVerificationModal) => {
 const [form, setForm] = useState(initialForm);
 const [errors, setErrors] = useState({});
 const { setEmail } = useContext(EmailContext);

 const { setUser } = useContext(UserContext);

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
  if (errors.email === true && errors.password === true) {
   setEmail(form.email);
   DgraphLogIn(form, setLoginError, setUser, setIsOpen, setVerificationModal);
  } else {
   return setLoginError('Invalid email or password');
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
