'use strict';

const searchURL = "https://developer.nps.gov/api/v1/parks";
const apiKey = "vTdPqlmue8BdVYbrqtmKcOAkzbzOplfhqCgOH6Pz";

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const selectedStates = $('#js-selected-states').val();
        const maxResults = $('#js-max-results').val();
        getNationalParks(selectedStates, maxResults);
    });
}

function getNationalParks(selectedStates, maxResults) {
    const params = {
        api_key: apiKey,
        stateCode: selectedStates,
        limit: maxResults
    };

    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(respsonseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-err-msg').text(`The man behind the curtain spilled his coffee and something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(`<li>
        <h3>${responseJson.items[i].park.name}</h3>
        <p>${responseJson.items[i].park.description}</p>
        <a href="${responseJson.items[i].park.url}">${responseJson.items[i].park.url}</a>
        </li>`)
    };

    $('#results').removeClass('hidden');
    
}






$(watchForm);
