const content = document.getElementById('content');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainImage = document.getElementById('main-image');
const question = document.querySelector('.question');

let noCount = 0;

const phrases = [
    "Nein",
    "Bist du dir sicher?",
    "Wirklich sicher?",
    "Denk nochmal nach!",
    "Letzte Chance!",
    "Bitte nicht!",
    "Du brichst mir das Herz ;(",
    "Ich werde weinen...",
    "Ok, ich höre auf zu fragen...",
    "Scherz, bitte sag JA! ❤️"
];

function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
}

noBtn.addEventListener('click', () => {
    noCount++;

    // Change No Button Text
    noBtn.innerText = getNoButtonText();

    // Increase Yes Button Size
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.5}px`;
    yesBtn.style.padding = `${10 * (noCount * 0.5 + 1)}px ${25 * (noCount * 0.5 + 1)}px`;

    // Optional: Move No button slightly/randomly if desired, but request said simple interaction text change
});

yesBtn.addEventListener('click', () => {
    content.innerHTML = `
        <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Happy Bear" style="width: 250px; border-radius: 15px; margin-bottom: 20px;">
        <h1 class="question">Juhuuu! Ich liebe dich! ❤️</h1>
        <p class="response-text">Bis zum 14. Februar! 😘</p>
    `;
    // Add confetti here if possible, but keep it simple for now as requested
});
