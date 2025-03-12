document.addEventListener('DOMContentLoaded', () => {
    const itemCards = document.querySelectorAll('.item-card');
    const itemPopups = document.querySelectorAll('.item-popup');
    const fullscreenViewer = document.querySelector('.fullscreen-viewer');
    const featuredImages = document.querySelectorAll('.featured-image img');
    const artItems = document.querySelectorAll('.art-item img');
    let currentImages = [];
    let currentImageIndex = 0;

    // Setup featured images for fullscreen viewing
    featuredImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImages = Array.from(featuredImages).map(featuredImg => ({
                src: featuredImg.src,
                alt: featuredImg.alt,
                caption: featuredImg.getAttribute('data-caption')
            }));
            
            showFullscreenImage(index);
            fullscreenViewer.classList.add('active');
        });
    });

    // Setup art gallery images for fullscreen viewing
    artItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImages = Array.from(artItems).map(artImg => ({
                src: artImg.src,
                alt: artImg.alt,
                caption: artImg.getAttribute('data-caption'),
                description: artImg.getAttribute('data-description')
            }));
            
            showFullscreenImage(index);
            fullscreenViewer.classList.add('active');
        });
    });

    // Show popup for specific item
    itemCards.forEach(card => {
        const itemId = card.getAttribute('data-item-id');
        const viewMoreBtn = card.querySelector('.view-more-btn');
        
        viewMoreBtn.addEventListener('click', () => {
            const popup = document.getElementById(`itemPopup${itemId}`);
            popup.classList.add('active');
        });
    });

    // Close popup buttons
    document.querySelectorAll('.close-popup').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.item-popup').classList.remove('active');
        });
    });

    // Close popup when clicking outside
    itemPopups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    });

    // Fullscreen image viewer functionality
    function showFullscreenImage(index) {
        const image = currentImages[index];
        const fullscreenImg = fullscreenViewer.querySelector('.fullscreen-image');
        const caption = fullscreenViewer.querySelector('.fullscreen-caption');
        const prevBtn = fullscreenViewer.querySelector('.prev-image');
        const nextBtn = fullscreenViewer.querySelector('.next-image');
        
        fullscreenImg.src = image.src;
        fullscreenImg.alt = image.alt;
        
        // Update caption with title and description if available
        if (image.description) {
            caption.innerHTML = `
                <div class="caption-title">${image.caption}</div>
                <div class="caption-description">${image.description}</div>
            `;
        } else {
            caption.textContent = image.caption;
        }
        
        prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
        nextBtn.style.visibility = index < currentImages.length - 1 ? 'visible' : 'hidden';
        
        currentImageIndex = index;
    }

    // Setup gallery images for fullscreen viewing
    document.querySelectorAll('.popup-gallery').forEach(gallery => {
        const galleryItems = gallery.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.image-caption');
            
            img.addEventListener('click', () => {
                currentImages = Array.from(galleryItems).map(galleryItem => ({
                    src: galleryItem.querySelector('img').src,
                    alt: galleryItem.querySelector('img').alt,
                    caption: galleryItem.querySelector('.image-caption').textContent
                }));
                
                showFullscreenImage(index);
                fullscreenViewer.classList.add('active');
            });
        });
    });

    // Fullscreen viewer controls
    fullscreenViewer.querySelector('.close-fullscreen').addEventListener('click', () => {
        fullscreenViewer.classList.remove('active');
    });

    fullscreenViewer.querySelector('.prev-image').addEventListener('click', () => {
        if (currentImageIndex > 0) {
            showFullscreenImage(currentImageIndex - 1);
        }
    });

    fullscreenViewer.querySelector('.next-image').addEventListener('click', () => {
        if (currentImageIndex < currentImages.length - 1) {
            showFullscreenImage(currentImageIndex + 1);
        }
    });

    // Close fullscreen viewer when clicking outside
    fullscreenViewer.addEventListener('click', (e) => {
        if (e.target === fullscreenViewer) {
            fullscreenViewer.classList.remove('active');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (fullscreenViewer.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    fullscreenViewer.classList.remove('active');
                    break;
                case 'ArrowLeft':
                    if (currentImageIndex > 0) {
                        showFullscreenImage(currentImageIndex - 1);
                    }
                    break;
                case 'ArrowRight':
                    if (currentImageIndex < currentImages.length - 1) {
                        showFullscreenImage(currentImageIndex + 1);
                    }
                    break;
            }
        } else if (e.key === 'Escape') {
            document.querySelector('.item-popup.active')?.classList.remove('active');
        }
    });

    // Video Player Functionality
    document.querySelectorAll('.video-wrapper').forEach(wrapper => {
        const video = wrapper.querySelector('.fancy-video');
        const centerUnmute = wrapper.querySelector('.center-unmute');
        const controls = wrapper.querySelector('.video-controls');
        const playPauseBtn = controls.querySelector('.play-pause');
        const muteUnmuteBtn = controls.querySelector('.mute-unmute');
        const fullscreenBtn = controls.querySelector('.fullscreen');
        const progressTrack = controls.querySelector('.progress-track');
        const progressFill = controls.querySelector('.progress-fill');
        const currentTimeDisplay = controls.querySelector('.current-time');
        const durationDisplay = controls.querySelector('.duration');

        // Format time function
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        // Update progress bar
        function updateProgress() {
            const progress = (video.currentTime / video.duration) * 100;
            progressFill.style.width = `${progress}%`;
            currentTimeDisplay.textContent = formatTime(video.currentTime);
        }

        // Set video duration once metadata is loaded
        video.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(video.duration);
        });

        // Update progress as video plays
        video.addEventListener('timeupdate', updateProgress);

        // Click on progress bar to seek
        progressTrack.addEventListener('click', (e) => {
            const rect = progressTrack.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / progressTrack.offsetWidth;
            video.currentTime = pos * video.duration;
        });

        // Show center unmute button when video is muted
        centerUnmute.classList.add('visible');

        // Center unmute button
        centerUnmute.addEventListener('click', () => {
            video.muted = false;
            centerUnmute.classList.remove('visible');
            muteUnmuteBtn.classList.add('unmuted');
        });

        // Play/Pause button
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.classList.add('playing');
            } else {
                video.pause();
                playPauseBtn.classList.remove('playing');
            }
        });

        // Mute/Unmute button
        muteUnmuteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            muteUnmuteBtn.classList.toggle('unmuted');
            centerUnmute.classList.toggle('visible', video.muted);
        });

        // Fullscreen button
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (wrapper.requestFullscreen) {
                    wrapper.requestFullscreen();
                } else if (wrapper.webkitRequestFullscreen) {
                    wrapper.webkitRequestFullscreen();
                } else if (wrapper.msRequestFullscreen) {
                    wrapper.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });

        // Update play/pause button state when video state changes
        video.addEventListener('play', () => {
            playPauseBtn.classList.add('playing');
        });

        video.addEventListener('pause', () => {
            playPauseBtn.classList.remove('playing');
        });

        // Handle video end
        video.addEventListener('ended', () => {
            playPauseBtn.classList.remove('playing');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const fullscreenViewer = document.querySelector('.fullscreen-viewer');
    const fullscreenImage = document.querySelector('.fullscreen-image');
    const closeFullscreen = document.querySelector('.close-fullscreen');
    const prevButton = document.querySelector('.prev-image');
    const nextButton = document.querySelector('.next-image');
    
    let currentImages = [];
    let currentImageIndex = 0;

    // Show fullscreen image
    function showFullscreenImage(src, alt) {
        fullscreenImage.src = src;
        fullscreenImage.alt = alt;
        fullscreenViewer.classList.add('active');
        
        // Update navigation buttons visibility
        prevButton.style.visibility = currentImageIndex > 0 ? 'visible' : 'hidden';
        nextButton.style.visibility = currentImageIndex < currentImages.length - 1 ? 'visible' : 'hidden';
    }

    // Main PSP image functionality
    const mainPspImage = document.querySelector('.psp-main img');
    mainPspImage.addEventListener('click', () => {
        currentImages = [{ src: mainPspImage.src, alt: mainPspImage.alt }];
        currentImageIndex = 0;
        showFullscreenImage(mainPspImage.src, mainPspImage.alt);
    });

    // Picture items functionality
    const pictureItems = document.querySelectorAll('.picture-item img');
    pictureItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImages = Array.from(pictureItems).map(img => ({
                src: img.src,
                alt: img.alt
            }));
            currentImageIndex = index;
            showFullscreenImage(img.src, img.alt);
        });
    });

    // Game popups functionality
    const gamePopups = document.querySelectorAll('.game-popup');
    gamePopups.forEach((popup) => {
        const screenshots = popup.querySelectorAll('.game-screenshots img');
        screenshots.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentImages = Array.from(screenshots).map(screenshot => ({
                    src: screenshot.src,
                    alt: screenshot.alt
                }));
                currentImageIndex = index;
                showFullscreenImage(img.src, img.alt);
            });
        });
    });

    // Game boxes click handlers
    const gameBoxes = document.querySelectorAll('.game-box');
    gameBoxes.forEach((box, index) => {
        const viewMoreBtn = box.querySelector('.view-more-btn');
        viewMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const popup = document.getElementById(`game${index + 1}Popup`);
            popup.classList.add('active');
        });
    });

    // Close popup buttons
    const closePopupButtons = document.querySelectorAll('.close-popup');
    closePopupButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.game-popup').classList.remove('active');
        });
    });

    // Navigation for fullscreen gallery
    prevButton.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            const image = currentImages[currentImageIndex];
            showFullscreenImage(image.src, image.alt);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentImageIndex < currentImages.length - 1) {
            currentImageIndex++;
            const image = currentImages[currentImageIndex];
            showFullscreenImage(image.src, image.alt);
        }
    });

    // Close fullscreen viewer
    closeFullscreen.addEventListener('click', () => {
        fullscreenViewer.classList.remove('active');
    });

    // Close popups when clicking outside
    gamePopups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (fullscreenViewer.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    fullscreenViewer.classList.remove('active');
                    break;
                case 'ArrowLeft':
                    if (currentImageIndex > 0) {
                        currentImageIndex--;
                        const image = currentImages[currentImageIndex];
                        showFullscreenImage(image.src, image.alt);
                    }
                    break;
                case 'ArrowRight':
                    if (currentImageIndex < currentImages.length - 1) {
                        currentImageIndex++;
                        const image = currentImages[currentImageIndex];
                        showFullscreenImage(image.src, image.alt);
                    }
                    break;
            }
        } else if (e.key === 'Escape') {
            const activePopup = document.querySelector('.game-popup.active');
            if (activePopup) {
                activePopup.classList.remove('active');
            }
        }
    });

    // Close fullscreen viewer when clicking outside
    fullscreenViewer.addEventListener('click', (e) => {
        if (e.target === fullscreenViewer) {
            fullscreenViewer.classList.remove('active');
        }
    });
});
function lerp(start, end, t) {
    return start + (end - start) * t;
}

function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function animateColors(duration = 800) {
    let startTime = performance.now();
    let startColors = {
        main: hexToRgb(getComputedStyle(document.documentElement).getPropertyValue("--main-color").trim()),
        second: hexToRgb(getComputedStyle(document.documentElement).getPropertyValue("--second-color").trim()),
        text: hexToRgb(getComputedStyle(document.documentElement).getPropertyValue("--text-color").trim()),
        third: hexToRgb(getComputedStyle(document.documentElement).getPropertyValue("--third-color").trim()),
        hover: hexToRgb(getComputedStyle(document.documentElement).getPropertyValue("--hover-color").trim()),
    };

    let endColors = {
        main: hexToRgb("#2c1a1a"),
        second: hexToRgb("#b22222"),
        text: hexToRgb("#ffefd5"),
        third: hexToRgb("#4a2d2d"),
        hover: hexToRgb("#d2691e"),
    };

    function update() {
        let now = performance.now();
        let t = Math.min((now - startTime) / duration, 1); // Обмежуємо t до 1 (щоб не перевищувало 100%)

        document.documentElement.style.setProperty("--main-color", rgbToHex(
            Math.round(lerp(startColors.main[0], endColors.main[0], t)),
            Math.round(lerp(startColors.main[1], endColors.main[1], t)),
            Math.round(lerp(startColors.main[2], endColors.main[2], t))
        ));

        document.documentElement.style.setProperty("--second-color", rgbToHex(
            Math.round(lerp(startColors.second[0], endColors.second[0], t)),
            Math.round(lerp(startColors.second[1], endColors.second[1], t)),
            Math.round(lerp(startColors.second[2], endColors.second[2], t))
        ));

        document.documentElement.style.setProperty("--text-color", rgbToHex(
            Math.round(lerp(startColors.text[0], endColors.text[0], t)),
            Math.round(lerp(startColors.text[1], endColors.text[1], t)),
            Math.round(lerp(startColors.text[2], endColors.text[2], t))
        ));

        document.documentElement.style.setProperty("--third-color", rgbToHex(
            Math.round(lerp(startColors.third[0], endColors.third[0], t)),
            Math.round(lerp(startColors.third[1], endColors.third[1], t)),
            Math.round(lerp(startColors.third[2], endColors.third[2], t))
        ));

        document.documentElement.style.setProperty("--hover-color", rgbToHex(
            Math.round(lerp(startColors.hover[0], endColors.hover[0], t)),
            Math.round(lerp(startColors.hover[1], endColors.hover[1], t)),
            Math.round(lerp(startColors.hover[2], endColors.hover[2], t))
        ));

        if (t < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Викликати зміну кольорів через 2 секунди
setTimeout(() => {
    animateColors();
}, 2000);


    let images = [
        "../img/Штуки/PSP/IMG_0104.jpeg", 
        "../img/Штуки/PSP/IMG_0129.jpeg"
    ];
    let currentImageIndex = 0;
    let pictureElement = document.getElementById('picture');

    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        pictureElement.src = images[currentImageIndex];
    }, 4000);