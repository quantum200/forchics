document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.icon-special img');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});