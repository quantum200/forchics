document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.more-filters-btn');
    const collapsibleContent = document.getElementById('filters-content');

    if (toggleButton && collapsibleContent) {
        toggleButton.addEventListener('click', () => {
            const isActive = collapsibleContent.classList.toggle('is-active');
            toggleButton.querySelector('.text').textContent = isActive ? 'More Filters' : 'More Filters';
        });
    }
});