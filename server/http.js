const BASE_URL = "";

export async function fetchProduct(code) {
    const response = await fetch(BASE_URL);
    const json = await response.json();

    console.log(json);
    return json;
}