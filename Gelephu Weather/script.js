async function showWeather() {
    const h1 = document.querySelector("#temp");
    h1.textContent = "Loading...";

    try {
        // Gelephu Coordinates: Lat 26.86, Long 90.48
        const url = "https://api.open-meteo.com/v1/forecast" +
                    "?latitude=26.86&longitude=90.48&current_weather=true";

        const res = await fetch(url);

        // Check if the internet connection is actually working
        if (!res.ok) throw new Error("Server error");

        const data = await res.json();
        
        // Digging into the data object to find the temperature
        const temp = data.current_weather.temperature;

        h1.textContent = `${temp}°C`;
    } catch (err) {
        console.error(err);
        h1.textContent = "Could not load weather";
    }
}

// Start the function immediately
showWeather();