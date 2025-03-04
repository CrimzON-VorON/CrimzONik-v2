document.addEventListener('DOMContentLoaded', () => {
    // Character data
    const waifuData = {
        1: {
            name: "Shinobu Oshino",
            anime: "Атака Титанів",
            description: `Ака - Kiss-Shot Acerola-Orion Heart-Under-Blade. Моя #1 Вайфу назавжди! Перше знайомство було колись давно, випадково натрапив у ютубі у якихось нарізках. Пізніше побачив файт Arararagi і Shinobu в коубі і це мене дуже заворожило, що я одразу кинувся дивитися. Вона була чудова, у всьому, і я відразу її полюбив. Думаю поступлю в універ, повернуся з пар і піду пізно в метро і зустріну там її, але насправді зустрів гопників, но ладно. Реальність все-таки сосе. (Думав весь час, що коли з'явиться дівчина, то я її обов'язково попросю закосплеїти Shinobu, ну добре, що не дійшло до цього з тією. Чекаю кращих часів і я обов'язково вмовлю іншу так зробити:). Так само я натрапив на симулятор, переважно для VR. Моєму щастю не було межі, я забив на все, одразу засів і надовго і весь час просто гуляв та розглядав її. Це було просто неймовірно!
            <br><br>
            Вона ж прекрасна у всьому: може бути Hot Milf Mommy у своїй гарячій дорослій формі, так само юною дівчиною, тінейджером і навіть лолі, що зазвичай вона і буває. Чарівна і мила зовнішність, приваблива фігура, чудове волосся та їх форма з цими закрутками біля вух та на кінчиках. Цікавий характер, що поєднує кілька типів настроїв. Та й до того ж це вампір, прекрасний вампір, вік та сила буде залежати від того, скільки вона випила крові. Куди ставати донором? Дякую також тобі, Денисе! За чудову подушку, я дуже задоволений :3`,
            stats: {
                strength: 100,
                intelligence: 100,
                charisma: 100,
                kawaii: 100
            },
            shrineMusic: "../audio/waifus/holo.mp3"
        },
        2: {
            name: "Асуна Юкі",
            anime: "Мастер Меча Онлайн",
            description: `Асуна Юкі, також відома як "Блискавична Спалах", є однією з головних героїнь аніме "Мастер Меча Онлайн". Вона не лише надзвичайно красива, але й дуже талановита фехтувальниця, яка стала віце-командиром гільдії "Лицарі Крові".
            <br><br>
            Асуна відома своєю рішучістю, інтелектом та лідерськими якостями. Протягом серіалу вона розвивається від наляканої гравчині до впевненої в собі жінки, яка готова боротися за своє майбутнє. Її стосунки з Кіріто є центральною романтичною лінією серіалу.`,
            stats: {
                strength: 85,
                intelligence: 90,
                charisma: 88,
                kawaii: 92
            }
        },
        3: {
            name: "Рем",
            anime: "Re:Zero",
            description: `Рем — покоївка з блакитним волоссям з аніме "Re:Zero — Життя з нуля в іншому світі". Вона відома своєю відданістю, працьовитістю та готовністю пожертвувати собою заради тих, кого любить.
            <br><br>
            Незважаючи на свою зовнішню м'якість, Рем надзвичайно сильна в бою, особливо коли використовує свою демонічну силу. Її безумовна любов до головного героя Субару зробила її однією з найпопулярніших вайфу в аніме-спільноті.`,
            stats: {
                strength: 88,
                intelligence: 75,
                charisma: 80,
                kawaii: 98
            }
        },
        4: {
            name: "Маї Сакурадзіма",
            anime: "Сезон цвітіння",
            description: `Маї Сакурадзіма — головна героїня аніме "Сезон цвітіння". Вона колишня дитяча актриса та модель, яка через синдром підліткового віку стала невидимою для більшості людей.
            <br><br>
            Маї відома своєю зрілістю, розумом та прямолінійністю. Незважаючи на свою холодну зовнішність, вона має добре серце і глибоко піклується про головного героя Сакуту. Її стосунки з ним розвиваються природно і зворушливо протягом серіалу.`,
            stats: {
                strength: 60,
                intelligence: 95,
                charisma: 90,
                kawaii: 85
            }
        },
        5: {
            name: "Ерза Скарлет",
            anime: "Хвіст Феї",
            description: `Ерза Скарлет — одна з головних героїнь аніме "Хвіст Феї". Вона S-класу маг, відома як "Титанія", і є однією з найсильніших членів гільдії Хвіст Феї.
            <br><br>
            Ерза володіє магією перевтілення, яка дозволяє їй миттєво змінювати броню та зброю. Вона сувора, дисциплінована і часто лякає інших членів гільдії, але також має м'яку сторону, особливо коли справа стосується її друзів або полуничного торта.`,
            stats: {
                strength: 98,
                intelligence: 85,
                charisma: 88,
                kawaii: 75
            }
        },
        6: {
            name: "Ніко Робін",
            anime: "Ван Піс",
            description: `Ніко Робін — археолог команди Солом'яного Капелюха в аніме "Ван Піс". Вона володіє силою Дияволського Фрукту Хана-Хана, який дозволяє їй створювати копії частин свого тіла на будь-якій поверхні.
            <br><br>
            Робін має трагічне минуле, але знайшла свій дім серед команди Луффі. Вона розумна, спокійна і часто є голосом розуму в команді. Її знання історії та здатність читати Понегліфи роблять її ключовою фігурою в пошуку Ван Піса.`,
            stats: {
                strength: 75,
                intelligence: 98,
                charisma: 85,
                kawaii: 80
            }
        },
        7: {
            name: "Хіната Хюґа",
            anime: "Наруто",
            description: `Хіната Хюґа — куноічі з клану Хюґа в аніме "Наруто". Вона володіє Бякуґаном, який дозволяє їй бачити чакру та мати майже 360-градусний огляд.
            <br><br>
            Хіната спочатку була дуже сором'язливою і невпевненою в собі, але завдяки своїй любові до Наруто вона знайшла силу і мужність стати сильнішою. Її доброта, відданість і непохитна віра в Наруто зробили її улюбленицею багатьох фанатів.`,
            stats: {
                strength: 80,
                intelligence: 75,
                charisma: 70,
                kawaii: 95
            }
        },
        8: {
            name: "Йоруічі Шіхоїн",
            anime: "Бліч",
            description: `Йоруічі Шіхоїн — колишня капітан 2-го загону Готей 13 і колишня командир Таємного загону в аніме "Бліч". Вона відома як "Богиня Блискавки" завдяки своїй неперевершеній швидкості.
            <br><br>
            Йоруічі має здатність перетворюватися на чорного кота, що дозволяє їй шпигувати і пересуватися непомітно. Вона грайлива, впевнена в собі і часто дражнить інших персонажів, особливо Кіске Урахару, з яким має давні стосунки.`,
            stats: {
                strength: 95,
                intelligence: 90,
                charisma: 85,
                kawaii: 80
            }
        }
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
    const waifuShrine = document.getElementById('mikasaShrine');
    const shrineAudio = document.getElementById('shrineAudio');

    // Toggle sidebar functionality
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');

    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Create character looking element
    const characterLooking = document.createElement('img');
    characterLooking.className = 'character-looking';
    characterLooking.src = '../img/waifus/avatar/shinobuyapp.webp';
    characterLooking.alt = 'Мікаса дивиться';
    document.body.appendChild(characterLooking);

    // Initially hide the shrine
    if (waifuShrine) {
        waifuShrine.style.display = 'none';
    }

    // Special functionality for first card
    const firstCard = document.querySelector('.waifu-card[data-waifu-id="1"]');
    
    firstCard.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent regular popup
        
        // Show character looking
        characterLooking.classList.add('active');
        
        // Set up character looking click event
        characterLooking.addEventListener('click', function characterClickHandler() {
            // Destroy animations
            firstCard.classList.add('destroying');
            characterLooking.classList.add('destroying');
            
            // Remove elements after animation
            setTimeout(() => {
                firstCard.style.display = 'none';
                characterLooking.style.display = 'none';
                
                // Show shrine
                if (waifuShrine) {
                    waifuShrine.style.display = 'block';
                    waifuShrine.classList.add('active');
                    
                    // Scroll to shrine
                    waifuShrine.scrollIntoView({ behavior: 'smooth' });
                    
                    // Play shrine music
                    if (shrineAudio) {
                        shrineAudio.play().catch(e => console.log("Audio autoplay prevented:", e));
                    }
                }
                
                // Remove event listener to prevent multiple triggers
                characterLooking.removeEventListener('click', characterClickHandler);
            }, 1000);
        });
    });

    // Make shrine text clickable to stop music
    const shrineText = waifuShrine ? waifuShrine.querySelector('.shrine-text') : null;
    if (shrineText) {
        shrineText.addEventListener('click', () => {
            if (shrineAudio) {
                shrineAudio.pause();
                shrineAudio.currentTime = 0;
            }
        });
    }

    // Show popup for other waifu cards
    waifuCards.forEach(card => {
        if (card.getAttribute('data-waifu-id') !== "1") {
            card.addEventListener('click', () => {
                const waifuId = card.getAttribute('data-waifu-id');
                const musicUrl = card.getAttribute('data-music');
                const bgColor = card.getAttribute('data-color');
                const popupImageUrl = card.getAttribute('data-popup-image');
                const waifu = waifuData[waifuId];
                
                if (waifu) {
                    // Set popup content
                    popupName.textContent = waifu.name;
                    popupAnime.textContent = waifu.anime;
                    popupDescription.innerHTML = waifu.description;
                    
                    // Use different image for popup if available
                    popupImage.src = popupImageUrl || card.querySelector('.waifu-image').src;
                    popupImage.alt = waifu.name;
                    
                    // Set background color
                    document.querySelector('.popup-overlay').style.backgroundColor = bgColor + 'dd'; // Add transparency
                    
                    // Set stats
                    statFills.forEach(fill => {
                        const statType = fill.getAttribute('data-stat');
                        if (waifu.stats[statType]) {
                            setTimeout(() => {
                                fill.style.width = waifu.stats[statType] + '%';
                            }, 100);
                        }
                    });
                    
                    // Play music
                    if (musicUrl) {
                        characterTheme.src = musicUrl;
                        characterTheme.play().catch(e => console.log("Audio autoplay prevented:", e));
                    }
                    
                    // Show popup
                    popup.classList.add('active');
                }
            });
        }
    });

    // Close popup
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
        
        // Reset stats for next opening
        statFills.forEach(fill => {
            fill.style.width = '0';
        });
        
        // Stop music
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
        } else if (e.key === 'Escape' && waifuShrine && waifuShrine.classList.contains('active')) {
            waifuShrine.classList.remove('active');
            waifuShrine.style.display = 'none';
            if (shrineAudio) {
                shrineAudio.pause();
                shrineAudio.currentTime = 0;
            }
        }
    });

    // Preload images for smoother experience
    function preloadImages() {
        waifuCards.forEach(card => {
            const img = new Image();
            const imgElement = card.querySelector('.waifu-image');
            if (imgElement && imgElement.src) {
                img.src = imgElement.src;
            }
            
            // Also preload popup images
            const popupImg = card.getAttribute('data-popup-image');
            if (popupImg) {
                const popupImgObj = new Image();
                popupImgObj.src = popupImg;
            }
        });
    }

    preloadImages();
});
