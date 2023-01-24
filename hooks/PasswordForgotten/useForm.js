import { useState } from 'react';
import { DgraphSearchEmail } from './DgraphSearchEmail';

const initialForm = {
 email: '',
};

export const useForm = () => {
 const [form, setForm] = useState(initialForm);
 const [error, setError] = useState(false);
 const [successMessage, setSuccessMessage] = useState(false);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({
   ...form,
   [name]: value,
  });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.email.trim()) {
   return setError('Complete the email field to search for your account');
  }

  await DgraphSearchEmail(form, setError, setSuccessMessage);
 };

 return {
  form,
  error,
  setSuccessMessage,
  successMessage,
  handleChange,
  handleSubmit,
 };
};
