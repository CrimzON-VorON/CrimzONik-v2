document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const nextButton = document.getElementById('nextButton');
    const video = document.getElementById('backgroundVideo');
    const buttonSound = document.getElementById('buttonSound');
    const sidebar = document.querySelector('.sidebar');
    const footer = document.querySelector('footer');
    const toggleSidebar = document.getElementById('toggleSidebar');

    startButton.addEventListener('click', () => {
        // Play button sound
        buttonSound.play();

        // Hide start button with fade out
        startButton.style.opacity = '0';
        setTimeout(() => {
            startButton.style.display = 'none';
        }, 300);

        // Show and play video
        video.classList.add('visible');
        video.play();

        // Hide sidebar and footer after 10 seconds
        setTimeout(() => {
            sidebar.style.display = 'none';
            footer.style.display = 'none';
            toggleSidebar.style.display = 'none';
        }, 2500);

        // Show next button after 15 seconds
        setTimeout(() => {
            nextButton.classList.add('visible');
        }, 115000);
    });

    // Ensure video plays unmuted
    video.addEventListener('play', () => {
        video.muted = false;
        video.volume = 1;
    });
});