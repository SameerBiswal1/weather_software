const apikey = "22d1a543aa2f9e9f08cce4cd1c73ecb8"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city.trim()) return;

    try {
        const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apikey}`);
        const data = await response.json();
        

        if (data.cod !== 200) {
            document.querySelector(".city").innerHTML = data.message || "City not found";
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "clouds.png";

    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "clear.png";

    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "rain.png";

    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "drizzle.png";

    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "mist.png";

    }
    else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "snow.png";

    }

    } catch (error) {
        console.error(error);
        document.querySelector(".city").innerHTML = "Could not reach weather service";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkWeather(searchBox.value);
});
