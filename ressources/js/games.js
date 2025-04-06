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

            // Trigger pet dialogue for Code Vein screenshots (game 5)
            if (screenshotsId === "5") {
                const pet = document.querySelector('.pet-container');
                if (pet) {
                    const petInstance = window.petInstance;
                    if (petInstance && typeof petInstance.sayDialogue === 'function') {
                        petInstance.sayDialogue('game-code-vein', true);
                    }
                }
            }
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

    // Achievements popup functionality
    const logoContainer = document.querySelector('.logo-container');
    const achievementsPopup = document.createElement('div');
    achievementsPopup.className = 'achievements-popup';
    achievementsPopup.innerHTML = `
        <h3>Поточні ігри з досягненнями</h3>
        <div class="game-item-achiv" data-tooltip="Разраб додав всі внутріігрові ачівки і тепер їх треба всі робити... А було вже ачівок 64/68 всього. Думаю ачівок буде ще більше з новим 7 світом в ближчий час.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1476970/header.jpg?t=1741024848.webp" alt="Idleon">
            <div class="game-info-achiv">
                <h4 class="game-name">IdleOn - The Idle RPG</h4>
                <div class="achievement-count">192/276 Ачівок</div>
            </div>
        </div>
        <div class="game-item-achiv" data-tooltip="Треба зробити мільон кліків)">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3419430/a72a5965134f12a6cf86879fa2eb34ba16040486/capsule_184x69.jpg?t=1743708477" alt="Bongo Cat">
            <div class="game-info-achiv">
                <h4 class="game-name">Bongo Cat</h4>
                <div class="achievement-count">6/7 Ачівок</div>
            </div>
        </div>
        <div class="game-item-achiv" data-tooltip="Не тороплюсь виповняти, та і ліміти на день є для деяких дій.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2989820/capsule_184x69.jpg?t=1742668595" alt="Pocket Waifu">
            <div class="game-info-achiv">
                <h4 class="game-name">Pocket Waifu: Desktop Pet</h4>
                <div class="achievement-count">22/32 Ачівок</div>
            </div>
        </div>
        <div class="game-item-achiv" data-tooltip="Розраб знову добавив нові ачівки.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/304930/header.jpg?t=1734630748" alt="Unturned">
            <div class="game-info-achiv">
                <h4 class="game-name">Unturned</h4>
                <div class="achievement-count">82/83 Ачівок</div>
            </div>
        </div>
    `;

    logoContainer.appendChild(achievementsPopup);

    const tooltip = document.createElement('div');
tooltip.className = 'achievement-tooltip';
document.body.appendChild(tooltip);
const gameItems = achievementsPopup.querySelectorAll('.game-item-achiv');

gameItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        tooltip.textContent = item.getAttribute('data-tooltip');
        tooltip.style.display = 'block';
    });

    item.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
    });

    item.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});


    logoContainer.addEventListener('click', () => {
        achievementsPopup.classList.toggle('active');
    });

    achievementsPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close achievements popup when clicking outside
    document.addEventListener('click', (e) => {
        if (!logoContainer.contains(e.target) && achievementsPopup.classList.contains('active')) {
            achievementsPopup.classList.remove('active');
        }
    });

    // Close achievements popup on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && achievementsPopup.classList.contains('active')) {
            achievementsPopup.classList.remove('active');
        }
    });
});
