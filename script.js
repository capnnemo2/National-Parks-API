'use strict';

const searchURL = "https://developer.nps.gov/api/v1/parks";
const apiKey = "vTdPqlmue8BdVYbrqtmKcOAkzbzOplfhqCgOH6Pz";

function watchForm() {
    $('form').submit(event => {
        console.log(`ran watchForm`);
        event.preventDefault();
        const stateSelected = getStates();
        const maxResults = $('#js-max-results').val();
        getNationalParks(stateSelected, maxResults);
    });
}

function getStates() {
    let statesList = [];
    let submitStates = "";
    $.each($("input[name='state']:checked"), function() {
        statesList.push($(this).val());
    });
    console.log('this is the list of states: ' + statesList.join(", "));
    submitStates = statesList.join(",");
    return submitStates;
}

function getNationalParks(stateSelected, maxResults) {
    console.log(`ran getNationalParks`);
    const params = {
        api_key: apiKey,
        stateCode: stateSelected,
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
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-err-msg').text(`The man behind the curtain spilled his coffee and something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
    console.log(`ran formatQueryParams`);
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    console.log(queryItems.join('&'));
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(`ran displayResults`);
    console.log(responseJson);
    $('#results-list').empty();

    responseJson.data.map(element => {
        $('#results-list').append(
            `<li><h3>${element.fullName}</h3>
            <a href="${element.url}" target="_blank" rel="noopener noreferrer">${element.url}</a>
            <p>${element.description}</p>
            </li>`
        )
    });
    $('#results').removeClass('hidden');
}







$(watchForm);
