/*
This is an example snippet - you should consider tailoring it
to your service.
*/

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphCompareTokens = (email, token) => {
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
  query MyQuery ($email: String!){
    getAuthors(email: $email) {
      token
    }
  }
`;

 function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', {
   email,
  });
 }

 async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();
  const { getAuthors } = data;
  if (errors) {
   console.error(errors);
  }

  return getAuthors.token === token;
 }

 return startFetchMyQuery();
};
