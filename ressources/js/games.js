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

document.querySelectorAll('.review-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const reviewId = button.getAttribute('data-review');

    if (reviewId === "137") {
      const video = document.getElementById('reviewVideo137');
      video.style.display = 'block';

      try {
        await video.requestFullscreen();
        await video.play();
      } catch (err) {
        console.error('Не вдалось запустити відео:', err);
        video.style.display = 'none';
        return;
      }

      video.addEventListener('ended', async () => {
        if (document.fullscreenElement) await document.exitFullscreen();
        video.pause();
        video.currentTime = 0;
        video.style.display = 'none';

        // відкриваємо попап після відео
        const reviewContent = reviewsContainer.querySelector(`[data-review="${reviewId}"]`).cloneNode(true);
        const reviewContainer = reviewPopup.querySelector('.review-container');
        reviewContainer.innerHTML = '';
        reviewContainer.appendChild(reviewContent);
        openPopup(reviewPopup);
      }, { once: true });

      return;
    }

    if (reviewId === "141") {
      // видаляємо старі GIF-и
      document.querySelectorAll('.side-gif').forEach(g => g.remove());

      // створюємо нові GIF-и
      const leftGif = document.createElement('img');
      leftGif.src = '../img/Lunacid1.gif';
      leftGif.className = 'side-gif left-gif';

      const rightGif = document.createElement('img');
      rightGif.src = '../img/Lunacid2.gif';
      rightGif.className = 'side-gif right-gif';

      document.body.appendChild(leftGif);
      document.body.appendChild(rightGif);
    }

    // відкриваємо попап завжди
    const reviewContent = reviewsContainer.querySelector(`[data-review="${reviewId}"]`).cloneNode(true);
    const reviewContainer = reviewPopup.querySelector('.review-container');
    reviewContainer.innerHTML = '';
    reviewContainer.appendChild(reviewContent);
    openPopup(reviewPopup);
  });
});

// ===== ФІКС ДЛЯ GIF-ІВ =====
// Прибираємо GIF-и при закритті попапа
const originalClosePopup = closePopup;
closePopup = function(popup) {
  originalClosePopup(popup); // викликаємо оригінальне закриття
  document.querySelectorAll('.side-gif').forEach(g => g.remove());
};




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
        <h3>Поточні ігри</h3>
        <a href="#section8"><div class="game-item-achiv" data-tooltip="Коопимся з Kolern з модами.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg?t=1748630546" alt="ELDEN RING">
            <div class="game-info-achiv">
                <h4 class="game-name">ELDEN RING</h4>
                <div class="achievement-count">42/42 Ачівок</div>
            </div>
        </div></a>
        <a href="#section9"><div class="game-item-achiv" data-tooltip="Разраб додав всі внутріігрові ачівки і тепер їх треба всі робити... А було вже ачівок 64/68 всього. Думаю ачівок буде ще більше з новим 7 світом в ближчий час.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1476970/header.jpg?t=1741024848.webp" alt="Idleon">
            <div class="game-info-achiv">
                <h4 class="game-name">IdleOn - The Idle RPG</h4>
                <div class="achievement-count">238/276 Ачівок</div>
            </div>
        </div></a>
    `;
    

    logoContainer.appendChild(achievementsPopup);

    // Create second popup (right side)
    const achievementsPopupRight = document.createElement('div');
    achievementsPopupRight.className = 'achievements-popup-right';
    achievementsPopupRight.innerHTML = `
        <h3>Активність (останні зіграні)</h3>
        <a href="#section32"><div class="game-item-achiv" data-tooltip="Чілова візуальна новелла про бартендера.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/447530/header.jpg?t=1730740610" alt="VA-11 Hall-A: Cyberpunk Bartender Action">
            <div class="game-info-achiv">
                <h4 class="game-name">VA-11 Hall-A: Cyberpunk Bartender Action</h4>
            </div>
        </div></a>
        <a href="#section32"><div class="game-item-achiv" data-tooltip="Забавна хентай ігрушка з даванням кофе з інгрідієнтами які ти напишеш які перетворять дівчину в будь що.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3173560/header.jpg?t=1758028869" alt="Anomalous Coffee Machine">
            <div class="game-info-achiv">
                <h4 class="game-name">Anomalous Coffee Machine</h4>
            </div>
        </div></a>
        <a href="#section31"><div class="game-item-achiv" data-tooltip="Такий собі ремейк.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1154790/header.jpg?t=1724164827" alt="XIII">
            <div class="game-info-achiv">
                <h4 class="game-name">XIII</h4>
            </div>
        </div></a>
        <a href="#section30"><div class="game-item-achiv" data-tooltip="Крута темна фентезі натхненна іграми FromSoftware.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1745510/header.jpg?t=1734627655" alt="Lunacid">
            <div class="game-info-achiv">
                <h4 class="game-name">Lunacid</h4>
            </div>
        </div></a>
        <a href="#section27"><div class="game-item-achiv" data-tooltip="Прикольний Дум про сильних, красивих і мускулистих демонес.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1072150/header.jpg?t=1717716092" alt="Hedon Bloodrite">
            <div class="game-info-achiv">
                <h4 class="game-name">Hedon Bloodrite</h4>
            </div>
        </div></a>
        <a href="#section29"><div class="game-item-achiv" data-tooltip="Хентай ігрушка про зйомку фурей.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1526900/header.jpg?t=1756897293" alt="Sapphire Safari">
            <div class="game-info-achiv">
                <h4 class="game-name">Sapphire Safari</h4>
            </div>
        </div></a>
        <a href="#section28"><div class="game-item-achiv" data-tooltip="Хентай ігрушка з багатьма бубастими тьотками.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1621540/8931a302fa88d3f31ae60c4837c2bb471ff5da69/header.jpg?t=1758783310" alt="Spooky Milk Life">
            <div class="game-info-achiv">
                <h4 class="game-name">Spooky Milk Life</h4>
            </div>
        </div></a>
        <a href="#section26"><div class="game-item-achiv" data-tooltip="Я в грі з купую дівчат.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2527500/header.jpg?t=1754525790" alt="MiSide">
            <div class="game-info-achiv">
                <h4 class="game-name">MiSide</h4>
                <div class="achievement-count">26/26 Ачівок</div>
            </div>
        </div></a>
        <a href="#section25"><div class="game-item-achiv" data-tooltip="Годна ігрушка про стрімершу з багатьма концовками.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2988620/f6b2f33d0af2a97327af50613d9e24f40682d645/header.jpg?t=1758210963" alt="I Hate My Waifu Streamer">
            <div class="game-info-achiv">
                <h4 class="game-name">I Hate My Waifu Streamer</h4>
            </div>
        </div></a>
        <a href="#section24"><div class="game-item-achiv" data-tooltip="Класний рогалік про збір спелів і іх використанню.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/881100/header.jpg?t=1675987871" alt="Noita">
            <div class="game-info-achiv">
                <h4 class="game-name">Noita</h4>
                <div class="achievement-count">14/14 Ачівок</div>
            </div>
        </div></a>
        <a href="#section23"><div class="game-item-achiv" data-tooltip="Хоррор в поїзді.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1349960/header.jpg?t=1662352030" alt="The Ghost Train">
            <div class="game-info-achiv">
                <h4 class="game-name">The Ghost Train</h4>
                <div class="achievement-count">5/5 Ачівок</div>
            </div>
        </div></a>
        <a href="#section22"><div class="game-item-achiv" data-tooltip="Головоломка.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3236460/header.jpg?t=1731780976" alt="NNNNNIGHT">
            <div class="game-info-achiv">
                <h4 class="game-name">NNNNNIGHT</h4>
                <div class="achievement-count">6/6 Ачівок</div>
            </div>
        </div></a>
        <a href="#section21"><div class="game-item-achiv" data-tooltip="Собака-мілфа.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3627340/3e5d5f110b0f9932b2e469c9c86fff955641a575/ss_3e5d5f110b0f9932b2e469c9c86fff955641a575.600x338.jpg?t=1746463222" alt="monoch room">
            <div class="game-info-achiv">
                <h4 class="game-name">monoch room</h4>
                <div class="achievement-count">11/11 Ачівок</div>
            </div>
        </div></a>
        <a href="#section20"><div class="game-item-achiv" data-tooltip="Собака.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3627340/74337e229a6fe160533f16bf38956b9ac18a4370/header.jpg?t=1746463222" alt="SAYONALAIKA">
            <div class="game-info-achiv">
                <h4 class="game-name">SAYONALAIKA</h4>
                <div class="achievement-count">3/3 Ачівок</div>
            </div>
        </div></a>
        <a href="#section19"><div class="game-item-achiv" data-tooltip="Калова частина.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2013300/header.jpg?t=1655832203" alt="Alien Shooter 2 - New Era">
            <div class="game-info-achiv">
                <h4 class="game-name">Alien Shooter 2 - New Era</h4>
                <div class="achievement-count">16/16 Ачівок</div>
            </div>
        </div></a>
        <a href="#section18"><div class="game-item-achiv" data-tooltip="Сисяста висока леді.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3187770/header.jpg?t=1733491750" alt="NAGAISAN">
            <div class="game-info-achiv">
                <h4 class="game-name">NAGAISAN</h4>
                <div class="achievement-count">10/10 Ачівок</div>
            </div>
        </div></a>
        <a href="#section17"><div class="game-item-achiv" data-tooltip="Сисяста корівка та класна музика">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2454060/header.jpg?t=1746456703" alt="MAZEMAZE">
            <div class="game-info-achiv">
                <h4 class="game-name">MAZEMAZE</h4>
                <div class="achievement-count">3/3 Ачівок</div>
            </div>
        </div></a>
        <a href="#section16"><div class="game-item-achiv" data-tooltip="Дуже скучна прогулянка">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/520720/header.jpg?t=1751541816" alt="Dear Esther">
            <div class="game-info-achiv">
                <h4 class="game-name">Dear Esther</h4>
                <div class="achievement-count">10/10 Ачівок</div>
            </div>
        </div></a>
        <a href="#section15"><div class="game-item-achiv" data-tooltip="Коротка смішна гра про цицясту дівчинку джестера.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2562350/header.jpg?t=1728248805" alt="Escape Escape">
            <div class="game-info-achiv">
                <h4 class="game-name">Escape Escape</h4>
                <div class="achievement-count">6/6 Ачівок</div>
            </div>
        </div></a>
        <a href="#section14"><div class="game-item-achiv" data-tooltip="Погана ігрушка з бубами циклопа.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2966110/header.jpg?t=1728248596" alt="EYE TO ME">
            <div class="game-info-achiv">
                <h4 class="game-name">EYE TO ME</h4>
                <div class="achievement-count">5/5 Ачівок</div>
            </div>
        </div></a>
        <a href="#section13"><div class="game-item-achiv" data-tooltip="Ігрушка з великими бубами фурей знову і знову.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3046350/header.jpg?t=1728248191" alt="CHURIP">
            <div class="game-info-achiv">
                <h4 class="game-name">CHURIP</h4>
                <div class="achievement-count">5/5 Ачівок</div>
            </div>
        </div></a>
        <a href="#section12"><div class="game-item-achiv" data-tooltip="Ігрушка з великими бубами фурей знову.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2294930/header.jpg?t=1746454695" alt="I wish it was morning all the time">
            <div class="game-info-achiv">
                <h4 class="game-name">I wish it was morning all the time</h4>
            </div>
        </div></a>
        <a href="#section11"><div class="game-item-achiv" data-tooltip="Ігрушка з великими бубами фурей знову.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2725700/header.jpg?t=1728248672" alt="DINNERDINNNER">
            <div class="game-info-achiv">
                <h4 class="game-name">DINNERDINNNER</h4>
                <div class="achievement-count">5/5 Ачівок</div>
            </div>
        </div></a>
        <a href="#section10"><div class="game-item-achiv" data-tooltip="Ігрушка з великими бубами фурей.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2417490/header.jpg?t=1746456185" alt="HOLEHOLE">
            <div class="game-info-achiv">
                <h4 class="game-name">HOLEHOLE</h4>
                <div class="achievement-count">5/5 Ачівок</div>
            </div>
        </div></a>
        <a href="#section6"><div class="game-item-achiv" data-tooltip="Коопились з Kolern.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3121110/header.jpg?t=1741804510" alt="Content Warning">
            <div class="game-info-achiv">
                <h4 class="game-name">Zort</h4>
            </div>
        </div></a>
        <a href="#section5"><div class="game-item-achiv" data-tooltip="Коопились з Kolern.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2881650/header.jpg?t=1736717925" alt="Content Warning">
            <div class="game-info-achiv">
                <h4 class="game-name">Content Warning</h4>
            </div>
        </div></a>
        <a href="#section7"><div class="game-item-achiv" data-tooltip="Коопились в новий Елден з Kolern.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2622380/header.jpg?t=1749150157" alt="ELDEN RING NIGHTREIGN">
            <div class="game-info-achiv">
                <h4 class="game-name">ELDEN RING NIGHTREIGN</h4>
                <div class="achievement-count">37/37 Ачівок</div>
            </div>
        </div></a>
        <a href="#section4"><div class="game-item-achiv" data-tooltip="Пройшов ради ачівок всю трилогію. Нема ніяких покращень, нічого не ісправили стало наче хуже.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2427430/24ab390192735d4e56efc64f9135353457ac981c/header.jpg?t=1747757839" alt="Stalker">
            <div class="game-info-achiv">
                <h4 class="game-name">S.T.A.L.K.E.R. Enhanced Edition</h4>
                <div class="achievement-count">47/47 Ачівок</div>
            </div>
        </div></a>
        <a href="#section3"><div class="game-item-achiv" data-tooltip="Пройшов ради ачівок.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2280/header.jpg?t=1750785073">
            <div class="game-info-achiv">
                <h4 class="game-name">DOOM + DOOM II</h4>
                <div class="achievement-count">33/33 Ачівок</div>
            </div>
        </div></a>
        <a href="#section2"><div class="game-item-achiv" data-tooltip="Милий тамагочі.">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2989820/capsule_184x69.jpg?t=1742668595" alt="Pocket Waifu">
            <div class="game-info-achiv">
                <h4 class="game-name">Pocket Waifu: Desktop Pet</h4>
                <div class="achievement-count">32/32 Ачівок</div>
            </div>
        </div></a>
        <a href="#section1"><div class="game-item-achiv" data-tooltip="Нафармив купу предметів в інвентар, правда продавати їх по 0.5 копійок так впадлу, тому просто мусоряться, лежать">
            <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3419430/a72a5965134f12a6cf86879fa2eb34ba16040486/capsule_184x69.jpg?t=1743708477" alt="Bongo Cat">
            <div class="game-info-achiv">
                <h4 class="game-name">Bongo Cat</h4>
                <div class="achievement-count">7/7 Ачівок</div>
            </div>
        </div></a>
    `;
    
    logoContainer.appendChild(achievementsPopupRight);
    const tooltip = document.createElement('div');
tooltip.className = 'achievement-tooltip';
document.body.appendChild(tooltip);
const gameItems = document.querySelectorAll('.game-item-achiv');

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


    let currentPopup = null;

    logoContainer.addEventListener('click', () => {
        if (currentPopup === null) {
            // Show both popups at once
            achievementsPopup.classList.add('active');
            achievementsPopupRight.classList.add('active');
            currentPopup = 'both';
        } else {
            // Close both popups
            achievementsPopup.classList.remove('active');
            achievementsPopupRight.classList.remove('active');
            currentPopup = null;
        }
    });

    // Prevent popup clicks from closing the popups
    achievementsPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    achievementsPopupRight.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close achievements popups when clicking outside
    document.addEventListener('click', (e) => {
        if (!logoContainer.contains(e.target)) {
            achievementsPopup.classList.remove('active');
            achievementsPopupRight.classList.remove('active');
            currentPopup = null;
        }
    });

    // Close achievements popups on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && (achievementsPopup.classList.contains('active') || achievementsPopupRight.classList.contains('active'))) {
            achievementsPopup.classList.remove('active');
            achievementsPopupRight.classList.remove('active');
            currentPopup = null;
        }
    });
});
