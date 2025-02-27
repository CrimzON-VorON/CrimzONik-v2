// DOM Elements
const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Load sidebar state from localStorage
function loadSidebarState() {
    const isHidden = localStorage.getItem('sidebarHidden') === 'true';
    if (isHidden) {
        sidebar.classList.add('hidden');
        mainContent.classList.add('full');
    }
}

// Toggle Sidebar and save state
document.getElementById('toggleSidebar').addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('full');
    localStorage.setItem('sidebarHidden', sidebar.classList.contains('hidden'));
});

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

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);

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
