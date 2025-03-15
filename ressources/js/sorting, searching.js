document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const filterTags = document.querySelectorAll('.filter-tag');
    const gameItems = document.querySelectorAll('.game-item');
    
    let activeFilters = new Set();

    // Search functionality
    function filterBySearch(searchTerm) {
        gameItems.forEach(game => {
            const title = game.querySelector('h2').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm.toLowerCase());
            game.style.display = isVisible ? '' : 'none';
        });
    }

    // Sorting functionality
    function sortGames(criteria) {
        const gamesList = document.querySelector('.games-list');
        const gamesArray = Array.from(gameItems);

        gamesArray.sort((a, b) => {
            switch(criteria) {
                case 'name':
                    const nameA = a.querySelector('h2').textContent.toLowerCase();
                    const nameB = b.querySelector('h2').textContent.toLowerCase();
                    return nameA.localeCompare(nameB);

                case 'hours':
                    const hoursA = parseInt(a.querySelector('.last-played').textContent);
                    const hoursB = parseInt(b.querySelector('.last-played').textContent);
                    return hoursB - hoursA;

                case 'achievements':
                    const progressA = parseInt(a.querySelector('.achievement-progress').style.width);
                    const progressB = parseInt(b.querySelector('.achievement-progress').style.width);
                    return progressB - progressA;

                default:
                    return 0;
            }
        });

        gamesArray.forEach(game => gamesList.appendChild(game));
    }

    // Tag filtering functionality
    function filterByTags() {
        if (activeFilters.size === 0) {
            gameItems.forEach(game => game.style.display = '');
            return;
        }

        gameItems.forEach(game => {
            const gameTags = Array.from(game.querySelectorAll('.tag'))
                .map(tag => tag.textContent);
            
            const hasAllTags = Array.from(activeFilters)
                .every(filter => gameTags.includes(filter));
            
            game.style.display = hasAllTags ? '' : 'none';
        });
    }

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        filterBySearch(e.target.value);
    });

    sortSelect.addEventListener('change', (e) => {
        sortGames(e.target.value);
    });

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagName = tag.getAttribute('data-tag');
            
            if (activeFilters.has(tagName)) {
                activeFilters.delete(tagName);
                tag.classList.remove('active');
            } else {
                activeFilters.add(tagName);
                tag.classList.add('active');
            }
            
            filterByTags();
        });
    });

});
// Масив з шляхами до зображень
const images = [
    '../img/games/gamebanner/darksouls1.webp',
    '../img/games/gamebanner/darksouls2.webp',
    '../img/games/gamebanner/darksouls3.webp',
    '../img/games/gamebanner/eldenring.webp',
    '../img/games/gamebanner/codevein.webp',
    '../img/games/gamebanner/scarletnexus.webp',
    '../img/games/gamebanner/dragondogma1.webp',
    '../img/games/gamebanner/dragondogma2.webp',
    '../img/games/gamebanner/terraria.webp',
    '../img/games/gamebanner/minecraft.webp',
    '../img/games/gamebanner/tboi.webp',
    '../img/games/gamebanner/es.webp',
    '../img/games/gamebanner/alien1.webp',
    '../img/games/gamebanner/saiko1.webp',
    '../img/games/gamebanner/saiko2.webp',
    '../img/games/gamebanner/mgi.webp',
    '../img/games/gamebanner/mgq.webp',
    '../img/games/gamebanner/winterm.webp',
    '../img/games/gamebanner/summerm.webp',
    '../img/games/gamebanner/Helltaker.webp',
    '../img/games/gamebanner/twin_saga.webp',
    '../img/games/gamebanner/ara_fell.webp',
    '../img/games/gamebanner/The_Herbalistpng.webp',
    '../img/games/gamebanner/stalkerhc.webp',
    '../img/games/gamebanner/nfsheat.webp',
    '../img/games/gamebanner/Corpse_Party.webp',
    '../img/games/gamebanner/rezero.webp',
    '../img/games/gamebanner/nekopara.webp',
    '../img/games/gamebanner/stardew.webp',
    '../img/games/gamebanner/doki.webp',
    // Додайте стільки зображень, скільки потрібно
];

// Функція для зміни фону
function changeBackground() {
    // Вибір випадкового зображення з масиву
    const randomImage = images[Math.floor(Math.random() * images.length)];
    
    // Зміна фону
    document.body.style.backgroundImage = `url(${randomImage})`;
}

// Викликаємо функцію при завантаженні сторінки
changeBackground();

// Змінюємо фон кожні 5 секунд (5000 мілісекунд)
setInterval(changeBackground, 5000);

// Хоррор)
document.getElementById('showButton').addEventListener('click', function() {
    let img = document.getElementById('image');
    let sound1 = document.getElementById('sound1');

    this.style.display = 'none'; // Ховаємо кнопку
    img.style.left = '80px';
    img.style.opacity = '1';
    sound1.play();
});

document.getElementById('image').addEventListener('mouseenter', function() {
    let sound3 = document.getElementById('sound3');
    sound3.currentTime = 0;
    sound3.play();
});

document.getElementById('image').addEventListener('mouseleave', function() {
    let sound3 = document.getElementById('sound3');
    sound3.pause();
    sound3.currentTime = 0;
});

document.getElementById('image').addEventListener('click', function() {
    let sound2 = document.getElementById('sound2');
    let sound3 = document.getElementById('sound3');
    let img = document.getElementById('image');
    let overlay = document.getElementById('darkOverlay');

    sound3.pause();
    sound3.currentTime = 0;

    img.style.animation = 'none';
    img.style.transform = 'none';
    img.style.opacity = '0'; // Зникає картинка

    overlay.style.background = 'rgba(0, 0, 0, 1.0)'; // Темний екран
    document.body.style.background = 'rgba(0, 0, 0, 1.0)'; // Темніє вся сторінка

    sound2.play();
    setTimeout(() => {
        window.location.href = 'newpage.html';
    }, 5000);
});





