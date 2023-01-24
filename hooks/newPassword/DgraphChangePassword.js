/*
This is an example snippet - you should consider tailoring it
to your service.
*/

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphChangePassword = (password, email, setIsSubmitted) => {
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
  mutation MyMutation ($email:String!, $pwd: String!){
    updateAuthors(input: {filter: {email: {eq: $email}}, set: {pwd: $pwd}}) {
      authors {
        email
      }
    }
  }
`;

 function executeMyMutation() {
  return fetchGraphQL(operationsDoc, 'MyMutation', {
   email,
   pwd: password,
  });
 }

 async function startExecuteMyMutation() {
  const { errors, data } = await executeMyMutation();

  if (errors) {
   return console.error(errors);
  }

  setIsSubmitted(true);
  console.log(data);
 }

 startExecuteMyMutation();
};
