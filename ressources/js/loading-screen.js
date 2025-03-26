document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const contentWrapper = document.querySelector('.content-wrapper');
    const loadingVideo = document.querySelector('.loading-video');
    const petContainer = document.querySelector('.pet-container');

    // Initially hide pet container
    if (petContainer) {
        petContainer.style.display = 'none';
    }

    // Check if we should show the loading screen
    function shouldShowLoadingScreen() {
        const lastVisit = localStorage.getItem('lastVisit');
        const now = Date.now();
        
        if (!lastVisit) {
            localStorage.setItem('lastVisit', now);
            return true;
        }

        // Check if 20 minutes (1000000 milliseconds) have passed
        if (now - parseInt(lastVisit) > 1000000) {
            localStorage.setItem('lastVisit', now);
            return true;
        }

        return false;
    }

    function showContent() {
        contentWrapper.classList.add('visible');
        // Show pet container after content is visible
        if (petContainer) {
            setTimeout(() => {
                petContainer.style.display = '';
                // Initialize pet if not already initialized
                if (window.Pet && !window.petInstance) {
                    new Pet();
                }
            }, 1000); // Small delay after content appears
        }
    }

    if (shouldShowLoadingScreen()) {
        // Show loading screen
        loadingScreen.classList.add('active');
        
        // Start video
        loadingVideo.play();

        // Reload page after video ends
        loadingVideo.addEventListener('ended', () => {
            location.reload();
        });

        // After 30 seconds, hide loading screen and show content
        setTimeout(() => {
            loadingScreen.classList.remove('active');
            showContent();
        }, 30000);
    } else {
        // If we're not showing the loading screen, show content immediately
        showContent();
    }
});