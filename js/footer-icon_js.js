document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        const img = link.querySelector('img');
        if (!img) return;
        const originalSrc = img.src;
        const fullSrc = originalSrc.replace(/(\.png|\.jpg|\.webp)$/i, '_full$1');

        link.addEventListener('mouseover', () => {
            img.src = fullSrc;
        });

        link.addEventListener('mouseout', () => {
            img.src = originalSrc;
        });
    });
});