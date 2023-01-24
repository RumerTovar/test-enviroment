const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphLogIn = (data, setUser, setIsOpen, setLoginError) => {
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

 function fetchMyQuery() {
  const { email, sub: password } = data;

  return fetchGraphQL(operationsDoc, 'MyQuery', {
   email: email,
   password: password,
  });
 }

 async function startFetchMyQuery() {
  const { errors: error, data: userData } = await fetchMyQuery();

  const { checkAuthorsPassword } = userData;

  if (error) {
   return console.log(error);
  }

  if (!checkAuthorsPassword) {
   return setLoginError('Something went wrong try again');
  }

  window.localStorage.setItem(
   'loggedAppUser',
   JSON.stringify(checkAuthorsPassword)
  );
  setUser(checkAuthorsPassword);
  setIsOpen(false);
 }

 startFetchMyQuery();
};
