export const validateForm = (form, target) => {
 let errors = {};
 let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
 let regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,12}$/;

 const emailValidation = () => {
  if (!form.email.trim()) {
   errors.email = 'Email cannot be empty';
  } else if (!regexEmail.test(form.email.trim())) {
   errors.email = 'Looks like this is not an email';
  } else {
   errors.email = true;
  }
 };

 const passwordValidation = () => {
  if (!form.password.trim()) {
   errors.password = 'Password cannot be empty';
  } else if (form.password.length < 6 || form.password.length > 12) {
   errors.password =
    'The password must have at least 6 characters and a maximum of 12 characters';
  } else if (!regexPassword.test(form.password.trim())) {
   errors.password =
    'The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&.)';
  } else {
   errors.password = true;
  }
 };

 const validateAll = () => {
  emailValidation();
  passwordValidation();
 };

 const selectValidation = (target) => {
  const validations = {
   email: emailValidation,
   password: passwordValidation,
   undefined: validateAll,
  };
  const select = validations[target];

  return select();
 };

 selectValidation(target);

 return errors;
};
