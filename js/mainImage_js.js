document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const mainImageWrapper = document.getElementById('mainImageWrapper');
    const thumbnails = document.querySelectorAll('.thumbnail-list .thumbnail');
    let currentImageIndex = 0;
    const imageSources = Array.from(thumbnails).map(thumb => thumb.getAttribute('data-src'));

    const updateGallery = (newIndex) => {
        if (newIndex >= 0 && newIndex < imageSources.length) {
            currentImageIndex = newIndex;
            const newSrc = imageSources[currentImageIndex];
            mainImage.src = newSrc;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnails[currentImageIndex].classList.add('active');
        }
    };

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            updateGallery(index);
        });
    });

    if (mainImageWrapper) {
        mainImageWrapper.addEventListener('mousemove', (e) => {
            const rect = mainImageWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const middle = rect.width / 2;

            if (x < middle) {
                // Ліва половина
                mainImageWrapper.classList.remove('cursor-right');
                mainImageWrapper.classList.add('cursor-left');
            } else {
                // Права половина
                mainImageWrapper.classList.remove('cursor-left');
                mainImageWrapper.classList.add('cursor-right');
            }
        });

        mainImageWrapper.addEventListener('click', (e) => {
            const rect = mainImageWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const middle = rect.width / 2;

            if (e.target.closest('.zoom-icon')) {
                return;
            }
            if (x < middle) {
                updateGallery(currentImageIndex - 1);
            } else {
                updateGallery(currentImageIndex + 1);
            }
        });

        mainImageWrapper.addEventListener('mouseleave', () => {
            mainImageWrapper.classList.remove('cursor-left', 'cursor-right');
        });
    }
});