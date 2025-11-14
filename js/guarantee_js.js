document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.toggle-details-btn');
    const collapsibleContent = document.getElementById('guarantee-details');

    if (button && collapsibleContent) {
        button.addEventListener('click', () => {
            const lines = collapsibleContent.querySelectorAll('.animated-line');
            const isOpen = collapsibleContent.classList.contains('active');
            const delay = 50;
            collapsibleContent.classList.toggle('active');

            if (!isOpen) {
                button.textContent = 'Читайте, як';
                lines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('is-visible');
                    }, delay * index);
                });
            } else {
                button.textContent = 'Читайте, як';
                for (let i = lines.length - 1; i >= 0; i--) {
                    const line = lines[i];
                    setTimeout(() => {
                        line.classList.remove('is-visible');
                    }, delay * (lines.length - 1 - i));
                }
                setTimeout(() => {
                    collapsibleContent.classList.remove('active');
                }, delay * lines.length);
            }
        });
    }
});