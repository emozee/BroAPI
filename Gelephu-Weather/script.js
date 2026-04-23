const select = document.getElementById('countrySelect');
const displayArea = document.getElementById('displayArea');

async function fetchCountryData(countryName) {
    // 1. Show Loading Message
    displayArea.innerHTML = "<p class='loading'>Loading information...</p>";

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        
        // Check if the response is okay
        if (!response.ok) throw new Error("Country not found");

        const data = await response.json();
        const country = data[0]; // The API returns an array, we want the first item

        // 2. Display the Data
        renderCard(country);

    } catch (error) {
        // 3. Show Error Message
        displayArea.innerHTML = `<p class='error'>Error: ${error.message}. Please try again.</p>`;
    }
}

function renderCard(country) {
    displayArea.innerHTML = `
        <div class="country-card">
            <img src="${country.flags.svg}" alt="Flag" width="200">
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
        </div>
    `;
}

// Event Listener for dropdown change
select.addEventListener('change', (e) => {
    fetchCountryData(e.target.value);
});

// Load Bhutan by default on startup
fetchCountryData('bhutan');