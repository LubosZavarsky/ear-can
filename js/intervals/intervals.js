import { tonesData, piano, bassoon } from "../data.js";
import getInterval from "./getInterval.js";

const answTones = document.querySelector("#answ-tones");
const answ = document.querySelector("#answ");
const btns = document.querySelectorAll("button");
const quesBtn = document.querySelector("#quesBtn");
const harmBtn = document.querySelector("#harmBtn");
const seqBtn = document.querySelector("#seqBtn");
const answBtn = document.querySelector("#answBtn");
const flashMsg = document.querySelector(".flash");
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const pianoBox = document.querySelector("#piano");
const bassoonBox = document.querySelector("#bassoon");

let question = {
  tones: [{}],
  instruments: [{}],
};

let secondInst;

// slice tones array in half to stay within one octave
const oneOctaveTones = tonesData.slice(0, Math.ceil(tonesData.length / 2));

// ALL BTNS DISABLED BY DEFAULT
//btns.forEach((b) => (b.disabled = true));

// DISABLE BTN IF NO CHECKBOX CHECKED
checkBoxes.forEach((c) =>
  c.addEventListener("change", () => {
    if (
      document.querySelectorAll('input[type="checkbox"]:checked').length === 0
    ) {
      btns.forEach((b) => (b.disabled = true));
      answ.innerText = "";
      answTones.innerText = "";
    } else {
      quesBtn.disabled = false;
    }
  })
);

// EVENT LISTENERS
quesBtn.addEventListener("click", makeQuestion);
quesBtn.addEventListener("touchstart", makeQuestion);

harmBtn.addEventListener("click", playHarmonic);
harmBtn.addEventListener("touchstart", playHarmonic);

seqBtn.addEventListener("click", playMelodic);
seqBtn.addEventListener("touchstart", playMelodic);

answBtn.addEventListener("click", () => {
  const answer = getInterval(question.tones[0].id, question.tones[1].id);
  answ.innerText = answer;
  answTones.innerText = `${question.tones[0].name}, ${question.tones[1].name}`;
});

// PLAY TONES SEQUENTIALLY
function playMelodic(e) {
  e.preventDefault(); // prevent firing click+touch on mobile

  question.instruments[0].play(question.tones[0].name);

  //console.log(question.instruments[0].duration(question.tones[0].name));

  setTimeout(() => {
    question.instruments[secondInst].play(question.tones[1].name);
  }, question.instruments[0].duration(question.tones[0].name) + 1000);
}

// PLAY TONES SIMULTANEOUSLY
function playHarmonic(e) {
  e.preventDefault(); // prevent firing click+touch on mobile

  question.instruments[0].play(question.tones[0].name);
  question.instruments[secondInst].play(question.tones[1].name);
}

// MAKE QUESTION
function makeQuestion(e) {
  e.preventDefault(); // prevent firing click+touch on mobile

  // clean up + show flash message
  showFlash();
  answ.innerText = "";
  answTones.innerText = "";
  question = {
    tones: [],
    instruments: [],
  };

  // INSTRUMENTS
  if (pianoBox.checked) question.instruments.push(piano);
  if (bassoonBox.checked) question.instruments.push(bassoon);
  question.instruments.sort(() => Math.random() - Math.random());

  // TONES
  // shuffle array of notes
  const randomized = [...oneOctaveTones].sort(
    () => Math.random() - Math.random()
  );

  // pick first 2 objects, sort in ascending order
  const sorted = randomized.slice(0, 2).sort((a, b) => (a.id > b.id ? 1 : -1));

  question.tones = sorted;
  //console.log(question);

  // populate secondInst variable >> used in play functions to hook up second instrument if chosen
  secondInst = question.instruments.length - 1;

  // unleash the buttons
  [harmBtn, seqBtn, answBtn].forEach((btn) => (btn.disabled = false));
}

// flash message when new question is created
function showFlash() {
  flashMsg.style.display = "block";
  setTimeout(() => {
    flashMsg.style.display = "none";
  }, 1000);
}

/*
 ************************BACKUP***********************************
 */

//ques.innerText = `${tones[0].name}, ${tones[1].name}`;

// encode URI because of # character
// const tone1 = new Audio(`${encodeURIComponent(tones[0].sound)}`);
// const tone2 = new Audio(`${encodeURIComponent(tones[1].sound)}`);
// const arr = [tone1, tone2];

//console.log(piano.playing());

/************** TEST ****************/

// // we start preloading all the audio files
// for (let i in arr) {
//   preloadAudio(arr[i]);
// }

// function preloadAudio(a) {
//   // once this file loads, it will call loadedAudio()
//   // the file will be kept by the browser as cache
//   a.addEventListener('canplaythrough', loadedAudio, false);
// }

// let loaded = 0;

// function loadedAudio() {
//   // this will be called every time an audio file is loaded
//   // we keep track of the loaded files vs the requested files
//   loaded++;
//   if (loaded == arr.length) {
//     // all have loaded
//     init();
//   }
// }

// function init() {
//   console.log('all loaded');
//   arr.forEach((a) => a.play());
// }
