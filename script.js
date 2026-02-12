const content = document.getElementById('content');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainImage = document.getElementById('main-image');
const question = document.querySelector('.question');

let noCount = 0;
// Base URL for images - will be populated by app.py for online deployment
// Locally it stays empty
const baseUrl = "";

// User images to cycle through
const images = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg"
];

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

function getNextImage() {
    // noCount starts at 1 (first click).
    // We want images[0] ("1.jpg") on first click.
    const index = (noCount - 1) % images.length;
    const imgName = images[index];

    // Check if it's an absolute URL
    if (imgName.startsWith('http')) {
        return imgName;
    }

    return baseUrl + imgName;
}

noBtn.addEventListener('click', () => {
    noCount++;

    // Change No Button Text
    noBtn.innerText = getNoButtonText();

    // Change Image
    mainImage.src = getNextImage();

    // Increase Yes Button Size
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.5}px`;
    yesBtn.style.padding = `${10 * (noCount * 0.5 + 1)}px ${25 * (noCount * 0.5 + 1)}px`;
});

yesBtn.addEventListener('click', () => {
    content.innerHTML = `
        <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Happy Bear" style="width: 250px; border-radius: 15px; margin-bottom: 20px;">
        <h1 class="question">Juhuuu! Ich liebe dich! ❤️</h1>
        <p class="response-text">Bis zum 14. Februar! 😘</p>
        <p class="response-text" style="font-size: 1.2rem; margin-top: 10px;">(Gib Timo einen Kuss!)</p>
    `;

    // E-Mail senden (via Formspree - der einfachste Weg für statische Seiten)
    fetch("https://formspree.io/f/xqedkklr", { // User ID
        method: "POST",
        body: JSON.stringify({ message: "Sie hat JA gesagt! ❤️" }),
        headers: { "Content-Type": "application/json" }
    }).catch(e => console.log("Email error (expected if not configured)", e));

});

