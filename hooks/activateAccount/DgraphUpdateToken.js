const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphUpdateToken = (email, activationToken) => {
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
  mutation MyMutation ($email:String!, $activationToken: String!){
    updateAuthors(input: {filter: {email: {eq: $email}}, set: {activationToken: $activationToken}}) {
      authors {
        email
      }
    }
  }
`;

 function executeMyMutation() {
  return fetchGraphQL(operationsDoc, 'MyMutation', {
   email,
   activationToken,
  });
 }

 async function startExecuteMyMutation() {
  const { errors, data } = await executeMyMutation();

  if (errors) {
   console.error(errors);
  }

  console.log(data);
 }

 startExecuteMyMutation();
};
