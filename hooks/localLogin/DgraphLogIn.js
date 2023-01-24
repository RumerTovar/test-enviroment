const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphLogIn = (form, setLoginError, setUser, setIsOpen) => {
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

 function fetchProvider() {
  return fetchGraphQL(checkProvider, 'checkProvider', { email: form.email });
 }

 function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', {
   email: form.email,
   password: form.password,
  });
 }

 async function startFetchMyQuery() {
  const { errors: providerErrors, data: provider } = await fetchProvider();
  const { errors: error, data } = await fetchMyQuery();
  const { singInProvider } = provider.getAuthors;
  const { checkAuthorsPassword } = data;

  if (error) {
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

  console.log('here', checkAuthorsPassword);
  window.localStorage.setItem(
   'loggedAppUser',
   JSON.stringify(checkAuthorsPassword)
  );
  setUser(checkAuthorsPassword);
  setIsOpen(false);
 }

 startFetchMyQuery();
};
