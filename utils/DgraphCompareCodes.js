import jwt from 'jsonwebtoken';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

export const DgraphCompareCodes = (email, code) => {
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
      activationToken
    }
  }
`;

 function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', {
   email,
  });
 }

 async function startFetchMyQuery() {
  const {
   errors,
   data: {
    getAuthors: { activationToken },
   },
  } = await fetchMyQuery();

  if (errors) {
   console.error(errors);
  }

  try {
   const verify = jwt.verify(activationToken, jwtSecret);
   const dbCode = verify.code;

   console.log();
   return dbCode.toString() === code.toString();
  } catch (error) {
   return 'invalid';
  }
 }

 return startFetchMyQuery();
};
