export const validateForm = (form) => {
 let errors = {};
 let regexCode = /^\d{6}$/;

 const codeValidation = () => {
  if (!form.code.trim()) {
   errors.code = 'Validation code cannot be empty';
  } else if (!regexCode.test(form.code.trim())) {
   errors.code = 'Please enter a 6-digit number.';
  } else {
   errors.code = true;
  }
 };

 codeValidation();

 return errors;
};
