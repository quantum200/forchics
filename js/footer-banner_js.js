document.addEventListener('DOMContentLoaded', () => {
    const targetBlock = document.querySelector('.main-text');
    const stickyBar = document.querySelector('.sticky-footer-bar');

    if (!targetBlock || !stickyBar) return;

    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    targetBlock.parentNode.insertBefore(sentinel, targetBlock);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                stickyBar.classList.add('is-visible');
            }
            else if (entry.isIntersecting) {
                stickyBar.classList.remove('is-visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100% 0px',
        threshold: 0
    });

    observer.observe(sentinel);
});