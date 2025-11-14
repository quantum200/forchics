document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('event-countdown');
    if (!countdownElement) return;

    const expiryKey = 'saleExpiryTime';
    let expiryTime = localStorage.getItem(expiryKey);

    if (!expiryTime) {
        expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem(expiryKey, expiryTime);
    } else {
        expiryTime = parseInt(expiryTime);
    }

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = expiryTime - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("cd-hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("cd-minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("cd-seconds").innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            countdownElement.innerHTML = "РОЗПРОДАЖ ЗАВЕРШЕНО";
            localStorage.removeItem(expiryKey);
        }
    }

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
});