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
function nextAcudit() {
    fetchJoke();
    console.log(reportAcudits);
}
//Get the joke score from the user
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-group .btn');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const target = event.target;
            const buttonValue = target.getAttribute('data-value');
            jokeScore = buttonValue;
            reportAcudits[indexArray].score = parseInt(jokeScore);
            //reset variable
            jokeScore = 0;
            console.log(reportAcudits);
        });
    });
});
