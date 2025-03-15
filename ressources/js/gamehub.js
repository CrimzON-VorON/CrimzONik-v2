document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('gamePopup');
    const openButton = document.getElementById('openPopup');
    const closeButton = document.querySelector('.close-popup');

    function openPopup() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }

    openButton.addEventListener('click', openPopup);
    closeButton.addEventListener('click', closePopup);

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
});


    const images = [
        { src: "../img/games/minecraft/novaskin-wallpaper-christmaseven.webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-craftingtable.webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-hatsunemiku.webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-lookingskywar.webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-nightsky.webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-profile2sword.webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-profile2sword (1).webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-skyblock3.webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-sunset3.webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-thewarpedfore.webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-wither.webp", title: "Minecraft" },
        { src: "../img/games/minecraft/novaskin-wallpaper-egg.webp", title: "Minecraft" }
    ];

    let currentIndex = 0;
    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length;
        document.getElementById("gameImage").src = images[currentIndex].src;
        document.getElementById("gameTitle").textContent = images[currentIndex].title;
    }
    setInterval(changeImage, 4000);

        function toggleDetails(id) {
            let details = document.getElementById('details' + id);
            let audio = document.getElementById('audio' + id);
            details.classList.toggle('hidden');
            audio.play();
        }

    
        document.getElementById('showButton').addEventListener('click', function() {
            let img = document.getElementById('image');
            let sound1 = document.getElementById('sound1');
            img.style.left = '20px';
            img.style.opacity = '1';
            sound1.play();
        });
        
        document.getElementById('image').addEventListener('click', function() {
            let sound2 = document.getElementById('sound2');
            sound2.play();
            setTimeout(() => {
                window.location.href = 'newpage.html';
            }, 5000);
        });