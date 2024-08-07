"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const reportAcudits = [];
let indexArray = 0;
let jokeScore = 0;
// Fetch and display the joke when the page loads
function fetchJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const jokeElement = document.getElementById('joke');
        if (!jokeElement) {
            console.error('No joke element found');
            return;
        }
        try {
            const response = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    Accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jokeData = yield response.json();
            const joke = jokeData.joke;
            const currentTime = new Date().toISOString();
            reportAcudits.push({
                joke: joke,
                score: jokeScore,
                currentTime: currentTime,
            });
            indexArray = reportAcudits.length - 1;
            jokeElement.textContent = `"${joke}"`;
        }
        catch (error) {
            console.error('Failed to fetch joke:', error);
            jokeElement.textContent = 'Failed to load joke.';
        }
    });
}
// Fetch and display the joke when the page loads
document.addEventListener('DOMContentLoaded', fetchJoke);
console.log(reportAcudits);
// Function to get next joke (button)
function nextAcudit() {
    fetchJoke();
    console.log(reportAcudits);
}
//Get the joke score from the user
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-group .btn');
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            const target = event.target;
            const buttonValue = target.getAttribute('data-value');
            jokeScore = buttonValue;
            reportAcudits[indexArray].score = jokeScore;
            //reset variable
            jokeScore = 0;
            console.log(reportAcudits);
        });
    });
});
// Function to get weather data
const weatherElement = document.getElementById('weather');
function getWeather(latitude, longitude, language) {
    const apiKey = '9f080c853cf361a8faf3db39ba5f538c';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${language}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
        const temp = (data.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
        const weatherDescription = data.weather[0].description;
        const capitWeathDescr = // Capitalize the first letter of the weather description
         weatherDescription.charAt(0).toUpperCase() +
            weatherDescription.slice(1);
        if (weatherElement) {
            weatherElement.innerText = `${temp} °C - ${capitWeathDescr}`;
        }
    })
        .catch(error => console.error('Error fetching weather data:', error));
}
//Function to get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const language = navigator.language; // Get the browser's language
            getWeather(latitude, longitude, language);
        }, error => {
            console.error('Error getting geolocation:', error);
            if (weatherElement) {
                weatherElement.innerText = 'Unable to retrieve your location.';
            }
        });
    }
    else {
        if (weatherElement) {
            weatherElement.innerText =
                'Geolocation is not supported by this browser.';
        }
    }
}
// Get user's location on page load
window.onload = getLocation;
