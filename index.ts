
const reportAcudits: {joke: string; score: number; date: string}[] = [];
let indexArray = 0;
let jokeScore = 0;

// Fetch and display the joke when the page loads
async function fetchJoke(): Promise<void> {
  const jokeElement = document.getElementById('joke');
  if (!jokeElement) {
    console.error('No joke element found');
    return;
  }

  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jokeData = await response.json();
    const joke = jokeData.joke;
    const currentTime = new Date().toISOString();

    reportAcudits.push({
      joke: joke,
      score: jokeScore,
      currentTime: currentTime,
    });

    indexArray = reportAcudits.length - 1;
    jokeElement.textContent = `"${joke}"`;

  } catch (error) {
    console.error('Failed to fetch joke:', error);
    jokeElement.textContent = 'Failed to load joke.';
  }
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
      const target = event.target as HTMLButtonElement;
      const buttonValue = target.getAttribute('data-value');
      jokeScore = buttonValue;
      reportAcudits[indexArray].score = parseInt(jokeScore);
      //reset variable
      jokeScore = 0;
      console.log(reportAcudits);
    });
  });
});
