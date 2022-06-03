const API_KEY = "71hMdv-dsAdae-eSREHywWK2Fmg";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

function processOptions(form) {
    let optArray = [];

    for (let entry of form.entries()) {
        if (entry[0] === "options") {
            optArray.push(entry[1]);
        }
    }

    form.delete("options");

    form.append("options", optArray.join());

    return form;
}

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
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    // Needs to set heading text to API key status 
    // body text to your key is valid until and date and show the modal 
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}<div>`

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultsModal.show();
}

async function postForm(e) {
    const form = processOptions(new FormData(document.getElementById("checksform")));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
        });

    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }}

function displayErrors(data) {

    let heading = `JSHint Results for ${data.file}`;

    if (data.total_errors === 0) {
        results = `<div> class="no_errors">No errors reported!</div>`;

    } else {
        results = `<div${data.total_errors}</span>`
        for (let error of data.error_list) {
            results += `<div> At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;

        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}