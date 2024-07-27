
// WEATHER: CLIENT ---------------------------------------------------------- //

import { accuWeather } from '../../../api/config.js';

// -------------------------------------------------------------------------- //

export const init = () =>{
    console.log('   • Inicializando WEATHER (CLIENT)...');
    getGeoLocation();
}

// -------------------------------------------------------------------------- //

// Get location INFO:
export async function getLocation(latitude, longitude) {
    console.log('Getting location info for: ' + latitude + ',' + longitude);

    var requestUrl = accuWeather.url.api +
        'locations/v1/cities/geoposition/search?apikey=' + accuWeather.url.apiKey + '&q=' + latitude + ',' + longitude;
    console.log(requestUrl);

    return await fetch(requestUrl)
        .then((result) => { return result.json(); } )
        .catch((error) => { console.error('ERROR: ', error); } )
};

// -------------------------------------------------------------------------- //

// Get five days Forecast:
export async function getWeather(locationId) {
    console.log('Getting weather info for: ' + locationId);

    var requestUrl = accuWeather.url.api + 'forecasts/v1/daily/5day/' + locationId + '?apikey=' + accuWeather.url.apiKey;
    console.log(requestUrl);

    return await fetch(requestUrl)
        .then((result) => { return result.json(); } )
        .catch((error) => { console.error('ERROR: ', error); } )
};

// -------------------------------------------------------------------------- //

// Get day of the week:
export function getDayOfWeek(date) {
    var days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    // return days(date.getDay());
    return days[date.getDay()];
};

// -------------------------------------------------------------------------- //

// Format data:
export function formatDate(date) {
    var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    return months[date.getMonth()] + '  ' + date.getDate() + ', ' + date.getFullYear();
};

// -------------------------------------------------------------------------- //

// Get FontAwesome icon:
export function getIcon(index) {
    var icon = '';
        if (index <=3) icon = 'fa-solid fa-sun'; // Sun
        if (index >= 4 && index <= 6) icon = 'fa-solid fa-cloud-sun'; // Cloud Sun
        if (index >= 7 && index <= 11) icon = 'fa-solid fa-cloud'; // Cloud
        if (index >= 12 && index <= 29) icon = 'fa-solid fa-cloud-rain'; // Cloud Rain
    return icon;
};

// -------------------------------------------------------------------------- //

// GEO LOCATION: ------------------------------------------------------------ //

function getGeoLocation() {
    console.log('GL: Getting coordinates...');
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let coords = position.coords;
                console.log(coords);

                getLocationInfo(coords.latitude, coords.longitude);
            });
        } else { console.error('ERROR: Geolocation is not supported by this browser.'); };
};

// LOCATION INFO: ----------------------------------------------------------- //

function getLocationInfo(latitude, longitude) {
    console.log('GL: Getting location...');
        getLocation(latitude, longitude).then ((location) => {
            console.log(location);

            showLocationName(location);
            getLocationForecast(location.Key);
        }).catch((error) => {
            console.error('ERROR: There was a problem getting the location info.', error);
        });
};

// LOCATION NAME: ----------------------------------------------------------- //

function showLocationName(location) {
    console.log('GL: Showing location...');
        document.getElementById('label-location').textContent = location.LocalizedName
            + ' ' + location.AdministrativeArea.LocalizedName + ', ' + location.Country.LocalizedName;
};

// LOCATION FORECAST: ------------------------------------------------------- //

function getLocationForecast(locationKey) {
    console.log('LF: Getting location forecast...');
        getWeather(locationKey).then(( response ) => {
            console.log(response);

            showForecast(response.DailyForecasts);
        });
};

// DAILY FORECAST ------------------------------------------------------------ //

function showForecast(daily) {
    console.log('FD: Showing forecast data... ');
        // Template
        let template = document.getElementById('template-day').content;
        let fragment = document.createDocumentFragment();

        // Read Forecast
        daily.forEach ((info) => {
            console.log(info);

            // Show DATA:
            let date = new Date(info.Date);
            console.log(date);

            // Clone template:
            let clone = document.importNode(template, true);

                clone.querySelector('#day-name').textContent = getDayOfWeek(date);
                clone.querySelector('#day-icon').className = getIcon(info.Day.Icon);

                    // Temperature:
                    let maxTempFahrenheit = info.Temperature.Maximum.Value;
                    let minTempFahrenheit = info.Temperature.Minimum.Value;
                    let maxTempCelsius = ((maxTempFahrenheit -32) * (5/9)).toFixed(0);
                    let minTempCelsius = ((minTempFahrenheit -32) * (5/9)).toFixed(0);

                    let tempHandler = document.getElementById('tempHandler');
                    let tempUnit = tempHandler.getAttribute('temp-unit');
                    let tempLabel = document.getElementById('label-temp-unit');

                    if(tempUnit === 'F') {
                        tempLabel.textContent = 'Fahrenheit';
                    } else {
                        tempLabel.textContent = 'Celsius';
                    }

                    let tempElement = clone.querySelector('#day-temperature');
                    tempElement.classList.add('day-temperature');
                    tempElement.setAttribute('maxFH', maxTempFahrenheit);
                    tempElement.setAttribute('minFH', minTempFahrenheit);

                    if(tempUnit === 'F') {
                        clone.querySelector('#day-temperature').textContent =
                            maxTempFahrenheit + '°F' + ' / ' + minTempFahrenheit + '°F';
                    };

                    if(tempUnit === 'C') {
                        clone.querySelector('#day-temperature').textContent =
                            maxTempCelsius + '°C' + ' / ' + minTempCelsius + '°C';
                    };

                clone.querySelector('#day-condition').textContent = info.Day.IconPhrase;
                // clone.querySelector('#day-date').textContent = formatDate(date);
                clone.querySelector('.tooltip').textContent = formatDate(date);

            // Add clone to fragment:
            fragment.appendChild(clone);
        });

        // Add fragment to daily:
        document.getElementById('daily').appendChild(fragment);
};

// -------------------------------------------------------------------------- //

// Change temperature UNIT:
let tempUnit = document.getElementById('tempHandler');

tempUnit.addEventListener('click', function() {
    let currentUnit = tempUnit.getAttribute('temp-unit');

    if(currentUnit === 'F') {
        tempUnit.setAttribute('temp-unit', 'C');
        document.getElementById('label-temp-unit').textContent = 'Celsius';
    } else {
        tempUnit.setAttribute('temp-unit', 'F');
        document.getElementById('label-temp-unit').textContent = 'Fahrenheit';
    };

    let weatherData = document.querySelectorAll('.day-temperature');
    weatherData.forEach(function(tempElement) {
        let maxTempFahrenheit = tempElement.getAttribute('maxFH');
        let minTempFahrenheit = tempElement.getAttribute('minFH');
        let maxTempCelsius = ((maxTempFahrenheit -32) * (5/9)).toFixed(0);
        let minTempCelsius = ((minTempFahrenheit -32) * (5/9)).toFixed(0);

        if(currentUnit === 'F') {
            tempElement.textContent = `${maxTempCelsius}°C / ${minTempCelsius}°C`;
        } else {
            tempElement.textContent = `${maxTempFahrenheit}°F / ${minTempFahrenheit}°F`;
        }
    });

    console.log('TEMP UNIT: ', tempUnit.getAttribute('temp-unit'));
});

// -------------------------------------------------------------------------- //
