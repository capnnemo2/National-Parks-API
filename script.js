'use strict';

const searchURL = "https://developer.nps.gov/api/v1/parks"

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const selectedStates = $('#js-selected-states').val();
        const maxResults = $('#js-max-results').val();
        getNationalParks(selectedStates, maxResults);
    });
}

function getNationalParks() {
    const params = {
        key: apiKey,
        q: MediaQueryList,
        part: 'snippet',
        maxResults
    };

    const queryString = 
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw neww Error(response.statusText);
    })
    .then(respsonseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-err-msg').text(`The man behind the curtain spilled his coffee and something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    
}






$(watchForm);
