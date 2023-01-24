const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphDestroyToken = (email) => {
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
  mutation MyMutation($email: String!) {
    updateAuthors(input: {filter: {email: {eq: $email}}, set: {token: ""}}) {
      authors {
        email
      }
    }
  }
`;

 function executeMyMutation() {
  return fetchGraphQL(operationsDoc, 'MyMutation', {
   email,
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
