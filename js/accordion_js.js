document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.closest('.accordion-item');
            headers.forEach(otherHeader => {
                const otherItem = otherHeader.closest('.accordion-item');
                if (otherItem !== currentItem && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            currentItem.classList.toggle('active');
        });
    });
});