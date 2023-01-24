export const validateForm = (form, target, error) => {
 let errors = {};
 let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
 let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
 let regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,12}$/;

 const firstNameValidation = () => {
  if (!form.firstName.trim()) {
   errors.firstName = 'First Name cannot be empty';
  } else if (!regexName.test(form.firstName.trim())) {
   errors.firstName = "The 'First Name' field only accepts letters and blanks";
  } else {
   errors.firstName = true;
  }
 };

 const lastNameValidation = () => {
  if (!form.lastName.trim()) {
   errors.lastName = 'Last Name cannot be empty';
  } else if (!regexName.test(form.lastName.trim())) {
   errors.lastName = "The 'Last Name' field only accepts letters and blanks";
  } else {
   errors.lastName = true;
  }
 };

 const emailValidation = () => {
  if (!form.email.trim()) {
   errors.email = 'Email cannot be empty';
  } else if (!regexEmail.test(form.email.trim())) {
   errors.email = 'Looks like this is not an email';
  } else if (error) {
   errors.email = `Email ${form.email} already exists`;
  } else {
   errors.email = true;
  }
 };

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
  firstNameValidation();
  lastNameValidation();
  emailValidation();
  passwordValidation();
  confirmPasswordValidation();
 };

 const selectValidation = (target) => {
  const validations = {
   firstName: firstNameValidation,
   lastName: lastNameValidation,
   email: emailValidation,
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
