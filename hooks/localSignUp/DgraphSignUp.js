const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphSignUp = (
 form,
 setErrors,
 setSignUpModalIsOpen,
 setIsOpen,
 validateForm
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
   mutation MyMutation($firstName: String!, $lastName: String!, $email: String!, $pwd: String!) {
     addAuthors(input: {firstName: $firstName, lastName: $lastName, email: $email, singInProvider: Local, simpleUser: true, collaborator: false, superUser: false, active: true, pwd: $pwd}) {
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
  });
 }

 async function startExecuteMyMutation() {
  const { errors: error, data } = await executeMyMutation();

  if (error) {
   return setErrors(validateForm(form, 'email', error));
  }

  setSignUpModalIsOpen(false);
  setIsOpen(true);
  console.log(data);
 }

 startExecuteMyMutation();
};
