export default function showScore(tone1, tone2, tone3 = 0, tone4 = 0) {
  const { Factory } = Vex.Flow;

  const vf = new Factory({
    renderer: { elementId: "output", width: 220, height: 160 },
  });

  const score = vf.EasyScore();
  const system = vf.System();

  system
    .addStave({
      voices: [
        tone3 !== 0 && tone4 !== 0
          ? score.voice(score.notes(`(${tone1} ${tone2} ${tone3} ${tone4} )/w`))
          : score.voice(score.notes(`(${tone1} ${tone2}  )/w`)),
      ],
    })
    .addClef("treble")
    .addTimeSignature("4/4");

  vf.draw();
}
