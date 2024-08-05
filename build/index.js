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
//NIvell 1
//Exercici 1
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
            jokeElement.textContent = `"${joke}"`; //joke;
        }
        catch (error) {
            console.error('Failed to fetch joke:', error);
            jokeElement.textContent = 'Failed to load joke.';
        }
    });
}
// Fetch and display the joke when the page loads
document.addEventListener('DOMContentLoaded', fetchJoke);
function nextAcudit() {
    fetchJoke();
}
