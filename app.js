// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 0000151b911feaf46bfe430dd106bf77


const weatherApi = {
    key: "0000151b911feaf46bfe430dd106bf77",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};

const searchInputBox = document.getElementById('input-box');

//Event Listener Function on keypress
searchInputBox.addEventListener('keypress',(event) => {
    if(event.key == "Enter"){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
    }
});

//Get Weather Report
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

//Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temprature = document.getElementById('temp');
    temprature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    // weatherType.innerText = `${weather.weather[0].main}`;

    let description = document.getElementById('weather');
    const word = `${weather.weather[0].description}`;
    description.innerText = titleCase(word);

    let windSpeed = document.getElementById('wind');
    windSpeed.innerText = `Wind Spped: ${weather.wind.speed} km/h`;

    let hum = document.getElementById('humidity-report');
    hum.innerText = `Humidity: ${weather.main.humidity}%`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('images/cloud.jpg')"
    }
    else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('images/cloud.jpg')"
    }
    else if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('images/clear.webp')"
    }
    else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('images/rain.jpg')"
    }
    else if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage = "url('images/snow.jpeg')"
    }
    else if(weatherType.textContent == 'Thunderstrom'){
        document.body.style.backgroundImage = "url('images/thunderstrom.jpg')"
    }
    else if(weatherType.textContent == 'Sunny'){
        document.body.style.backgroundImage = "url('images/sunny.jpeg')"
    }

}

//Date Manage
function dateManage(dateArg){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];


    return `${date} ${month} (${day}), ${year}`;

}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

getWeatherReport("Asansol");