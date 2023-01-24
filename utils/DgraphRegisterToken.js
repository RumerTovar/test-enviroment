const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphRegisterToken = (email, token) => {
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
  mutation MyMutation($email: String!, $token: String!) {
    updateAuthors(input: {filter: {email: {eq: $email}}, set: {token: $token}}) {
      authors {
        email
      }
    }
  }
`;

 function executeMyMutation() {
  return fetchGraphQL(operationsDoc, 'MyMutation', {
   email,
   token,
  });
 }

 async function startExecuteMyMutation() {
  const { errors } = await executeMyMutation();

  if (errors) {
   console.error('error', errors);
  }
 }

 return startExecuteMyMutation();
};
