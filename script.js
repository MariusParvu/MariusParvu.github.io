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

async function speakWord() {
//  const YOUR_API_KEY = "sk_72a7e72db6e465ce560daa0fd6dc179d82f8e81bd133ac1d"; // Replace with your actual IBM API key
  const word = Array.from(document.getElementById('word').children)
    .map(letter => letter.textContent.toLowerCase())
    .join('');

  if (word.length > 1) {
/*    try {
      // 1. First try ElevenLabs API
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/gbLy9ep70G3JW53cTzFC/stream`, // Romanian-compatible voice ID
        {
          method: 'POST',
          headers: {
            'xi-api-key': YOUR_API_KEY, // Replace with your actual key
            'Content-Type': 'application/json',
            'accept': 'audio/mpeg'
          },
          body: JSON.stringify({
            text: word,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              language: 'ro',
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.3,
              speed: 0.7  // Slower speech (0.5-1.0)
            }
          })
        }
      );

      if (!response.ok) throw new Error('ElevenLabs API failed');
      
      // Create audio from stream
      const audio = new Audio();
      audio.src = URL.createObjectURL(await response.blob());
      audio.play();

    } catch (error) {
      console.warn("ElevenLabs failed, falling back to Web Speech API");
      
      // 2. Fallback to original Web Speech API */
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'ro-RO';
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'ro-RO');
      utterance.rate = 0.2;
      speechSynthesis.speak(utterance);
  }
}

// Function to handle the click event
function addLetter(event) {
    const letter = event.target.cloneNode(true);
    document.getElementById('word').appendChild(letter);a
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
