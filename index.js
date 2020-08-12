const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/eyes.jpeg",
    text:
      "Eyes are the window to the soul.Photographer Jameson has been working on exploring how much depth he can reach by looking at the eyes of 15 participants in this years art festival. All participants have been picked by from various continents and from different age groups. Our first model here is Michael, a dancer in Columbia",
  },

  {
    image: "./img/diversity-girls.jpeg",
    text:
      "Mary, Elsa and Vera are three students from Ghana who have chosen to showcase their culture by using various designs that represent their ethnicity and the beauty of their country. They met in college and have since started their business of running a fashion blog with monthly editions since 2018",
  },
  {
    image: "./img/green-earth.jpeg",
    text:
      "Green earth is an experimental work by artist Camio in Japan. He has his works mainly curated in France and the theme for this year revolves around the earth and how we are creatures that sprout and need the green things of this world to survive",
  },
  {
    image: "./img/butterfly-art.jpeg",
    text:
      "Butterflies are favorite creatures for Emily and as a makeup artist , she has chosen to show them in her designs as a trademark and mostly to make her happy. She works with so many actresses from your favorite movies, including our favorite Don Miguan show made in 2017",
  },
  {
    image: "./img/light-skeleton.jpeg",
    text:
      "Victory has works which he says have all been inspired by neon lights. He simply loves the aethetic and has incorporated it in all his merch which he sells on shopify and ebay. He is an enterpreneur who belives creativity and experimental art is not just for the big names but for everyone",
  },

  {
    image: "./img/street-art.jpeg",
    text:
      "Romeo is our only street artist of this year. He was a finalist in the Italian graphic design context held in March this year. He loves to change old buildings and give them new life. He is very charismatic and believes that love should be expressed through color",
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();