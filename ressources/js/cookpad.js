document.addEventListener('DOMContentLoaded', () => {
    const bookOverlay = document.querySelector('.book-overlay');
    const book = document.querySelector('.book');
    const bookContent = document.querySelector('.book-content');

    const enableBtn = document.getElementById('enable-book');
    const disableBtn = document.getElementById('disable-book');

    // Статус з localStorage
    let hideBook = localStorage.getItem('hideBook') === 'true';

    // Оновлення кнопок
    function updateButtons() {
        enableBtn.disabled = !hideBook;
        disableBtn.disabled = hideBook;
    }

    // Відображення або приховування книги
    function applyBookVisibility() {
        if (hideBook) {
            bookOverlay.classList.add('hidden');
            bookContent?.classList.add('visible');
        } else {
            bookOverlay.classList.remove('hidden');
            bookContent?.classList.remove('visible');
        }
    }

    // jopatest
   // console.log(localStorage.getItem('hideBook'));
   // if (localStorage.getItem('hideBook') == 'false') {
     //   hideBook = false;
     //   console.log('EtoIF');

     //   const Jopa = document.querySelector('.book-overlay');
     //   Jopa.style.display = 'flex';
     //   Jopa.style.pointerEvents = 'auto';
      //  book.style.display = 'flex';
      //  book.style.pointerEvents = 'auto';
    //}
   // else  {

       // console.log('EtoELSE');
        // book.style.pointerEvents = 'auto';
       // bookOverlay.classList.add('hidden');
       // bookContent?.classList.add('visible');

   // };

    // Ініціалізація
    applyBookVisibility();
    updateButtons();

    // Клік по книзі — тільки анімація відкриття
    let isBookOpened = false;
    book?.addEventListener('click', () => {
        if (!hideBook && !isBookOpened) {
            isBookOpened = true;
            book.classList.add('opened');
            setTimeout(() => {
                bookOverlay.classList.add('hidden');
                bookContent?.classList.add('visible');
            }, 1000);
        }
    });

    // Вмикання книги
    enableBtn.addEventListener('click', () => {
        localStorage.setItem('hideBook', 'false');
        hideBook = false;
        applyBookVisibility();
        updateButtons();
        alert('Книга буде знову показана при перезавантаженні.');
        console.log('Vmikanie');
    });

    // Вимикання книги
    disableBtn.addEventListener('click', () => {
        localStorage.setItem('hideBook', 'true');
        hideBook = true;
        applyBookVisibility();
        updateButtons();
        alert('Книга більше не буде показана.');
        console.log('Vimikanie');
    });


    // Existing gallery and popup functionality
    const recipeCards = document.querySelectorAll('.recipe-card');
    const popups = document.querySelectorAll('.recipe-popup');
    const fullscreenGallery = document.querySelector('.fullscreen-gallery');
    const fullscreenImage = fullscreenGallery.querySelector('.fullscreen-image img');
    const closeFullscreenBtn = document.querySelector('.close-fullscreen');
    
    let currentPopup = null;
    let currentGalleryContainer = null;
    let autoScrollInterval = null;

    // Initialize galleries for each popup
    popups.forEach(popup => {
        const galleryContainer = popup.querySelector('.gallery-container');
        const thumbnailsContainer = popup.querySelector('.thumbnails-container');
        const thumbnails = popup.querySelectorAll('.thumbnail');
        const prevBtn = popup.querySelector('.gallery-btn.prev');
        const nextBtn = popup.querySelector('.gallery-btn.next');
        const closeBtn = popup.querySelector('.close-popup');

        let currentIndex = 0;
        let visibleThumbnails = 3;
        let totalThumbnails = thumbnails.length;
        let direction = 1;

        function updateThumbnails() {
            const offset = -(currentIndex * (100 / visibleThumbnails));
            thumbnailsContainer.querySelector('.thumbnails').style.transform = `translateX(${offset}%)`;
        }

        function autoScroll() {
            if (direction === 1 && currentIndex >= totalThumbnails - visibleThumbnails) {
                direction = -1;
            } else if (direction === -1 && currentIndex <= 0) {
                direction = 1;
            }
            
            currentIndex += direction;
            updateThumbnails();
        }

        function startAutoScroll() {
            stopAutoScroll();
            autoScrollInterval = setInterval(autoScroll, 3000);
        }

        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        // Thumbnail navigation
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateThumbnails();
            }
            stopAutoScroll();
            startAutoScroll();
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalThumbnails - visibleThumbnails) {
                currentIndex++;
                updateThumbnails();
            }
            stopAutoScroll();
            startAutoScroll();
        });

        // Fullscreen functionality
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                const img = thumbnail.querySelector('img');
                fullscreenImage.src = img.src;
                fullscreenGallery.classList.add('active');
                document.body.style.overflow = 'hidden';
                currentGalleryContainer = { thumbnails, currentIndex: index };
            });
        });

        // Close popup
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
            document.body.style.overflow = '';
            stopAutoScroll();
            currentPopup = null;
        });

        // Auto-scroll controls
        galleryContainer.addEventListener('mouseenter', stopAutoScroll);
        galleryContainer.addEventListener('mouseleave', startAutoScroll);
    });

// Recipe card click handlers
    recipeCards.forEach(card => {
        card.addEventListener('click', () => {
            const recipeId = card.getAttribute('data-recipe');
            const popup = document.getElementById(`popup-${recipeId}`);
            
            if (currentPopup) {
                currentPopup.classList.remove('active');
            }
            
            popup.classList.add('active');
            currentPopup = popup;
            document.body.style.overflow = 'hidden';

            // Trigger pet dialogue for рецепт (рецепт 1)
            if (parseInt(recipeId) === 1) { // Фіксована перевірка
                const pet = document.querySelector('.pet-container');
                if (pet) {
                    const petInstance = window.petInstance;
                    if (petInstance && typeof petInstance.sayDialogue === 'function') {
                        petInstance.sayDialogue('cookpad-1', true);
                    }
                }
            }
            // Trigger pet dialogue for рецепт (рецепт 2)
            if (parseInt(recipeId) === 2) { // Фіксована перевірка
                const pet = document.querySelector('.pet-container');
                if (pet) {
                    const petInstance = window.petInstance;
                    if (petInstance && typeof petInstance.sayDialogue === 'function') {
                        petInstance.sayDialogue('cookpad-2', true);
                    }
                }
            }
            // Trigger pet dialogue for рецепт (рецепт 5)
            if (parseInt(recipeId) === 5) { // Фіксована перевірка
                const pet = document.querySelector('.pet-container');
                if (pet) {
                    const petInstance = window.petInstance;
                    if (petInstance && typeof petInstance.sayDialogue === 'function') {
                        petInstance.sayDialogue('cookpad-5', true);
                    }
                }
            }
            // Trigger pet dialogue for рецепт (рецепт 11)
            if (parseInt(recipeId) === 11) { // Фіксована перевірка
                const pet = document.querySelector('.pet-container');
                if (pet) {
                    const petInstance = window.petInstance;
                    if (petInstance && typeof petInstance.sayDialogue === 'function') {
                        petInstance.sayDialogue('cookpad-11', true);
                    }
                }
            }
            // Trigger pet dialogue for рецепт (рецепт 18)
            if (parseInt(recipeId) === 18) { // Фіксована перевірка
                const pet = document.querySelector('.pet-container');
                if (pet) {
                    const petInstance = window.petInstance;
                    if (petInstance && typeof petInstance.sayDialogue === 'function') {
                        petInstance.sayDialogue('cookpad-18', true);
                    }
                }
            }
            // Trigger pet dialogue for рецепт (рецепт 19)
            if (parseInt(recipeId) === 19) { // Фіксована перевірка
                const pet = document.querySelector('.pet-container');
                if (pet) {
                    const petInstance = window.petInstance;
                    if (petInstance && typeof petInstance.sayDialogue === 'function') {
                        petInstance.sayDialogue('cookpad-19', true);
                    }
                }
            }

            // Reset and start gallery
            const thumbnailsContainer = popup.querySelector('.thumbnails-container');
            const thumbnails = popup.querySelectorAll('.thumbnail');
            thumbnailsContainer.querySelector('.thumbnails').style.transform = 'translateX(0)';
            
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
            }
            autoScrollInterval = setInterval(() => {
                const currentIndex = parseInt(thumbnailsContainer.querySelector('.thumbnails').style.transform.match(/-?\d+/) || 0);
                const maxOffset = -(thumbnails.length - 3) * (100 / 3);
                
                if (currentIndex <= maxOffset) {
                    thumbnailsContainer.querySelector('.thumbnails').style.transform = 'translateX(0)';
                } else {
                    thumbnailsContainer.querySelector('.thumbnails').style.transform = `translateX(${currentIndex - (100 / 3)}%)`;
                }
            }, 1600);
        });
});


    // Fullscreen gallery navigation
    fullscreenGallery.querySelector('.prev').addEventListener('click', () => {
        if (currentGalleryContainer) {
            const { thumbnails, currentIndex } = currentGalleryContainer;
            const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            const img = thumbnails[newIndex].querySelector('img');
            fullscreenImage.src = img.src;
            currentGalleryContainer.currentIndex = newIndex;
        }
    });

    fullscreenGallery.querySelector('.next').addEventListener('click', () => {
        if (currentGalleryContainer) {
            const { thumbnails, currentIndex } = currentGalleryContainer;
            const newIndex = (currentIndex + 1) % thumbnails.length;
            const img = thumbnails[newIndex].querySelector('img');
            fullscreenImage.src = img.src;
            currentGalleryContainer.currentIndex = newIndex;
        }
    });

    closeFullscreenBtn.addEventListener('click', () => {
        fullscreenGallery.classList.remove('active');
        document.body.style.overflow = '';
        currentGalleryContainer = null;
    });

    // Global click and keyboard handlers
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('recipe-popup')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
            currentPopup = null;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (fullscreenGallery.classList.contains('active')) {
                fullscreenGallery.classList.remove('active');
                document.body.style.overflow = '';
                currentGalleryContainer = null;
            } else if (currentPopup) {
                currentPopup.classList.remove('active');
                document.body.style.overflow = '';
                if (autoScrollInterval) {
                    clearInterval(autoScrollInterval);
                    autoScrollInterval = null;
                }
                currentPopup = null;
            }
        } else if (currentGalleryContainer) {
            if (e.key === 'ArrowLeft') {
                fullscreenGallery.querySelector('.prev').click();
            } else if (e.key === 'ArrowRight') {
                fullscreenGallery.querySelector('.next').click();
            }
        }
    });
});