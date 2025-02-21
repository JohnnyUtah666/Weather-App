// http://api.weatherapi.com/v1/current.json?key=f4922b465ce94a94808213904251902&q=London&aqi=no


let form = document.getElementById('form');

let conditionsContainer = document.getElementById('conditions');
let cityNameContainer = document.getElementById('cityName');
let temperatureContainer = document.getElementById('temperature');
let feelsLikeContainer = document.getElementById('feelsLike');
let windSpeedContainer = document.getElementById('windSpeed');
let humidityContainer = document.getElementById('humidity');

let conditionsValue;
let cityNameValue;
let temperatureValue;
let feelsLikeValue;
let windSpeedValue;
let humidityValue;
let icon = document.getElementById('icon');
let img = document.querySelector('img');
let errorMessage = document.getElementById('errorDiv');

let toggleState= "F";
let toggleButton = document.getElementById('toggle');
toggleButton.textContent = "Switch to C°";

function toggleTemp() {
    if (toggleState == "F") {
        toggleState = "C";
        temperatureValue = Math.round(((temperatureValue - 32) / (9/5)));
        temperatureContainer.textContent = temperatureValue + "° C";
        feelsLikeValue = Math.round(((feelsLikeValue - 32) / (9/5)));
        feelsLikeContainer.textContent = "Feels like: " + feelsLikeValue + "° C"
        toggleButton.textContent = "Switch to F°";

    } else if (toggleState == "C"){
        toggleState = "F";
        temperatureValue = Math.round((temperatureValue * 9/5 + 32));
        temperatureContainer.textContent = temperatureValue + "° F";
        feelsLikeValue = Math.round((feelsLikeValue * 9/5 + 32));
        feelsLikeContainer.textContent = "Feels like: " + feelsLikeValue + "° F";
        toggleButton.textContent = "Switch to C°";

    }
}

toggleButton.addEventListener("click", () => {
    toggleTemp();
})

function generateIconsAndBackground() {
    if (response.current.condition.code == 1000 & response.current.is_day == 1) {
        img.src = "../src/images/sunny_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png";
        document.querySelector("body").style.backgroundColor = "#00BFFF";
        document.getElementById("toggle").style.color = "#00BFFF";
    } else if (response.current.condition.code == 1000 & response.current.is_day == 0) {
        img.src = "../src/images/bedtime_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
        document.querySelector("body").style.backgroundColor = "black";
        document.getElementById("toggle").style.color = "black";
    } else if (response.current.condition.code == 1003 || 1006 || 1009 || 1030 || 1135 || 1147) {
        img.src = "../src/images/foggy_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png";
        document.querySelector("body").style.backgroundColor = "#71797E";
        document.getElementById("toggle").style.color = "#71797E";
    } else if (response.current.condition.code == 1063 || 1069 || 1072 || 1150 || 1153 || 1168 || 1171 || 1180 || 1183 || 1186 || 1189 || 1192 || 1195 || 1198 || 1201 || 1204 || 1207 || 1240 || 1243 || 1246 || 1249 || 1252 ) {
        img.src = "../src/images/rainy_light_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
        document.querySelector("body").style.backgroundColor = "blue";
        document.getElementById("toggle").style.color = "blue";
    } else if (response.current.condition.code == 1066 || 1114 || 1117 || 1210 || 1213 || 1216 || 1219 || 1222 || 1225 || 1237 || 1255 || 1258 || 1261 || 1264 ) {
        img.src ="../src/images/ac_unit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
        document.querySelector("body").style.backgroundColor = "#003399";
        document.getElementById("toggle").style.color = "#003399";
    } else if (response.current.conditons.code == 1087 || 1273 || 1276 || 1279 || 1282) {
        img.src = "../src/images/thunderstorm_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
        document.querySelector("body").style.backgroundColor = "#FEBE10";
        document.getElementById("toggle").style.color = "#FEBE10";
    }

}

function returnTemperature(cityName) {
    errorMessage.textContent = "";
    fetch(`http://api.weatherapi.com/v1/current.json?key=f4922b465ce94a94808213904251902&q=${cityName}&aqi=no
    `, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        img.src = "";

        conditionsValue = response.current.condition.text;
        conditionsContainer.textContent = "Conditions: " + conditionsValue;

        cityNameValue = response.location.name + ", " + response.location.region + ", " + response.location.country;
        cityNameContainer.textContent = cityNameValue

        if (toggleState == "F") {
            feelsLikeValue = response.current.feelslike_f;
            feelsLikeContainer.textContent = "Feels like: " + Math.round(feelsLikeValue) + `° F`;
        } else if (toggleState == "C") {
            feelsLikeValue = Math.round(((response.current.feelslike_f - 32) / (9/5)));
            feelsLikeContainer.textContent = feelsLikeValue + "° C";
        };

        
        if (toggleState == "F") {
            temperatureValue = Math.round(response.current.temp_f);
            temperatureContainer.textContent = temperatureValue + "° F";
        } else if (toggleState == "C") {
            temperatureValue = Math.round(((response.current.temp_f - 32) / (9/5)));
            temperatureContainer.textContent = temperatureValue + "° C";
        }

        
        windSpeedValue = response.current.wind_mph;
        windSpeedContainer.textContent = "Wind: " + windSpeedValue + " mph";

        humidityValue = response.current.humidity;
        humidityContainer.textContent = "Humidity: " + humidityValue + "%";
        

        generateIconsAndBackground();

    })
    .catch(function (err) {
        errorMessage.textContent = "Your search did not return a location",
        err
       
    });
    
}



form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    let location = document.getElementById('locationInput');
    returnTemperature(location.value);
    form.reset();
})

returnTemperature('Berlin');


