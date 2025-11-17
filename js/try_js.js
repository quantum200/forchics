document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.try-image');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.usp-item');
                items.forEach(item => {
                    item.classList.add('animate-visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    if (container) {
        observer.observe(container);
    }
});