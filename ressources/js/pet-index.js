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
        
        // Get current page
        this.currentPage = this.getCurrentPage();
        
        // Animation states
        this.animations = {
            idle: 'ressources/img/pet/idle.gif',
            showing: 'ressources/img/pet/waving.gif',
            hiding: 'ressources/img/pet/leaving.gif',
            talking: 'ressources/img/pet/speaking2.gif',
            showOff: 'ressources/img/pet/show-off.gif',
            scroll: 'ressources/img/pet/scroll.gif'
        };

        // Animation durations in milliseconds
        this.durations = {
            showing: 3900,
            hiding: 4000,
            talking: 3000,
            showOff: 10000,
            scroll: 6600,
            buttonActive: 3000
        };

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
                "Якщо заважаю, то заховай мене...  ⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀ ⠀⠀⠀⠀  Тільки ненадовго. ",
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
                "Хей, дивись куди тикаєщ)",
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
                "Привіт, я CrimzONika! Я буду допомагати тобі по сайту, та щось розказувати, щоб було не нудно."
            ],
            scroll: [
                "Вгору!",
                "*Wheee!*"
            ],
            // Page-specific dialogues
            info: [
                "Тут знайдеш різну інформацію."
            ],
            waifu: [
                "О, тут його улюблені вайфу! Тут стільки красунь! Диви, декілька карточок рухаються!",
                "Стільки гарних персонажів... Диви, декілька карточок рухаються!",
                "Яка твоя улюблена вайфу?"
            ],
            horror: [
                "Тут... трохи страшно...",
                "Я... я буду поруч з тобою...",
                "Не бійся, я з тобою!",
                "Тримайся міцніше..."
            ]
        };

        // Start preloading immediately
        this.preloadAnimations();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('waifu')) return 'waifu';
        if (path.includes('horror')) return 'horror';
        if (path.includes('info')) return 'info';
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

        // Popup buttons
        document.querySelectorAll('.test-button').forEach((button, index) => {
            button.addEventListener('click', () => {
                const popupId = `popup${index + 1}`;
                const popup = document.getElementById(popupId);
                if (popup) {
                    popup.classList.add('active');
                    this.sayDialogue('popup');
                }
            });
        });

        // Close popup buttons
        document.querySelectorAll('.close-popup').forEach(button => {
            button.addEventListener('click', () => {
                const popup = button.closest('.popup');
                if (popup) {
                    popup.classList.remove('active');
                }
            });
        });

        // Close popups when clicking outside
        document.querySelectorAll('.popup').forEach(popup => {
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    popup.classList.remove('active');
                }
            });
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