import { rensendCode } from '../activateAccount/resendCode';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphLogIn = (
 form,
 setLoginError,
 setUser,
 setIsOpen,
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
  query MyQuery($email: String!, $password: String!) {
    checkAuthorsPassword(email: $email, pwd: $password) {
      email
      firstName
      lastName
    }
  }
`;

 const checkProvider = `
   query checkProvider($email:String!) {
     getAuthors(email: $email) {
       singInProvider
     }
   }
 `;

 const isActive = `query isActive($email:String!) {
  getAuthors(email: $email) {
    active
  }
}
`;

 function fetchProvider() {
  return fetchGraphQL(checkProvider, 'checkProvider', { email: form.email });
 }

 function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', {
   email: form.email,
   password: form.password,
  });
 }

 function fetchIsActive() {
  return fetchGraphQL(isActive, 'isActive', { email: form.email });
 }

 async function startFetchMyQuery() {
  try {
   const { errors: isActiveErrors, data: isActive } = await fetchIsActive();
   const { errors: providerErrors, data: provider } = await fetchProvider();
   const { errors: error, data } = await fetchMyQuery();
   const { singInProvider } = provider.getAuthors;
   const { checkAuthorsPassword } = data;
   const {
    getAuthors: { active },
   } = isActive;

   if (error) {
    console.error(isActiveErrors);
    console.error(error);
    console.error(providerErrors);
    return setLoginError('Something went wrong, try again');
   }

   if (singInProvider !== 'Local') {
    return setLoginError(
     `This account was created using a ${singInProvider} provider.`
    );
   }

   if (!checkAuthorsPassword) {
    return setLoginError('Invalid email or password');
   }

   if (!active) {
    rensendCode(form.email);
    setIsOpen(false);
    return setVerificationModal(true);
   }

   window.localStorage.setItem(
    'loggedAppUser',
    JSON.stringify(checkAuthorsPassword)
   );
   setUser(checkAuthorsPassword);
   setIsOpen(false);
  } catch (error) {
   return setLoginError('Invalid email or password');
  }
 }

 startFetchMyQuery();
};
