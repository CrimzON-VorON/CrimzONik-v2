// Pet class implementation
class Pet {
    constructor() {
        this.container = document.querySelector('.pet-container');
        this.sprite = document.querySelector('.pet-sprite');
        this.speechBubble = document.querySelector('.speech-bubble');
        this.controls = document.querySelector('.pet-controls');
        this.hideButton = document.querySelector('.hide-button');
        this.scrollTopButton = document.querySelector('.scroll-top-button');
        this.showOffButton = document.querySelector('.show-off-button');
        this.sizeToggleButton = document.querySelector('.size-toggle-button');
        
        // Get current page
        this.currentPage = this.getCurrentPage();
        
        // Animation states
        this.animations = {
            idle: '../img/pet/idle1.gif',
            showing: '../img/pet/waving1.gif',
            hiding: '../img/pet/leaving1.gif',
            talking: '../img/pet/speaking1.gif',
            showOff: '../img/pet/show-off1.gif',
            scroll: '../img/pet/scroll1.gif',
            shinob: '../img/pet/Shinob.gif',
            shinob2: '../img/pet/shinob2.png'
        };

        // Animation durations in milliseconds
        this.durations = {
            showing: 4600,
            hiding: 4000,
            talking: 3000,
            showOff: 7100,
            scroll: 3600,
            buttonActive: 3000,
            shinob: 6000,
            shinob2: 20000
        };

        // Sound setup
        this.dialogueSound = new Audio('../audio/Notifications Pet.mp3');
        this.dialogueSound.volume = 0.5;

        // Preloaded GIFs storage
        this.preloadedGifs = {};
        
        // Current animation state
        this.currentAnimation = 'idle';
        
        // Dialog control
        this.currentDialog = null;
        this.dialogTimeout = null;
        
        // Dialogue database
        this.dialogues = {
            random: [
                "Якщо заважаю, то заховай мене...  ⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀ ⠀⠀⠀⠀  Тільки ненадовго. Або зменши, це краще буде.",
                "З минулого сайту мій брат набрався навичок і створив мене! ⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀ ⠀⠀⠀⠀  Але як пета для сайту...",
                "Розважаєшся переглядом цього сайту?",
                "Не забувайте відпочивати!",
                "Ех... іноді так самотньо...",
                "Ти ще тут?",
                "Скучаю по минулим часам...",
                "Як справи?",
                "Тут так багато всього цікавого!",
                "Натисни на мене!"
            ],
            random2: [
                "Хей, лоскотно!",
                "Хей, дивись куди тикаєш)",
                "Куди натискаєш? :)",
                "Хочеш історію? Може пізніше.",
                "Колись ми з братом перемогли напів-бога."
            ],
            showOff: [
                "Заціни!",
                "Я добре виглядаю?",
                "Подобається, що бачиш?",
                "Та-да! Це я!"
            ],
            popup: [
                "О, вспливаюче вікно! Що всередині?",
                "Я люблю, коли щось спливає!",
                "Давайте подивимось, що у нас тут..."
            ],
            button: [
                "Клік клік!",
                "Кнопки прикольні!",
                "Що вона робить?"
            ],
            hide: [
                "Побачимося!",
                "Трохи відпочину!",
                "Скоро повернуся!"
            ],
            show: [
                "Я повернулася!",
                "Скучав за мною?",
                "Знову привіт!"
            ],
            scroll: [
                "Вгору!",
                "*Wheee!*"
            ],
            shrink: [
                "Ой, я зменшилась! Мене видно?",
                "Не ховай мене тільки, коли я зменшилась, бо загублюся в коді...",
                "Маленька, але все ще красуня!"
            ],
            grow: [
                "Знову велика!",
                "Це я збільшилась, чи ти завжди був таким.. маленьким?)",
                "Тепер мене краще видно!"
            ],
            // Діалоги-привітання для окремих сторінок
            info: [
                "Тут знайдеш різну інформацію."
            ],
            waifu: [
                "О, тут його улюблені вайфу! Тут стільки красунь! Диви, декілька карточок рухаються!",
                "Стільки гарних персонажів... Диви, декілька карточок рухаються!",
                "Яка твоя улюблена вайфу? Диви, декілька карточок рухаються!"
            ],
            watching: [
                "Тепер ці бокси повинні виглядати нормально."
            ],
            games: [
                "Багато ігор.. Хей, я щось відчуваю.. на цій сторінці щось є..."
            ],
            cookpad: [
                "Ох ммм як тут багато всього смачного!"
            ],
            'cool-things': [
                "Ох як тут віє ностальгією, тут багато всього цікавого. Краще зменши мене тут, щоб тобі не заважати клікати. Але тільки не ховай!"
            ],
            anime: [
                "Рецензія та опис є тільки в улюблених, в інших всередині є тільки теги."
            ],
            manga: [
                "Опис є тільки в улюблених, тегів тут немає. Нажаль тут ти не знайдеш нормальну рецензію по деяким причинам."
            ],
            movies: [
                "На цій сторінці немає рецензій і жанрів навіть, ніде, крім улюблених... уви... А хоча почекай, вони зявилися в деяких недавніх фільмах теж."
            ],
            series: [
                "На цій сторінці є рецензії в улюблених та в деяких самих недавніх серіалах."
            ],
            // Діалоги для реагування на кнопки та інші дії
            horror: [
                "О, так це воно! Наведи на нього."
            ],
            horror2: [
                "Хахаха!"
            ],
            'waifu-water': [
                "Схоже він трохи захопився з описом Вайф, багато вже води."
            ],
            'game-code-vein': [
                "О, я є тут."
            ],
            'cool-things-plush': [
                "Вау, які милі плюші!"
            ],
            'cool-things-anime': [
                "Скільки тут аніме речей!"
            ],
            'cool-things-pen': [
                "Ось би він мене намалював..."
            ],
            zelda: [
                "Вау... Як же красиво..."
            ],
            'cookpad-1': [
                "Насправді, не буде лишнім добавити ще цибулі."
            ],
            'cookpad-2': [
                "Тут по тісту все те саме що і в звичайному пирозі, просто начинка інша."
            ],
            'cookpad-5': [
                "Його тортів, правда, тут ще нема."
            ],
            'cookpad-11': [
                "А тобі подобаються гриби?)"
            ],
            'cookpad-18': [
                "Да... цей рецепт треба буде обновити і зробити кращі."
            ],
            'cookpad-19': [
                "Щоб змінити колір млинців на коричневий, можно просто добавити какао, а щоб зробити зелені, то можна добавити подріблений шпинат."
            ],
            shinob: [
                "Ка-ка-ка, я все ще тут! Я тут внизу!"
            ],
            shinob2: [
                "Ка-ка-ка!"
            ],
            'surprise-event': [
                "Ой! Що це..."
            ],
            'hentai-warning': [
                "( ͡~ ͜ʖ ͡°)"
            ]
        };

        // Make the instance available globally for external access
        window.petInstance = this;

        // Start preloading immediately
        this.preloadAnimations();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('waifu')) return 'waifu';
        if (path.includes('horror')) return 'horror';
        if (path.includes('info')) return 'info';
        if (path.includes('watching')) return 'watching';
        if (path.includes('games')) return 'games';
        if (path.includes('cookpad')) return 'cookpad';
        if (path.includes('cool-things')) return 'cool-things';
        if (path.includes('anime')) return 'anime';
        if (path.includes('manga')) return 'manga';
        if (path.includes('movies')) return 'movies';
        if (path.includes('series')) return 'series';
        return 'default';
    }

    async preloadAnimations() {
        const preloadPromises = Object.entries(this.animations).map(([key, url]) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.preloadedGifs[key] = img;
                    resolve();
                };
                img.onerror = () => reject(`Failed to load ${url}`);
                img.src = url;
            });
        });

        try {
            await Promise.all(preloadPromises);
            console.log('All animations preloaded successfully');
            this.init(); // Initialize only after preloading
        } catch (error) {
            console.error('Error preloading animations:', error);
            this.init(); // Initialize anyway to ensure functionality
        }
    }

    init() {
        // Check if there's a saved state
        const isHidden = localStorage.getItem('petHidden') === 'true';
        const isShrunk = localStorage.getItem('petShrunk') === 'true';
        
        if (!isHidden) {
            // Show pet after a delay only if it wasn't hidden before
            setTimeout(() => this.appear(), 2000);
        } else {
            // If it was hidden before, keep it hidden
            this.container.classList.remove('visible');
            this.controls.classList.add('hidden');
            this.sprite.style.display = 'none';
        }


        // Setup event listeners
        this.setupEventListeners();

        // Start random dialogue timer
        this.startRandomDialogues();

        // Set initial animation
        this.setAnimation('idle');

        // Add horror button listeners if they exist
        const showButton = document.getElementById('showButton');
        const horrorImage = document.getElementById('image');
        
        if (showButton) {
            showButton.addEventListener('click', () => {
                this.sayDialogue('horror', true);
            });
        }
        
        if (horrorImage) {
            horrorImage.addEventListener('click', () => {
                this.sayDialogue('horror2', true);
            });
        }
    }

    playDialogueSound() {
        // Reset and play the sound
        this.dialogueSound.currentTime = 0;
        this.dialogueSound.play().catch(error => {
            console.warn('Failed to play dialogue sound:', error);
        });
    }

    setAnimation(state, duration = 0) {
        this.currentAnimation = state;
        
        // Use preloaded GIF if available
        if (this.preloadedGifs[state]) {
            this.sprite.style.backgroundImage = `url(${this.preloadedGifs[state].src})`;
        } else {
            // Fallback to direct URL
            this.sprite.style.backgroundImage = `url(${this.animations[state]})`;
        }

        if (duration > 0) {
            setTimeout(() => {
                if (this.currentAnimation === state) {
                    this.setAnimation('idle');
                }
            }, duration);
        }
    }

    setupEventListeners() {
        // Hide button
        this.hideButton.addEventListener('click', () => {
            if (this.container.classList.contains('visible')) {
                // Hiding
                this.toggleButtonImage(this.hideButton);
                this.sayDialogue('hide');
                this.setAnimation('hiding', this.durations.hiding);
                setTimeout(() => {
                    this.container.classList.remove('visible');
                    this.controls.classList.add('hidden');
                    this.sprite.style.display = 'none';
                    localStorage.setItem('petHidden', 'true');
                }, this.durations.hiding);
            } else {
                // Showing
                this.container.classList.add('visible');
                this.controls.classList.remove('hidden');
                this.sprite.style.display = 'block';
                this.setAnimation('showing', this.durations.showing);
                this.toggleButtonImage(this.hideButton);
                this.sayDialogue('show');
                localStorage.setItem('petHidden', 'false');
            }
        });

        // Show-off button
        this.showOffButton.addEventListener('click', () => {
            this.toggleButtonImage(this.showOffButton);
            this.setAnimation('showOff', this.durations.showOff);
            this.sayDialogue('showOff', true);
        });

        // Scroll top button
        this.scrollTopButton.addEventListener('click', () => {
            this.toggleButtonImage(this.scrollTopButton);
            this.setAnimation('scroll', this.durations.scroll);
            this.sayDialogue('scroll', true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Size toggle button
        this.sizeToggleButton.addEventListener('click', () => {
            this.toggleButtonImage(this.sizeToggleButton);
            const isShrunk = this.container.classList.toggle('shrunk');
            localStorage.setItem('petShrunk', isShrunk);
            this.setAnimation('talking', this.durations.talking);
            this.sayDialogue(isShrunk ? 'shrink' : 'grow', true);
        });

        // Pet click interaction
        this.sprite.addEventListener('click', () => {
            this.setAnimation('talking', this.durations.talking);
            this.sayDialogue('random2', true);
        });
    }

    appear() {
        this.container.classList.add('visible');
        this.setAnimation('showing', this.durations.showing);
        // Use page-specific dialogue if available, otherwise use default show dialogue
        const dialogueType = this.dialogues[this.currentPage] ? this.currentPage : 'show';
        this.sayDialogue(dialogueType, true);
    }

    toggleButtonImage(button) {
        const img = button.querySelector('img');
        const activeUrl = img.dataset.active;
        const defaultUrl = img.dataset.default;
        
        img.src = activeUrl;
        setTimeout(() => {
            img.src = defaultUrl;
        }, this.durations.buttonActive);
    }

    async sayDialogue(type, isPriority = true) {
        // If there's an ongoing dialogue and this is not a priority message, don't interrupt
        if (this.currentDialog && !isPriority) {
            return;
        }

        // Clear any existing timeout
        if (this.dialogTimeout) {
            clearTimeout(this.dialogTimeout);
        }

        // If there's an ongoing dialogue and this is a priority message, clear it
        if (this.currentDialog) {
            this.speechBubble.textContent = '';
            this.currentDialog = null;
        }

        const dialogues = this.dialogues[type];
        const dialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
        
        this.currentDialog = dialogue;
        this.speechBubble.textContent = '';
        this.speechBubble.classList.add('visible');

        // Play sound when dialogue starts
        this.playDialogueSound();
        
        // Set talking animation if not in a special animation state
        if (!['showing', 'hiding', 'showOff', 'scroll'].includes(this.currentAnimation)) {
            this.setAnimation('talking');
        }
        
        try {
            // Typing effect
            for (let char of dialogue) {
                // Check if this dialogue is still current
                if (this.currentDialog !== dialogue) {
                    return;
                }
                this.speechBubble.textContent += char;
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            // Set timeout to hide the dialogue
            this.dialogTimeout = setTimeout(() => {
                if (this.currentDialog === dialogue) {
                    this.speechBubble.classList.remove('visible');
                    this.currentDialog = null;
                    // Return to idle animation only if not in a special animation state
                    if (!['showing', 'hiding', 'showOff', 'scroll'].includes(this.currentAnimation)) {
                        this.setAnimation('idle');
                    }
                }
            }, 5000);
        } catch (error) {
            console.error('Dialog interrupted:', error);
            // Return to idle animation on error if not in a special animation state
            if (!['showing', 'hiding', 'showOff', 'scroll'].includes(this.currentAnimation)) {
                this.setAnimation('idle');
            }
        }
    }

    startRandomDialogues() {
        setInterval(() => {
            if (Math.random() < 0.3 && this.container.classList.contains('visible')) {
                this.sayDialogue('random', false);
            }
        }, 20000);
    }
}

// Initialize pet when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Pet();
});