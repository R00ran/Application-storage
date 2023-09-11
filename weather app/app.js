//DOM elements/variables
const switchButton = document.querySelector('.switch')
//"current-weather" 
const cityName = document.querySelector('.area-name')
const currentTemperature = document.querySelector('.current-temperature-number')
const currentTemperatureHigh = document.querySelector('.current-temperature-high')
const currentTemperatureLow = document.querySelector('.current-temperature-low')
const searchBar = document.querySelector('.search-bar')
const shortDescription = document.querySelector('.short-description')
const mainIcon = document.querySelector('.main-icon')
//"detailed-info" 
const feelsLike = document.querySelector('.feels-like')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind-speed')
const windDirection = document.querySelector('.wind-direction')
const compass = document.querySelector('.compass')
const pressure = document.querySelector('.pressure')
const clouds = document.querySelector('.clouds')
const precipitation = document.querySelector('.precipitation')
const visibility = document.querySelector('.visibility')
const uvIndex = document.querySelector('.uv-index')
//"hourly-forecast"
const hourlyForecast = document.querySelector('.hourly-forecast')
//"daily-forecast"
const dailyForecast = document.querySelector('.daily-forecast')

//Juice data
//Weather API
const urlKey = "&appid=576facbc551eb2e73640c6720401a876";
const urlCodeOne = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
//Helpfull variables
const cities = ["San Francisco","Seattle","Tirana", "Bali", "New York", "Tokyo", "Jakarta", "Canberra", "Paris", "Rome", "Bratislava", "Prague", "Budapest", "Berlin", "Amsterdam", "Los Angeles", "Seoul", "Delhi", "Mumbai", "Manila", "Kabul"]
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weatherDescription = {
    0: ["Clear sky", "icons/clear-day.svg"],
    1: ["Mainly clear", "icons/clear-day.svg"],
    2: ["Partly cloudy", "icons/partly-cloudy-day.svg"],
    3: ["Overcast", "icons/overcast-day.svg"],
    45: ["Fog", "icons/fog.svg"],
    48: ["Despositing rime fog", "icons/fog.svg"],
    51: ["Drizzle - light", "icons/drizzle.svg"],
    53: ["Drizzle - moderate", "icons/drizzle.svg"],
    55: ["Drizzle - dense", "icons/drizzle.svg"],
    56: ["Freezing Drizzle - light", "icons/drizzle.svg"],
    57: ["Freezing Drizzle - dense", "icons/drizzle.svg"],
    61: ["Rain - slight", "icons/rain.svg"],
    63: ["Rain - moderate", "icons/rain.svg"],
    65: ["Rain - heavy", "icons/rain.svg"],
    66: ["Freezing Rain - light", "icons/rain.svg"],
    67: ["Freezing Rain - heavy", "icons/rain.svg"],
    71: ["Snow fall - slight", "icons/snow.svg"],
    73: ["Snow fall - moderate", "icons/snow.svg"],
    75: ["Snow fall - heavy", "icons/snow.svg"],
    77: ["Snow grains", "icons/snow.svg"],
    80: ["Rain shower - slight", "icons/rain.svg"],
    81: ["Rain shower - moderate", "icons/rain.svg"],
    82: ["Rain shower - violent", "icons/rain.svg"],
    85: ["Snow shower - slight", "icons/snow.svg"],
    86: ["Snow shower - heavy", "icons/snow.svg"],
    95: ["Thunderstorm", "icons/thunderstorms-day-rain.svg"],
    96: ["Thunderstorm with hail - slight", "icons/thunderstorms-day.svg"],
    99: ["Thunderstorm with hail - heavy", "icons/thunderstorms-day.svg"],
    wind: ["wind-beaufort-0.svg", "wind-beaufort-1.svg", "wind-beaufort-2.svg", "wind-beaufort-3.svg", "wind-beaufort-4.svg", "wind-beaufort-5.svg", "wind-beaufort-6.svg", "wind-beaufort-7.svg", "wind-beaufort-8.svg", "wind-beaufort-9.svg", "wind-beaufort-10.svg", "wind-beaufort-11.svg", "wind-beaufort-12.svg"]
}
const currentDate = new Date();
const hourlyWeatherData = []
const dailyWeatherData = []
//Loop variables
let intervalId;
let intervalRestart;

//Function collection
function changeBackground(tem, rain) {
    if (Math.floor(tem) >= 30) {
        document.body.style.background = "linear-gradient(to right, #d62828, #f77f00)"
    } else if (Math.floor(tem) <= 28 && Math.floor(tem) > 20) {
        document.body.style.background = "linear-gradient(to right,#f77f00, #fcbf49)"
    } else if (Math.floor(tem) <= 20 && Math.floor(tem) > 0) {
        document.body.style.background = "linear-gradient(to right, #74cad6, #288ecc)"
    } else {
        document.body.style.background = "linear-gradient(to right, #e8f7fb, #d1eaec)"
    }
    if (rain >= 61) {
        document.body.style.background = "linear-gradient(to right, #7f809e, #99b0b6)"
    }
}

function weatherIconChange(weathercode, targetIcon, yes) {
    targetIcon.src = weatherDescription[weathercode][1]
    if (yes) { shortDescription.innerHTML = weatherDescription[weathercode][0] }
}

function animationCollection() {
    return
}

//asynchronous API call
async function getWeatherData(city) {
    try {
        //data from open weather map api
        const collectOne = await fetch(urlCodeOne + `&q=${city}` + urlKey)
        const dataOne = await collectOne.json()
        // console.log(dataOne)

        //data from open meteo api
        const collectTwo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${dataOne.coord.lat}&longitude=${dataOne.coord.lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,cloudcover,cloudcover_low,cloudcover_high,visibility,windspeed_10m,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&forecast_days=14&timezone=GMT`)
        const dataTwo = await collectTwo.json()
        // console.log(dataTwo)

        //assigning data to the DOM
        //"current-weather"
        cityName.innerHTML = dataOne.name
        currentTemperature.innerHTML = Math.floor(dataOne.main.temp) + "&#8451"
        weatherIconChange(dataTwo.daily.weathercode[0], document.querySelector('.main-icon'), true)
        currentTemperatureHigh.innerHTML = "<span class='no-wrap'>" + "H: " + Math.floor(dataTwo.daily.temperature_2m_max[0]) + "&#8451" + "</span>"
        currentTemperatureLow.innerHTML = "<span class='no-wrap'>" + "L: " + Math.floor(dataTwo.daily.temperature_2m_min[0]) + "&#8451" + "</span>"
        //"detailed-info"
        feelsLike.innerHTML = Math.round(dataOne.main.feels_like) + "&#8451"
        humidity.innerHTML = dataOne.main.humidity + " %";
        pressure.innerHTML = dataOne.main.pressure + " hPa"
        windSpeed.innerHTML = Math.round(dataOne.wind.speed * 10) / 10 + " km/h"
        windDirection.innerHTML = dataOne.wind.deg + "&deg"
        compass.style.rotate = Math.round(dataOne.wind.deg) + "deg"
        clouds.innerHTML = Math.round(dataOne.clouds.all) + " %"
        precipitation.innerHTML = dataTwo.hourly.precipitation[currentDate.getHours()] + " mm"
        visibility.innerHTML = dataTwo.hourly.visibility[currentDate.getHours()] / 1000 + " km"
        uvIndex.innerHTML = dataTwo.hourly.uv_index[currentDate.getHours()]
        //"hourly-weather"
        for (let i = 0, k = 48; i < k; i++) {
            hourlyWeatherData[i] =
                `<div class='hourly'>
                <h1 class="time">${i % 24 > 9 ? i % 24 : "0" + i % 24}</h1>
                <img class="icon-hourly" src=${weatherDescription[dataTwo.hourly.weathercode[i]][1]} width="50px">
                <h1 class="hourly-data">${Math.floor(dataTwo.hourly.temperature_2m[i])}&#8451</h1>
                </div>`

        }
        hourlyForecast.innerHTML = hourlyWeatherData.slice(currentDate.getHours(), currentDate.getHours() + 24).join("")
        //"daily-forecast"
        for (let i = 0; i < 14; i++) {
            dailyWeatherData[i] =
                `<ul class="day">
            <li class="day-name">${days[(currentDate.getDay() + i) % 7]}</li> 
            <li class="day-icon"><img class="day-icon" src="${weatherDescription[dataTwo.daily.weathercode[i]][1]}" width="50px"></li>
            <li class="day-min"><h1 class="day-text">${Math.floor(dataTwo.daily.temperature_2m_min[i])}&#8451</h1><img class="day-icon" width="50px" src="icons/thermometer-colder.svg"></li> 
            </li>
            <li class="day-max">${Math.floor(dataTwo.daily.temperature_2m_max[i])}&#8451<img width="50px" src="icons/thermometer-warmer.svg"></li> 
            <li class="day-rise">${dataTwo.daily.sunrise[i].match(/..:../g)}<img width="50px" src="icons/sunrise.svg"></li> 
            <li class="day-set">${dataTwo.daily.sunset[i].match(/..:../g)}<img width="50px" src="icons/sunset.svg"></li> 
            <li class="day-wind">${Math.floor(dataTwo.daily.windspeed_10m_max[i])} km<img width="50px" src="icons/wind.svg"></li> 
            <li class="day-pre">${dataTwo.daily.precipitation_sum[i]} mm<img width="50px" src="icons/raindrop-measure.svg"></li> 
            </ul>`
        }
        dailyForecast.innerHTML = dailyWeatherData.join("")

        //function rotations tied to weather changes
        if (switchButton.checked == true) {
            changeBackground(dataOne.main.temp, dataTwo.daily.weathercode[0])
        } else {
            document.body.style.background = "linear-gradient(to right, #74cad6, #288ecc)"
        }

    }
    catch {
        cityName.innerHTML = "<span class='no-wrap'>" + "Invalid Name" + "</span>"
        currentTemperature.innerHTML = "- &#8451"
        currentTemperatureHigh.innerHTML = "<span class='no-wrap'>" + "H: " + "- &#8451" + "</span>"
        currentTemperatureLow.innerHTML = "<span class='no-wrap'>" + "L: " + "- &#8451" + "</span>"
        //"detailed-info"
        feelsLike.innerHTML = "-" + "&#8451"
        humidity.innerHTML = "-" + " %";
        pressure.innerHTML = "-" + " hPa"
        windSpeed.innerHTML = "-" + " km/h"
        compass.style.rotate = "-" + "deg"
        clouds.innerHTML = "-" + " %"
        precipitation.innerHTML = "-" + " mm"
        visibility.innerHTML = "-" + " km"
        uvIndex.innerHTML = "-"
        hourlyForecast.innerHTML = "-"
        dailyForecast.innerHTML = "-"
    }
}

//Loop for standby city cycling until a value is entered
function cycleUntilValue(inputCities) {
    if (searchBar.value == "") {
        getWeatherData(inputCities[Math.floor(Math.random() * inputCities.length)])
    } else {
        clearInterval(intervalId)
        clearInterval(intervalRestart)
    }
}

//Calling the loop to constantly update shown cities
getWeatherData("Prague")
setTimeout(() => intervalId = setInterval(() => {
    cycleUntilValue(cities)
}, 3000), 4000)

document.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        getWeatherData(searchBar.value)
    }
})







