document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('event-countdown');
    if (!countdownElement) return;
    const expiryKey = 'saleExpiryTime';
    const setNextExpiryTime = () => {
        const newExpiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem(expiryKey, newExpiryTime);
        return newExpiryTime;
    };

    let expiryTime = localStorage.getItem(expiryKey);
    if (!expiryTime || parseInt(expiryTime) < new Date().getTime()) {
        expiryTime = setNextExpiryTime();
    } else {
        expiryTime = parseInt(expiryTime);
    }

    const updateCountdown = () => {
        const now = new Date().getTime();
        let distance = expiryTime - now;

        if (distance < 0) {
            expiryTime = setNextExpiryTime();
            distance = expiryTime - now;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const hoursEl = document.getElementById("cd-hours");
        const minutesEl = document.getElementById("cd-minutes");
        const secondsEl = document.getElementById("cd-seconds");

        if (hoursEl && minutesEl && secondsEl) {
            hoursEl.innerText = String(hours).padStart(2, '0');
            minutesEl.innerText = String(minutes).padStart(2, '0');
            secondsEl.innerText = String(seconds).padStart(2, '0');
        }
    }

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});