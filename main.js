// DOM Elements
const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const sidebarLinks = document.querySelectorAll('.sidebar a');

// Load sidebar state from localStorage
function loadSidebarState() {
    const isHidden = localStorage.getItem('sidebarHidden') === 'true';
    if (isHidden) {
        sidebar.classList.add('hidden');
        mainContent.classList.add('full');
        toggleBtn.style.left = '1rem';
    } else {
        // Ensure links are visible when sidebar is shown
        sidebarLinks.forEach((link, index) => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        });
        toggleBtn.style.left = '250px';
    }
}

// Toggle Sidebar and save state
document.getElementById('toggleSidebar').addEventListener('click', () => {
    const isHiding = !sidebar.classList.contains('hidden');
    
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('full');
    
    // Update toggle button position
    if (isHiding) {
        toggleBtn.style.left = '1rem';
    } else {
        toggleBtn.style.left = '250px';
    }
    
    // Save state to localStorage
    localStorage.setItem('sidebarHidden', sidebar.classList.contains('hidden'));
    
    // Animate links
    sidebarLinks.forEach((link, index) => {
        if (isHiding) {
            // Hiding sidebar - fade out links with delay based on position
            link.style.opacity = '0';
            link.style.transform = 'translateX(-20px)';
        } else {
            // Showing sidebar - fade in links with delay
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, 200 + (index * 50)); // Staggered animation
        }
    });
});

// Initialize sidebar state on page load
document.addEventListener('DOMContentLoaded', loadSidebarState);

// Slider functionality - Only initialize if slider exists
if (slider && prevBtn && nextBtn) {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const slidesPerView = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    };

    function updateSlider() {
        const slideWidth = 100 / slidesPerView();
        slider.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    }

    function nextSlide() {
        const maxIndex = slides.length - slidesPerView();
        slideIndex = slideIndex >= maxIndex ? 0 : slideIndex + 1;
        updateSlider();
    }

    function prevSlide() {
        const maxIndex = slides.length - slidesPerView();
        slideIndex = slideIndex <= 0 ? maxIndex : slideIndex - 1;
        updateSlider();
    }

    // Event Listeners for slider
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Responsive handling
    window.addEventListener('resize', updateSlider);

    // Auto slide functionality with pause on hover
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 2000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Pause auto-sliding when mouse is over the slider container
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Start auto-sliding initially
    startAutoSlide();

    // Initialize slider
    updateSlider();
}

// Fullscreen Image Viewer
const createFullscreenViewer = () => {
    const viewer = document.createElement('div');
    viewer.className = 'fullscreen-viewer';
    
    const image = document.createElement('img');
    image.className = 'fullscreen-image';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-viewer';
    closeButton.innerHTML = '×';
    
    viewer.appendChild(image);
    viewer.appendChild(closeButton);
    document.body.appendChild(viewer);
    
    return { viewer, image, closeButton };
};

const { viewer, image, closeButton } = createFullscreenViewer();

// Add click event to all peripheral item images
document.querySelectorAll('.peripheral-item img').forEach(img => {
    img.addEventListener('click', () => {
        image.src = img.src;
        viewer.classList.add('active');
    });
});

// Close viewer on button click
closeButton.addEventListener('click', () => {
    viewer.classList.remove('active');
});

// Close viewer on background click
viewer.addEventListener('click', (e) => {
    if (e.target === viewer) {
        viewer.classList.remove('active');
    }
});

// Close viewer on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer.classList.contains('active')) {
        viewer.classList.remove('active');
    }
});