import { sendRecoveryEmail } from './sendRecoveryEmail';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphSearchEmail = async (form, setError, setSuccessMessage) => {
 const { email } = form;

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
     query MyQuery($email:String!) {
       queryAuthors(filter: {email: {eq: $email}}) {
         email
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
  return fetchGraphQL(checkProvider, 'checkProvider', { email });
 }

 function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', { email });
 }

 async function startFetchMyQuery() {
  //
  const { errors, data } = await fetchMyQuery();
  const { queryAuthors } = data;

  if (errors) {
   console.error(errors);
  }

  if (queryAuthors.length === 0) {
   return setError('Email not found');
  } else {
   const { errors: providerErrors, data: provider } = await fetchProvider();
   const { singInProvider } = provider.getAuthors;
   if (errors) {
    console.error(providerErrors);
    return setError('Something went wrong try again');
   }

   if (singInProvider !== 'Local') {
    return setError(
     `This account was created using a ${singInProvider} provider.`
    );
   }

   sendRecoveryEmail(email);
   setSuccessMessage(true);
   return setError(false);
  }
 }

 return await startFetchMyQuery();
};
