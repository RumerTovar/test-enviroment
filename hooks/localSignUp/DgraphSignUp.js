import axios from 'axios';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const url = `${process.env.NEXT_PUBLIC_LOCAL_HOMEPAGE}/api/activationEmail`;

export const DgraphSignUp = (
 form,
 setErrors,
 setSignUpModalIsOpen,
 setVerificationModal,
 validateForm,
 activationToken
) => {
 async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(endpoint, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    query: operationsDoc,
    variables: variables,
    operationName: operationName,
   }),
  });

  return await result.json();
 }

 const operationsDoc = `
   mutation MyMutation($firstName: String!, $lastName: String!, $email: String!, $pwd: String! $activationToken: String!) {
     addAuthors(input: {firstName: $firstName, lastName: $lastName, email: $email, singInProvider: Local, simpleUser: true, collaborator: false, superUser: false, active: false, pwd: $pwd, activationToken: $activationToken}) {
       authors {
         email
       }
     }
   }
   `;

 function executeMyMutation() {
  return fetchGraphQL(operationsDoc, 'MyMutation', {
   firstName: form.firstName,
   lastName: form.lastName,
   email: form.email,
   pwd: form.password,
   activationToken: activationToken,
  });
 }

 async function startExecuteMyMutation() {
  const { errors: error, data } = await executeMyMutation();

  if (error) {
   return setErrors(validateForm(form, 'email', error));
  }
  setSignUpModalIsOpen(false);
  setVerificationModal(true);
  const res = await axios.post(url, {
   email: form.email,
   activationToken,
  });

  console.log(data, res);
 }

 startExecuteMyMutation();
};
