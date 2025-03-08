document.addEventListener('DOMContentLoaded', () => {
    // Character data
    const waifuData = {
        1: {
            name: "Shinobu Oshino",
            anime: "Monogatari",
            description: `Ака - Kiss-Shot Acerola-Orion Heart-Under-Blade. Моя #1 Вайфу назавжди! Перше знайомство було колись давно, випадково натрапив у ютубі у якихось нарізках. Пізніше побачив файт Arararagi і Shinobu в коубі і це мене дуже заворожило, що я одразу кинувся дивитися. Вона була чудова, у всьому, і я відразу її полюбив. Думаю поступлю в універ, повернуся з пар і піду пізно в метро і зустріну там її, але насправді зустрів гопників, но ладно. Реальність все-таки сосе. (Думав весь час, що коли з'явиться дівчина, то я її обов'язково попросю закосплеїти Shinobu, ну добре, що не дійшло до цього з тією. Чекаю кращих часів і я обов'язково вмовлю іншу так зробити:). Так само я натрапив на симулятор, переважно для VR. Моєму щастю не було межі, я забив на все, одразу засів і надовго і весь час просто гуляв та розглядав її. Це було просто неймовірно!
            <br><br>
            Вона ж прекрасна у всьому: може бути Hot Milf Mommy у своїй гарячій дорослій формі, так само юною дівчиною, тінейджером і навіть лолі, що зазвичай вона і буває. Чарівна і мила зовнішність, приваблива фігура, чудове волосся та їх форма з цими закрутками біля вух та на кінчиках. Цікавий характер, що поєднує кілька типів настроїв. Та й до того ж це вампір, прекрасний вампір, вік та сила буде залежати від того, скільки вона випила крові. Куди ставати донором? Дякую також тобі, Денисе! За чудову подушку, я дуже задоволений :3`,
            stats: {
                strength: 100,
                intelligence: 100,
                charisma: 100,
                kawaii: 100
            } 
        },
        2: {
            name: "Hex Maniac",
            anime: "Pokemon",
            description: `Hex Maniac, таємнича тренерка привидових покемонів, відома своєю загадковою аурою та глибоким розумінням потойбічного світу. Її присутність завжди створює атмосферу містики та інтриги.

            Вона спеціалізується на темних та привидових типах покемонів, досконало володіючи мистецтвом містичних битв. Її погляд, сповнений таємничості, та загадкова посмішка стали її візитною карткою.

            Hex Maniac живе у світі, де межа між реальністю та потойбіччям розмита, і саме це робить її такою унікальною та привабливою особистістю.`,
            stats: {
                strength: 100,
                intelligence: 100,
                charisma: 100,
                kawaii: 100
            }
        },
        3: {
            name: "Neko Kuroha",
            anime: "Brynhildr In The Darkness",
            description: ``
        },
        4: {
            name: "Karura Kure",
            anime: "Kenganverse",
            description: ``
        },
        5: {
            name: "Holo",
            anime: "Spice and wolf",
            description: ``
        },
        6: {
            name: "Aqua",
            anime: "Konosuba",
            description: ``
        },
        7: {
            name: "Tohru",
            anime: "Miss Kobayashi's Dragon Maid",
            description: ``
        },
        8: {
            name: "Mori Calliope",
            anime: "Vtuber",
            description: ``
        },
        9: {
            name: "Elaina",
            anime: "The Journey of Elaina",
            description: ``
        },
        10: {
            name: "Felicia Hardy",
            anime: "Spiderman",
            description: ``
        },
        11: {
            name: "Lena",
            anime: "Everlasting summer",
            description: ``
        },
        12: {
            name: "Senko",
            anime: "The Helpful Fox Senko-san",
            description: ``
        },
        13: {
            name: "Dakini",
            anime: "Imawabi no Dakini",
            description: ``
        },
        14: {
            name: "Fire Keeper",
            anime: "Dark Souls 3",
            description: ``
        },
        15: {
            name: "Saiko",
            anime: "Saiko no Sutoka",
            description: ``
        },
        16: {
            name: "Apricot Froot",
            anime: "Vtuber",
            description: ``
        },
        17: {
            name: "Nekomata Okayu",
            anime: "Vtuber",
            description: ``
        },
        18: {
            name: "Nakiri Ayame",
            anime: "Vtuber",
            description: ``
        },
        19: {
            name: "Jahy",
            anime: "The Great Jahy Will Not Be Defeated!",
            description: ``
        },
        20: {
            name: "Karyl",
            anime: "Princess Connect! Re:Dive",
            description: ``
        },
        21: {
            name: "Zero Two",
            anime: "Darling in the Franxx",
            description: ``
        },
        22: {
            name: "Raven",
            anime: "Teen titans",
            description: ``
        },
    };

    // DOM Elements
    const waifuCards = document.querySelectorAll('.waifu-card');
    const popup = document.querySelector('.waifu-popup');
    const closePopup = document.querySelector('.close-popup');
    const popupName = document.querySelector('.popup-name');
    const popupAnime = document.querySelector('.popup-anime');
    const popupDescription = document.querySelector('.popup-description');
    const popupImage = document.querySelector('.popup-image');
    const characterTheme = document.getElementById('characterTheme');
    const statFills = document.querySelectorAll('.stat-fill');
    const waifuShrine = document.getElementById('shinobuShrine');
    const shrineAudio = document.getElementById('shrineAudio');
    const shrineAudioControl = document.getElementById('shrineAudioControl');
    const hexShrine = document.getElementById('hexShrine');
    const hexShrineAudio = document.getElementById('hexShrineAudio');
    const hexShrineAudioControl = document.getElementById('hexShrineAudioControl');
    let isHexShrineAudioPlaying = false;
    let isShrineAudioPlaying = false;

    // Toggle sidebar functionality
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');

    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

// Створюємо перший елемент (Shinobu)
const characterLooking = document.createElement('img');
characterLooking.classList.add('character-looking');
characterLooking.src = '../img/waifus/avatar/shinobu2_first_frame.png'; // Стартовий кадр
characterLooking.alt = 'Shinobu дивиться';
characterLooking.style.display = 'none'; // Ховаємо його спочатку
document.body.appendChild(characterLooking);


// Створюємо другий елемент (Hex Maniac)
    const hexLooking = document.createElement('img');
    hexLooking.classList.add('character-looking', 'hex-looking'); // Додаємо унікальний клас для Hex
    hexLooking.src = '../img/waifus/hexy_huh.png';
    hexLooking.alt = 'Hex Maniac дивиться';
    document.body.appendChild(hexLooking);

// Змінюємо розмір ТІЛЬКИ першого
    characterLooking.style.width = '600px'; // Збільшити перше зображення
    characterLooking.style.height = 'auto';
    hexLooking.style.width = '450px'; // Збільшити ну і друге зображення
    hexLooking.style.height = 'auto';

    // Відзеркалюємо перше зображення
    characterLooking.style.transform = 'scaleX(-1)'; // Відзеркалюємо по осі X



    // Initially hide the shrines
    if (waifuShrine) {
        waifuShrine.style.display = 'none';
    }
    if (hexShrine) {
        hexShrine.style.display = 'none';
    }

    // Update shrine audio control functionality
    if (shrineAudioControl) {
    const audioSrc = shrineAudioControl.getAttribute('data-audio-src');
    if (audioSrc && shrineAudio) {
        shrineAudio.src = audioSrc;
    }

    shrineAudioControl.addEventListener('click', () => {
        if (!shrineAudio.paused) {
            shrineAudio.pause();
            shrineAudioControl.innerHTML = '<i class="fas fa-play"></i><span>Тема</span>';
        } else {
            shrineAudio.play().catch(e => console.log("Audio autoplay prevented:", e));
            shrineAudioControl.innerHTML = '<i class="fas fa-pause"></i><span>Тема</span>';
        }
    });
}

    // Handle Hex's music control
    if (hexShrineAudioControl) {
    hexShrineAudioControl.addEventListener('click', () => {
        if (!hexShrineAudio.paused) {
            hexShrineAudio.pause();
            hexShrineAudioControl.innerHTML = '<i class="fas fa-play"></i><span>Тема</span>';
        } else {
            hexShrineAudio.play().catch(e => console.log("Audio autoplay prevented:", e));
            hexShrineAudioControl.innerHTML = '<i class="fas fa-pause"></i><span>Тема</span>';
        }
    });
}

    // Helper function for destroy animation
    function handleDestroyAnimation(card, lookingImage, shrine, audio, audioControl, isAudioPlaying) {
        return function destroyHandler() {
            card.classList.add('destroying');
            lookingImage.classList.add('destroying');
            
            setTimeout(() => {
                card.style.display = 'none';
                lookingImage.style.display = 'none';
                
                if (shrine) {
                    shrine.style.display = 'block';
                    shrine.classList.add('active');
                    shrine.scrollIntoView({ behavior: 'smooth' });
                    
                    if (audio) {
                        audio.play()
                            .then(() => {
                                isAudioPlaying = true;
                                audioControl.innerHTML = '<i class="fas fa-pause"></i><span>Тема</span>';
                            })
                            .catch(e => console.log("Audio autoplay prevented:", e));
                    }
                }
                
                lookingImage.removeEventListener('click', destroyHandler);
            }, 1000);
        };
    }

    // First card click handler
    const firstCard = document.querySelector('.waifu-card[data-waifu-id="1"]');
    if (firstCard) {
    firstCard.addEventListener('click', (e) => {
        e.stopPropagation();

        // Показуємо перший кадр і додаємо клас active
        characterLooking.style.display = 'block'; // Робимо зображення видимим
        characterLooking.classList.add('active'); // Додаємо клас active

        // Спочатку показуємо перший кадр
        characterLooking.src = '../img/waifus/avatar/shinobu2_first_frame.png';

        // Через 1 секунду запускаємо анімацію
        setTimeout(() => {
            characterLooking.src = '../img/waifus/avatar/shinobu2.gif'; // Запускаємо GIF
        }, 200); // Через 1 секунду після натискання

        // Через 3 секунди після старту анімації ставимо останній кадр
        setTimeout(() => {
            characterLooking.src = '../img/waifus/avatar/shinobu2_last_frame.png'; // Статичний кадр
        }, 1100); // Через 3 секунди після старту анімації

        // Викликаємо handleDestroyAnimation, якщо потрібно
        characterLooking.addEventListener('click', handleDestroyAnimation(
            firstCard,
            characterLooking,
            waifuShrine,
            shrineAudio,
            shrineAudioControl,
            isShrineAudioPlaying
        ));
    });
}

    // Second card click handler
    const secondCard = document.querySelector('.waifu-card[data-waifu-id="2"]');
    if (secondCard) {
    secondCard.addEventListener('click', (e) => {
        e.stopPropagation();
        hexLooking.classList.add('active');

        // Видаляємо старий обробник, якщо він є
        hexLooking.removeEventListener('click', destroyHandlerHex);
        
        function destroyHandlerHex() {
            hexLooking.classList.remove('hex-float'); // Вимикаємо ефект плавання
            handleDestroyAnimation(
                secondCard,
                hexLooking,
                hexShrine,
                hexShrineAudio,
                hexShrineAudioControl,
                isHexShrineAudioPlaying
            )();
            hexLooking.removeEventListener('click', destroyHandlerHex);
        }

        hexLooking.addEventListener('click', destroyHandlerHex);
    });
}


    // Show popup for other waifu cards (3 and above)
    waifuCards.forEach(card => {
        const waifuId = parseInt(card.getAttribute('data-waifu-id'));
        if (waifuId > 2) {
            card.addEventListener('click', () => {
                const musicUrl = card.getAttribute('data-music');
                const bgColor = card.getAttribute('data-color');
                const popupImageUrl = card.getAttribute('data-popup-image');
                const waifu = waifuData[waifuId];
                
                if (waifu) {
                    popupName.textContent = waifu.name;
                    popupAnime.textContent = waifu.anime;
                    popupDescription.innerHTML = waifu.description;
                    popupImage.src = popupImageUrl || card.querySelector('.waifu-image').src;
                    popupImage.alt = waifu.name;
                    document.querySelector('.popup-overlay').style.backgroundColor = bgColor + 'dd';
                    
                    statFills.forEach(fill => {
                        const statType = fill.getAttribute('data-stat');
                        if (waifu.stats[statType]) {
                            setTimeout(() => {
                                fill.style.width = waifu.stats[statType] + '%';
                            }, 100);
                        }
                    });
                    
                    if (musicUrl) {
                        characterTheme.src = musicUrl;
                        characterTheme.play().catch(e => console.log("Audio autoplay prevented:", e));
                    }
                    
                    popup.classList.add('active');
                }
            });
        }
    });

    // Close popup
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
        statFills.forEach(fill => {
            fill.style.width = '0';
        });
        characterTheme.pause();
        characterTheme.currentTime = 0;
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup || e.target.classList.contains('popup-overlay')) {
            closePopup.click();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup.click();
        } else if (e.key === 'Escape') {
            if (waifuShrine && waifuShrine.classList.contains('active')) {
                waifuShrine.classList.remove('active');
                waifuShrine.style.display = 'none';
                if (shrineAudio) {
                    shrineAudio.pause();
                    shrineAudio.currentTime = 0;
                }
            }
            if (hexShrine && hexShrine.classList.contains('active')) {
                hexShrine.classList.remove('active');
                hexShrine.style.display = 'none';
                if (hexShrineAudio) {
                    hexShrineAudio.pause();
                    hexShrineAudio.currentTime = 0;
                }
            }
        }
    });

    // Preload images
    function preloadImages() {
        waifuCards.forEach(card => {
            const img = new Image();
            const imgElement = card.querySelector('.waifu-image');
            if (imgElement && imgElement.src) {
                img.src = imgElement.src;
            }
            
            const popupImg = card.getAttribute('data-popup-image');
            if (popupImg) {
                const popupImgObj = new Image();
                popupImgObj.src = popupImg;
            }
        });
    }

    preloadImages();
});
