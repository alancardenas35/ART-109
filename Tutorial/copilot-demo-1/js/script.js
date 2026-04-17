document.addEventListener('DOMContentLoaded', () => {
    // Find all like buttons once the page is loaded
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Get the button position so hearts explode from its center
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Create multiple hearts exploding in all directions
            for (let i = 0; i < 20; i++) {
                createHeart(centerX, centerY);
            }
        });
    });

    function createHeart(x, y) {
        // Create heart element
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'explode 2s ease-out forwards';

        // Randomize direction and distance for each heart
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 300 + 100;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        heart.style.setProperty('--endX', `${endX}px`);
        heart.style.setProperty('--endY', `${endY}px`);

        document.body.appendChild(heart);

        // Remove the heart element after the animation finishes
        setTimeout(() => {
            if (document.body.contains(heart)) {
                document.body.removeChild(heart);
            }
        }, 2000);
    }
});

// Inject CSS animation for exploding hearts into the document head
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--endX), var(--endY)) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);