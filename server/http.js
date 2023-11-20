const BASE_URL = "http://11.11.7.42:7080/v1/graphql";

export async function getProductWithCode(code) {
  const graphqlQuery = `
        query BarcodeScanner {
            devices(where: { id: { _eq: 2 } }) {
            id
            device_name
            device_description
            created_at
            manufacture
            updated_at
            }
        }
        `;
  const response =await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: graphqlQuery,
    }),
  });

  const json = await response.json();
  return json.data;
}
