const weather = document.querySelector(".js-weather");
const API_KEY = "6594956638f8e35c785465e0a763467f";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            console.log(weather);
            weather.innerText = `${temperature}°C @ ${place}`;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    // console.log(position.coords.latitude);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    console.log(coordsObj);
    saveCoords(coordsObj);
    getWeather(latitude, longitude);

}

function handleGeoErro(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErro);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS)
    if (loadedCoords === null || loadedCoords === undefined){
        askForCoords();
    } else {
        // console.log(loadedCoords);
        const parseCoords = JSON.parse(loadedCoords);
        // console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();


