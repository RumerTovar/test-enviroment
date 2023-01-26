import { rensendCode } from '../activateAccount/resendCode';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphAuthentication = (
 email,
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
  query MyQuery($email: String!) {
    getAuthors(email: $email) {
      firstName
      lastName
      active
    }
  }
`;

 function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', {
   email: email,
  });
 }

 async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();
  const { getAuthors } = data;

  if (errors) {
   // handle those errors like a pro
   console.error(errors);
   return setLoginError('Something went wrong try again');
  }

  if (!getAuthors.active) {
   rensendCode(email);
   setIsOpen(false);
   return setVerificationModal(true);
  }

  console.log(getAuthors);
  window.localStorage.setItem('loggedAppUser', JSON.stringify(getAuthors));
  setUser(getAuthors);
  setIsOpen(false);
 }

 startFetchMyQuery();
};
