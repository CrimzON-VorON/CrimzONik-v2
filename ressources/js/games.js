document.addEventListener('DOMContentLoaded', () => {
    const reviewPopup = document.querySelector('.review-popup');
    const screenshotsPopup = document.querySelector('.screenshots-popup');
    const fullscreenViewer = document.querySelector('.fullscreen-viewer');
    const fullscreenImage = fullscreenViewer.querySelector('.fullscreen-image');
    const reviewsContainer = document.getElementById('reviewsContainer');
    const screenshotsContainer = document.getElementById('screenshotsContainer');
    const prevButton = fullscreenViewer.querySelector('.nav-button.prev');
    const nextButton = fullscreenViewer.querySelector('.nav-button.next');

    let currentImages = [];
    let currentImageIndex = 0;

    // Create image caption element if it doesn't exist
    let imageCaption = fullscreenViewer.querySelector('.image-caption');
    if (!imageCaption) {
        imageCaption = document.createElement('div');
        imageCaption.className = 'image-caption';
        fullscreenViewer.appendChild(imageCaption);
    }

    function openPopup(popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePopup(popup) {
        popup.classList.remove('active');
        // Only restore scroll if no other popups are active
        if (!document.querySelector('.popup-overlay.active, .fullscreen-viewer.active')) {
            document.body.style.overflow = '';
        }
    }

    function updateFullscreenImage() {
        const currentImage = currentImages[currentImageIndex];
        fullscreenImage.src = currentImage.src;
        imageCaption.textContent = currentImage.alt || '';
    }

    function showPrevImage() {
        if (currentImages.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            updateFullscreenImage();
        }
    }

    function showNextImage() {
        if (currentImages.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            updateFullscreenImage();
        }
    }

    // Review button click handler
    document.querySelectorAll('.review-btn').forEach(button => {
        button.addEventListener('click', () => {
            const reviewId = button.getAttribute('data-review');
            const reviewContent = reviewsContainer.querySelector(`[data-review="${reviewId}"]`).cloneNode(true);
            const reviewContainer = reviewPopup.querySelector('.review-container');
            reviewContainer.innerHTML = '';
            reviewContainer.appendChild(reviewContent);
            openPopup(reviewPopup);
        });
    });

    // Screenshots button click handler
    document.querySelectorAll('.screenshots-btn').forEach(button => {
        button.addEventListener('click', () => {
            const screenshotsId = button.getAttribute('data-screenshots');
            const screenshots = screenshotsContainer.querySelector(`[data-screenshots="${screenshotsId}"]`).cloneNode(true);
            const screenshotsGrid = screenshotsPopup.querySelector('.screenshots-grid');
            screenshotsGrid.innerHTML = '';
            
            // Store all images for the current screenshot set
            currentImages = Array.from(screenshots.querySelectorAll('img'));
            
            currentImages.forEach((img, index) => {
                const thumbContainer = document.createElement('div');
                const thumb = img.cloneNode(true);
                thumb.classList.add('screenshot-thumb');
                thumb.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateFullscreenImage();
                    openPopup(fullscreenViewer);
                });
                thumbContainer.appendChild(thumb);
                screenshotsGrid.appendChild(thumbContainer);
            });
            openPopup(screenshotsPopup);
        });
    });

    // Navigation button handlers
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (fullscreenViewer.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // Close button handlers
    document.querySelector('.close-viewer').addEventListener('click', (e) => {
        e.stopPropagation();
        closePopup(fullscreenViewer);
    });

    document.querySelectorAll('.close-popup').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const popup = e.target.closest('.popup-overlay');
            if (popup) {
                closePopup(popup);
            }
        });
    });

    // Close on outside click
    [reviewPopup, screenshotsPopup, fullscreenViewer].forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                if (popup === fullscreenViewer) {
                    closePopup(fullscreenViewer);
                } else {
                    closePopup(popup);
                }
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (fullscreenViewer.classList.contains('active')) {
                closePopup(fullscreenViewer);
            } else if (screenshotsPopup.classList.contains('active')) {
                closePopup(screenshotsPopup);
            } else if (reviewPopup.classList.contains('active')) {
                closePopup(reviewPopup);
            }
        }
    });
});