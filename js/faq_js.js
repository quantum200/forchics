document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.faq-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.faq-item');
            item.classList.toggle('active');
        });
    });
});