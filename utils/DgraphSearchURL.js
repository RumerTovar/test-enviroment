const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphSearchURL = (shortURL) => {
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
  query MyQuery($shortURL: String!){
    getURL(shortURL: $shortURL) {
      fullURL
    }
  }
`;

 function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', {
   shortURL,
  });
 }

 async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();
  const { fullURL } = data.getURL;
  if (errors) {
   console.error(errors);
  }
  return fullURL;
 }

 return startFetchMyQuery();
};
