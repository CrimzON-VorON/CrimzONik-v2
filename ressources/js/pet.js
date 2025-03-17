// Pet class implementation
class Pet {
    constructor() {
        this.container = document.querySelector('.pet-container');
        this.sprite = document.querySelector('.pet-sprite');
        this.speechBubble = document.querySelector('.speech-bubble');
        this.controls = document.querySelector('.pet-controls');
        this.hideButton = document.querySelector('.hide-button');
        this.scrollTopButton = document.querySelector('.scroll-top-button');
        
        // Animation states
        this.animations = {
            idle: '../img/pet/CrimzONika.png',
            showing: '../img/pet/CrimzON.png',
            hiding: '../img/pet/CrimzON_DS3.png',
            talking: '../img/pet/CrimzONika_DS2.png'
        };
        
        // Current animation state
        this.currentAnimation = 'idle';
        
        // Dialog control
        this.currentDialog = null;
        this.dialogTimeout = null;
        
        // Dialogue database
        this.dialogues = {
            random: [
                "Hey there! Need any help?",
                "Having fun exploring?",
                "Don't forget to take breaks!",
                "I love this website!",
                "Click around, there's lots to see!"
            ],
            random2: [
                "Hehe, that tickles!",
                "Hey, watch where you're clicking!",
                "Wanna be friends?",
                "You found my secret tickle spot!",
                "*giggles* That's fun!"
            ],
            popup: [
                "Ooh, a popup! What's inside?",
                "I love when things pop up!",
                "Let's see what we have here..."
            ],
            button: [
                "Click click!",
                "Buttons are fun!",
                "What does this one do?"
            ],
            hide: [
                "See you later!",
                "Taking a quick break!",
                "I'll be right back!"
            ],
            show: [
                "I'm back!",
                "Did you miss me?",
                "Hello again!"
            ],
            scroll: [
                "Up we go!",
                "Back to the top!",
                "Wheee!"
            ]
        };

        this.init();
    }

    init() {
        // Show pet after a delay
        setTimeout(() => this.appear(), 1000);

        // Setup event listeners
        this.setupEventListeners();

        // Start random dialogue timer
        this.startRandomDialogues();

        // Set initial animation
        this.setAnimation('idle');
    }

    setAnimation(state, duration = 0) {
        this.currentAnimation = state;
        this.sprite.style.backgroundImage = `url(${this.animations[state]})`;

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
                this.setAnimation('hiding', 2000);
                setTimeout(() => {
                    this.container.classList.remove('visible');
                    this.controls.classList.add('hidden');
                    this.sprite.style.display = 'none';
                }, 2000);
            } else {
                // Showing
                this.container.classList.add('visible');
                this.controls.classList.remove('hidden');
                this.sprite.style.display = 'block';
                this.setAnimation('showing', 2000);
                this.toggleButtonImage(this.hideButton);
                this.sayDialogue('show');
            }
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

        // Scroll top button
        this.scrollTopButton.addEventListener('click', () => {
            this.toggleButtonImage(this.scrollTopButton);
            this.sayDialogue('scroll', true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Pet click interaction
        this.sprite.addEventListener('click', () => {
            this.setAnimation('talking', 2000);
            this.sayDialogue('random2', true);
        });
    }

    appear() {
        this.container.classList.add('visible');
        this.setAnimation('showing', 2000);
        this.sayDialogue('random', true);
    }

    toggleButtonImage(button) {
        const img = button.querySelector('img');
        const activeUrl = img.dataset.active;
        const defaultUrl = img.dataset.default;
        
        img.src = activeUrl;
        setTimeout(() => {
            img.src = defaultUrl;
        }, 2000);
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
        
        // Set talking animation
        if (this.currentAnimation !== 'showing' && this.currentAnimation !== 'hiding') {
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
                    // Return to idle animation only if not in showing/hiding state
                    if (this.currentAnimation !== 'showing' && this.currentAnimation !== 'hiding') {
                        this.setAnimation('idle');
                    }
                }
            }, 3000);
        } catch (error) {
            console.error('Dialog interrupted:', error);
            // Return to idle animation on error
            if (this.currentAnimation !== 'showing' && this.currentAnimation !== 'hiding') {
                this.setAnimation('idle');
            }
        }
    }

    startRandomDialogues() {
        setInterval(() => {
            if (Math.random() < 0.3 && this.container.classList.contains('visible')) {
                this.sayDialogue('random', true);
            }
        }, 10000);
    }
}

// Initialize pet when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Pet();
});