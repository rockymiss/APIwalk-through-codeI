const API_KEY = "71hMdv-dsAdae-eSREHywWK2Fmg";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

// When handling promises we can chain thens or wrap in an async function and wait for the promise to come through
async function getStatus(e) {
    //API URL - this follows the format in the instructions
    //build query string, which will consist of the URL and the parameters needed to send over to the API
    const queryString = `${API_URL}?api_key=${API_KEY}`;
// await response
    const response = await fetch(queryString);
//When response comes back it needs to be converted to json
//needs to await a promise too
    const data = await response.json();

    if (response.ok) {
        console.log(data.expiry);
    }
}
