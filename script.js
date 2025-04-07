// Pobieramy elementy DOM
const $startTimeInput = document.getElementById('start-time');
const $durationInput = document.getElementById('duration');
const $endTimeInput = document.getElementById('end-time');
const $remainingTimeDisplay = document.getElementById('remaining-time');

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startCountdown() {
    // Sprawdzamy, czy dane wejściowe są poprawne
    const startTimeInputValue = $startTimeInput.value;
    const durationMinutes = parseInt($durationInput.value, 10);

    if (!startTimeInputValue || isNaN(durationMinutes) || durationMinutes <= 0) {
        alert("Proszę wprowadzić poprawne dane.");
        return;
    }

    const startTime = new Date(startTimeInputValue).getTime();  // Godzina startu
    const durationMilliseconds = durationMinutes * 60 * 1000;  // Czas trwania w milisekundach
    const endTime = new Date(startTime + durationMilliseconds);  // Czas zakończenia
    const endTimeString = endTime.toLocaleTimeString();  // Format godziny zakończenia
    $endTimeInput.value = endTimeString;

    // Funkcja do aktualizowania pozostałego czasu
    function updateRemainingTime() {
        const currentTime = new Date().getTime();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            $remainingTimeDisplay.textContent = "Czas minął!";
            clearInterval(countdownInterval);
        } else {
            const remainingSeconds = Math.floor(remainingTime / 1000);
            $remainingTimeDisplay.textContent = "Pozostały czas: " + formatTime(remainingSeconds);
        }
    }

    const countdownInterval = setInterval(updateRemainingTime, 1000);
    updateRemainingTime();  // Uaktualnij od razu po uruchomieniu
}

// Event listener do uruchomienia countdown
document.getElementById('start-button').addEventListener('click', startCountdown);
