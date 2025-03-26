document.addEventListener('DOMContentLoaded', () => {
    // Update rating colors on page load
    function updateRatingColors() {
        document.querySelectorAll('.rating').forEach(rating => {
            const value = parseFloat(rating.textContent);
            
            // Remove any existing classes
            rating.classList.remove('perfect');
            
            // Apply appropriate color based on rating
            if (value === 10) {
                rating.classList.add('perfect');
            } else if (value >= 8) {
                rating.style.backgroundColor = 'rgba(0, 128, 0, 0.8)'; // green
            } else if (value >= 6) {
                rating.style.backgroundColor = 'rgba(255, 165, 0, 0.8)'; // yellow
            } else if (value >= 4) {
                rating.style.backgroundColor = 'rgba(139, 0, 0, 0.8)'; // red
            } else {
                rating.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // black
            }
        });
    }

    // Call on page load
    updateRatingColors();

    // Global search functionality
    const globalSearch = document.getElementById('globalSearch');
    const globalSort = document.getElementById('globalSort');
    const globalTags = document.querySelectorAll('.global-search .filter-tag');

    // Helper function to extract episode count as a number
    function getEpisodeCount(episodeText) {
        const match = episodeText.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    }

    function applyGlobalFilters() {
        const searchTerm = globalSearch.value.toLowerCase();
        const sortValue = globalSort.value;
        const activeTags = Array.from(document.querySelectorAll('.global-search .filter-tag.active'))
            .map(tag => tag.getAttribute('data-tag'));

        // Get all anime cards across all sections
        const allCards = document.querySelectorAll('.anime-card');

        // Apply filters to all cards
        allCards.forEach(card => {
            const title = card.querySelector('.anime-title').textContent.toLowerCase();
            const cardTags = Array.from(card.querySelector('.anime-tags').querySelectorAll('.tag'))
                .map(tag => tag.textContent);

            const matchesSearch = title.includes(searchTerm);
            const matchesTags = activeTags.length === 0 || 
                activeTags.every(tag => cardTags.includes(tag));

            card.style.display = (matchesSearch && matchesTags) ? '' : 'none';
        });

        // Sort all visible cards within their sections
        document.querySelectorAll('.anime-grid').forEach(grid => {
            const cards = Array.from(grid.querySelectorAll('.anime-card:not([style*="display: none"])'));
            
            cards.sort((a, b) => {
                if (sortValue === 'name') {
                    const titleA = a.querySelector('.anime-title').textContent;
                    const titleB = b.querySelector('.anime-title').textContent;
                    return titleA.localeCompare(titleB);
                } else if (sortValue === 'episodes') {
                    const episodesA = getEpisodeCount(a.querySelector('.episodes').textContent);
                    const episodesB = getEpisodeCount(b.querySelector('.episodes').textContent);
                    return episodesB - episodesA;
                } else {
                    const ratingA = parseFloat(a.querySelector('.rating').textContent);
                    const ratingB = parseFloat(b.querySelector('.rating').textContent);
                    return ratingB - ratingA;
                }
            });

            cards.forEach(card => grid.appendChild(card));
        });
    }

    // Event listeners for global controls
    globalSearch.addEventListener('input', applyGlobalFilters);
    globalSort.addEventListener('change', applyGlobalFilters);
    globalTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
            applyGlobalFilters();
        });
    });

    // Load section states from localStorage
    function loadSectionStates() {
        const states = JSON.parse(localStorage.getItem('animeSectionStates') || '{}');
        document.querySelectorAll('.section-header').forEach(header => {
            const sectionId = header.getAttribute('data-toggle');
            if (states[sectionId] === 'collapsed') {
                const content = document.getElementById(sectionId);
                const icon = header.querySelector('.toggle-icon');
                
                header.classList.add('collapsed');
                content.classList.add('collapsed');
                icon.textContent = '▼';
            }
        });
    }

    // Save section states to localStorage
    function saveSectionStates() {
        const states = {};
        document.querySelectorAll('.section-header').forEach(header => {
            const sectionId = header.getAttribute('data-toggle');
            states[sectionId] = header.classList.contains('collapsed') ? 'collapsed' : 'open';
        });
        localStorage.setItem('animeSectionStates', JSON.stringify(states));
    }

    // Section toggle functionality with state persistence
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', () => {
            const sectionId = header.getAttribute('data-toggle');
            const content = document.getElementById(sectionId);
            const icon = header.querySelector('.toggle-icon');
            
            header.classList.toggle('collapsed');
            content.classList.toggle('collapsed');
            icon.textContent = header.classList.contains('collapsed') ? '▼' : '▲';
            
            saveSectionStates();
        });
    });

    // Load states on page load
    loadSectionStates();

    // Create fullscreen viewer container
    const fullscreenViewer = document.createElement('div');
    fullscreenViewer.className = 'fullscreen-viewer';
    fullscreenViewer.innerHTML = `
        <button class="close-fullscreen">×</button>
        <button class="prev-image">❮</button>
        <img class="fullscreen-image" src="" alt="">
        <div class="fullscreen-caption"></div>
        <button class="next-image">❯</button>
    `;
    document.body.appendChild(fullscreenViewer);

    // Popup functionality with image support
    const popup = document.querySelector('.anime-popup');
    const closePopup = document.querySelector('.close-popup');
    let currentImages = [];
    let currentImageIndex = 0;

    function showFullscreenImage(index) {
        const image = currentImages[index];
        const fullscreenImg = fullscreenViewer.querySelector('.fullscreen-image');
        const caption = fullscreenViewer.querySelector('.fullscreen-caption');
        const prevBtn = fullscreenViewer.querySelector('.prev-image');
        const nextBtn = fullscreenViewer.querySelector('.next-image');
        
        fullscreenImg.src = image.src;
        fullscreenImg.alt = image.caption || '';
        caption.textContent = image.caption || '';
        
        // Update navigation buttons visibility
        prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
        nextBtn.style.visibility = index < currentImages.length - 1 ? 'visible' : 'hidden';
        
        currentImageIndex = index;
    }

    function createImageGallery(images) {
        if (!images || images.length === 0) return '';
        
        return `
            <div class="review-images">
                ${images.map((img, index) => `
                    <div class="review-image-container">
                        <img src="${img.src}" 
                             alt="${img.caption || ''}" 
                             class="review-image"
                             data-index="${index}">
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Event listeners for fullscreen viewer
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

    document.querySelectorAll('.anime-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.anime-title').textContent;
            const episodes = card.querySelector('.episodes').textContent;
            const rating = card.querySelector('.rating').textContent;
            const tags = Array.from(card.querySelector('.anime-tags').querySelectorAll('.tag'))
                .map(tag => tag.textContent);
            const review = card.querySelector('.anime-review').textContent;
            currentImages = Array.from(card.querySelectorAll('.anime-review-images img'))
                .map(img => ({
                    src: img.getAttribute('src'),
                    caption: img.getAttribute('alt') || img.getAttribute('data-caption') || ''
                }));

            popup.querySelector('h2').textContent = title;
            popup.querySelector('.popup-episodes').textContent = episodes;
            popup.querySelector('.popup-rating').textContent = `Оцінка: ${rating}`;
            
            const tagsContainer = popup.querySelector('.popup-tags');
            tagsContainer.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            
            const reviewContainer = popup.querySelector('.popup-review');
            reviewContainer.innerHTML = `
                <div class="review-text">${review}</div>
                ${createImageGallery(currentImages)}
            `;

            // Add click handlers for images
            reviewContainer.querySelectorAll('.review-image').forEach(img => {
                img.addEventListener('click', () => {
                    const index = parseInt(img.getAttribute('data-index'));
                    showFullscreenImage(index);
                    fullscreenViewer.classList.add('active');
                });
            });

        // Trigger pet dialogue for рецепт (рецепт 19)
        if (card.getAttribute('data-anime-id') === "1") { // Фіксована перевірка
            const pet = document.querySelector('.pet-container');
            if (pet) {
                const petInstance = window.petInstance;
                if (petInstance && typeof petInstance.sayDialogue === 'function') {
                    petInstance.sayDialogue('shinob2', true);
                }
                    // Запускаємо анімацію
                    if (typeof petInstance.setAnimation === 'function') {
                        petInstance.setAnimation('shinob2', petInstance.durations.showOff);
                    }
            }
        }
            
            popup.classList.add('active');
        });
    });

    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });

    fullscreenViewer.addEventListener('click', (e) => {
        if (e.target === fullscreenViewer) {
            fullscreenViewer.classList.remove('active');
        }
    });

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
        } else if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
        }
    });
});