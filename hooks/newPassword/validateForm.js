export const validateForm = (form, target) => {
 let errors = {};

 let regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,12}$/;

 const passwordValidation = () => {
  if (!form.password.trim()) {
   errors.password = 'Password cannot be emptyy';
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

 const confirmPasswordValidation = () => {
  if (!form.confirmPassword.trim()) {
   errors.confirmPassword = 'Confirm password cannot be empty';
  } else if (form.password !== form.confirmPassword) {
   errors.confirmPassword = 'Passwords do not match';
  } else {
   errors.confirmPassword = true;
  }
 };

 const validateAll = () => {
  passwordValidation();
  confirmPasswordValidation();
 };

 const selectValidation = (target) => {
  const validations = {
   password: passwordValidation,
   confirmPassword: confirmPasswordValidation,
   undefined: validateAll,
  };
  const select = validations[target];

  return select();
 };

 selectValidation(target);

 return errors;
};
