// Cursor Trail Effect
document.addEventListener('mousemove', (e) => {
    createCursorTrail(e.clientX, e.clientY);
});

function createCursorTrail(x, y) {
    // Create particle at cursor position
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    
    // Random size between 4-12px
    const size = Math.random() * 8 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x - size / 2}px`;
    particle.style.top = `${y - size / 2}px`;
    
    // Random color variations from theme
    const colors = [
        'radial-gradient(circle at 30% 30%, rgba(0, 255, 136, 0.8), rgba(0, 212, 255, 0.4))',
        'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.8), rgba(255, 107, 157, 0.4))',
        'radial-gradient(circle at 30% 30%, rgba(255, 107, 157, 0.8), rgba(0, 255, 136, 0.4))',
        'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.8), rgba(0, 212, 255, 0.4))'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1200);
}

// Replace all title bars with Frutiger image
document.addEventListener('DOMContentLoaded', () => {
    const titleBars = document.querySelectorAll('.title-bar');
    
    titleBars.forEach(titleBar => {
        titleBar.innerHTML = `<img src="images/frutiger.jpg" alt="Frutiger Title" class="title-bar-image">`;
    });

    // Animate all text elements on load
    animateTextElements();
});

function animateTextElements() {
    const textElements = document.querySelectorAll('h1, h2, p, span, button');
    textElements.forEach((el, index) => {
        el.style.animation = `text-glow 0.8s ease-out ${index * 0.05}s`;
    });
}

const tasteButton = document.getElementById('taste-button');

if (tasteButton) {
    tasteButton.addEventListener('click', () => {
        createFruitBurst();
        makeWindowWiggle();
    });
}

function createFruitBurst() {
    // Create particle at cursor position
    const count = 15;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'fruit-particle';
        particle.style.left = `${50 + (Math.random() - 0.5) * 40}%`;
        particle.style.top = `${50 + (Math.random() - 0.5) * 40}%`;
        particle.style.background = randomFruitColor();
        particle.style.boxShadow = `0 0 12px ${randomFruitColor()}`;
        document.body.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${(Math.random() - 0.5) * 300}px) scale(0.1) rotate(${Math.random() * 360}deg)`;
            particle.style.opacity = '0';
        });

        particle.addEventListener('transitionend', () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
    }
}

function randomFruitColor() {
    const options = ['#ff6b9d', '#00d4ff', '#00ff88', '#ffd700', '#ff8c00', '#ff00ff'];
    return options[Math.floor(Math.random() * options.length)];
}

function makeWindowWiggle() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.animation = 'window-shake 0.5s';
        setTimeout(() => {
            hero.style.animation = '';
        }, 500);
    }
}

// Inject styles for particles and animations
const style = document.createElement('style');
style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;600;700&display=swap');

    .fruit-particle {
        position: fixed;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        pointer-events: none;
        opacity: 1;
        transition: transform 1.2s ease-out, opacity 1.2s ease-out;
        z-index: 999;
        border: 2px solid rgba(255,255,255,0.8);
    }

    .title-bar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    @keyframes text-glow {
        0% {
            opacity: 0;
            text-shadow: 0 0 10px rgba(0, 255, 136, 0);
            transform: scale(0.8);
        }
        50% {
            text-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
        }
        100% {
            opacity: 1;
            text-shadow: 0 0 8px rgba(255, 107, 157, 0.3);
            transform: scale(1);
        }
    }

    @keyframes text-shimmer {
        0%, 100% {
            text-shadow: 0 0 8px rgba(0, 255, 136, 0.3);
        }
        50% {
            text-shadow: 0 0 20px rgba(0, 212, 255, 0.8), 0 0 30px rgba(255, 107, 157, 0.5);
        }
    }

    h1:hover {
        animation: text-shimmer 0.8s ease-in-out;
    }

    h2:hover {
        animation: text-shimmer 0.8s ease-in-out;
    }

    p:hover {
        animation: text-shimmer 1s ease-in-out;
    }

    @keyframes window-shake {
        0%, 100% { transform: translateX(0) translateY(0); }
        10% { transform: translateX(-3px) translateY(-3px); }
        20% { transform: translateX(3px) translateY(3px); }
        30% { transform: translateX(-3px) translateY(3px); }
        40% { transform: translateX(3px) translateY(-3px); }
        50% { transform: translateX(-2px) translateY(-2px); }
        60% { transform: translateX(2px) translateY(2px); }
        70% { transform: translateX(-2px) translateY(2px); }
        80% { transform: translateX(2px) translateY(-2px); }
        90% { transform: translateX(-1px) translateY(-1px); }
    }
`;
document.head.appendChild(style);

// Add hoverable card interactions
const cards = document.querySelectorAll('.card-interactive');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'card-pop 0.4s ease-out';
    });

    card.addEventListener('mouseleave', () => {
        card.style.animation = 'card-drop 0.3s ease-in';
    });
});

// Add style for card animations
const cardStyle = document.createElement('style');
cardStyle.textContent = `
    @keyframes card-pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1.05) translateY(-8px); }
    }

    @keyframes card-drop {
        0% { transform: scale(1.05) translateY(-8px); }
        100% { transform: scale(1) translateY(0); }
    }
`;
document.head.appendChild(cardStyle);