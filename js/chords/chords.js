import { tonesData } from "../data2.js";

const seven = [3, 6, 9];
const maj7 = [3, 6, 10];
const mi7 = [2, 6, 9];

function makeSept(...args) {
  const first = tonesData[Math.floor(Math.random() * (tonesData.length / 2))]; // stay within 2 octaves

  const sept = [
    first.name,
    tonesData[first.id + args[0]].name, // id -1 >> counting array pos!
    tonesData[first.id + args[1]].name,
    tonesData[first.id + args[2]].name,
  ];

  return sept;
}

console.log(makeSept(...seven));
console.log(makeSept(...maj7));
console.log(makeSept(...mi7));
