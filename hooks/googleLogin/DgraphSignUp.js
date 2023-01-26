import { DgraphAuthentication } from './DgraphAuthentication';
import { DgraphLogIn } from './DgraphLogIn';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphSignUp = (
 data,
 setUser,
 setIsOpen,
 setLoginError,
 setVerificationModal
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
   mutation MyMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
     addAuthors(input: {firstName: $firstName, lastName: $lastName, email: $email, singInProvider: Google, simpleUser: true, collaborator: false, superUser: false, active: false, pwd: $password}) {
       authors {
         email
       }
     }
   }
   `;

 function executeMyMutation() {
  const { email, family_name, given_name, sub: password } = data;

  return fetchGraphQL(operationsDoc, 'MyMutation', {
   firstName: given_name,
   lastName: family_name,
   email: email,
   password: password,
  });
 }

 async function startExecuteMyMutation() {
  const { email } = data;
  const { errors: error, data: registerData } = await executeMyMutation();

  if (error) {
   if (
    error[0].message ===
    `couldn't rewrite mutation addAuthors because failed to rewrite mutation payload because id ${email} already exists for field email inside type Authors`
   ) {
    DgraphAuthentication(
     email,
     setUser,
     setIsOpen,
     setLoginError,
     setVerificationModal
    );
   }
   return setLoginError('Something went wrong, try again');
  }

  DgraphLogIn(data, setUser, setIsOpen, setLoginError, setVerificationModal);
  console.log('console', registerData);
 }

 startExecuteMyMutation();
};
