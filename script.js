const letters = [
    'A', 'Ă', 'Â', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Î', 'J', 
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'Ș', 'T', 'Ț', 'U', 
    'V', 'W', 'X', 'Y', 'Z'
];

const colors = ['#FF6347', '#FFD700', '#ADFF2F', '#40E0D0', '#1E90FF', '#DA70D6'];

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const letter = document.getElementById(data);
    event.target.appendChild(letter.cloneNode(true));
    speakWord();
}

function speakWord() {
    const word = Array.from(document.getElementById('word').children)
        .map(letter => letter.textContent)
        .join('');
    if (word.length > 1) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'ro-RO'; // Ensure the language is set to Romanian
        utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'ro-RO');
        utterance.rate = 0.2; // Make the speech slower
        speechSynthesis.speak(utterance);
    }
}

// Function to handle the click event
function addLetter(event) {
    const letter = event.target.cloneNode(true);
    document.getElementById('word').appendChild(letter);
    speakWord();
}

// Updated createAlphabet function to support both drag-and-drop and click
function createAlphabet() {
    const alphabetContainer = document.getElementById('alphabet');
    letters.forEach((letter, index) => {
        const div = document.createElement('div');
        div.id = `letter-${index}`;
        div.className = 'letter';
        div.draggable = true; // Enable draggable attribute
        div.ondragstart = drag; // Add drag event
        div.onclick = addLetter; // Add onclick event
        div.style.color = colors[index % colors.length]; // Set text color to be playful
        div.textContent = letter;
        alphabetContainer.appendChild(div);
    });
}

function resetWord() {
    const wordContainer = document.getElementById('word');
    wordContainer.innerHTML = '';
}

function deleteLastLetter() {
    const wordContainer = document.getElementById('word');
    if (wordContainer.lastChild) {
        wordContainer.removeChild(wordContainer.lastChild);
    }
}

createAlphabet();
