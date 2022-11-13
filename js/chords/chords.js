import { tonesData } from "../data.js";
import showScore from "../showScore.js";

// const dom7 = { name: 'Dominant 7', tones: [3, 6, 9] };
// const maj7 = { name: 'Major 7', tones: [3, 6, 10] };
// const mi7 = { name: 'Minor 7', tones: [2, 6, 9] };

const chords = [
  { name: "Dominant 7", tones: [3, 6, 9] },
  { name: "Major 7", tones: [3, 6, 10] },
  { name: "Minor 7", tones: [2, 6, 9] },
];

function makeSept(args) {
  const rootTone =
    tonesData[Math.floor(Math.random() * (tonesData.length / 2))]; // stay within 2 octaves

  const sept = {
    name: `${rootTone.name} ${args.name}`,
    tones: [
      rootTone.name,
      tonesData[rootTone.id + args.tones[0]].name, // id -1 >> counting array pos!
      tonesData[rootTone.id + args.tones[1]].name,
      tonesData[rootTone.id + args.tones[2]].name,
    ],
  };

  return sept;
}

// console.log(makeSept(dom7));
// console.log(makeSept(maj7));
// console.log(makeSept(mi7));

/*------------------------------------TEST------------------------------------------------------------*/

const chordBtn = document.querySelector("#chordBtn");
const showChord = document.querySelector("#showChord");
const answTones = document.querySelector("#answ-tones");
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const scoreContainer = document.querySelector("#output");

let question;

// ALL BTNS DISABLED BY DEFAULT >> moved to HTML
//chordBtn.disabled = true;

// DISABLE BTN IF NO CHECKBOX CHECKED
checkBoxes.forEach((c) => {
  c.addEventListener("change", () => {
    if (
      document.querySelectorAll('input[type="checkbox"]:checked').length === 0
    ) {
      chordBtn.disabled = true;
      showChord.innerText = "";
      answTones.innerText = "";
    } else {
      chordBtn.disabled = false;
    }
  });
});

// MAKE RANDOM CHORD ON CLICK 🤔
chordBtn.addEventListener("click", () => {
  // reset
  scoreContainer.innerHTML = "";

  const checkedTypes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  let tempTypes = [];

  checkedTypes.forEach((t) => {
    tempTypes.push(t.value);
  });

  // filter chord list based on checked boxes
  const filtered = chords.filter((ch) => tempTypes.includes(ch.name));

  // choose random item from filtered array
  const random = filtered[Math.floor(Math.random() * filtered.length)];

  //console.log(filtered);
  //console.log(filtered[random]);

  question = makeSept(random); // ❗❗❗❗❗

  showChord.innerText = question.name;
  answTones.innerText = question.tones;

  // show score
  const tone1 = question.tones[0].toUpperCase();
  const tone2 = question.tones[1].toUpperCase();
  const tone3 = question.tones[2].toUpperCase();
  const tone4 = question.tones[3].toUpperCase();
  showScore(tone1, tone2, tone3, tone4);
});
