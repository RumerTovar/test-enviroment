const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphRegisterURL = (fullURL, shortURL) => {
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
  mutation MyMutation($fullURL: String!, $shortURL: String!) {
    addURL(input: {fullURL: $fullURL, shortURL: $shortURL}) {
      numUids
    }
  }
`;

 function executeMyMutation() {
  return fetchGraphQL(operationsDoc, 'MyMutation', {
   fullURL: fullURL,
   shortURL: shortURL,
  });
 }

 async function startExecuteMyMutation() {
  const { errors } = await executeMyMutation();

  if (errors) {
   console.error(errors);
  }
 }

 return startExecuteMyMutation();
};
