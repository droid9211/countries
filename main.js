// constants
const BASE_URL = 'https://restcountries.com/v3.1';

// elements
const countryTemplate = document.getElementById('country-template');
const countriesList = document.getElementById('countries-list');
const switchButtons = document.querySelector('.countries-list-switch');
const searchForm = document.getElementById('search-form');
const searchResultsList = document.getElementById('search-result-list');
const searchFormInput = searchForm.querySelector('input[name="country"]');

// request api
async function api(path) {
    NProgress.start();
    return fetch(`${BASE_URL}/${path}`)
            .then(response => response.json())
            .finally(() => {
                NProgress.done();
            })
}

// initial load
function loadRegion(region) {
    api(`region/${region}`)
        .then(data => {
            renderCountries(data);
        })
}
loadRegion('europe')

// get country clone
function getCountryHTML(country) {
    const {
        name: {
            common: countryName
        },
        capital,
        population,
        region,
        flags: {
            svg: flagUrl
        }
    } = country;

    const template = document.importNode(countryTemplate, true);
    template.removeAttribute('id');
    template.classList.remove('d-none');

    template.querySelector('.country-name').innerText = countryName;
    template.querySelector('.country-capital').innerText = capital;
    template.querySelector('.country-population').innerText = population.toLocaleString('bg-BG');
    template.querySelector('.country-region').innerText = region;
    template.querySelector('.country-flag').setAttribute('src', flagUrl);

    return template;
}

// render countries
function renderCountries(countries) {
    countriesList.innerHTML = '';
    countries.forEach(country => {
        const html = getCountryHTML(country);
        countriesList.appendChild(html);
    })
}

// list switcher
switchButtons.addEventListener('click', function(event) {
    const buttonEl = event.target;
    const region = buttonEl.dataset.region;
    loadRegion(region);

    switchButtons.querySelector('.active').classList.remove('active');
    buttonEl.classList.add('active');
});

// load search results

// search form
