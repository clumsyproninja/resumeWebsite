// Variables for ease of access
const apiKey = '669d3aa9a61ea1e918c968fb39c553ed'
const lat = 40.71
const lon = -74.01

// Convert Kelvin to Fahrenheit
function kToF(kelvin){
    return (kelvin - 273.15) * 9/5 + 32
}

// Convert m/s to mph
function msToMph(ms){
    const mToMi = 0.000621371
    const secInHr = 3600

    return ms * mToMi * secInHr
}

const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

fetch(weatherAPI)
.then(response => response.json())
    .then(data => {
        const localDate = new Date((data.dt * 1000) + data.timezone)

        document.getElementById('location').textContent = data.name + ', ' + data.sys.country
        document.getElementById('currentDate').textContent = 'Date and Time: ' + localDate.toLocaleString()
        document.getElementById('temperature').textContent = 'Temperature: ' + kToF(data.main.temp).toFixed(0) + '°F'
        document.getElementById('feelsLike').textContent = 'Feels Like: ' + kToF(data.main.feels_like).toFixed(0) + '°F'
        document.getElementById('weatherDesc').textContent = 'Weather: ' + data.weather[0].description
        document.getElementById('windStatus').textContent = 'Wind Speed: ' + msToMph(data.wind.speed).toFixed(0) + ' mph'
        console.log(data)
    })
    .catch(error => {
        console.error('Error fetching weather data:', error)
    })