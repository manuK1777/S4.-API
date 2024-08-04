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
    jokeElement.textContent = joke;
  } catch (error) {
    console.error('Failed to fetch joke:', error);
    jokeElement.textContent = 'Failed to load joke.';
  }
}

// Fetch and display the joke when the page loads
document.addEventListener('DOMContentLoaded', fetchJoke);

function nextAcudit() {
  fetchJoke();
}
