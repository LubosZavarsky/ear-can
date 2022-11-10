export default function getInterval(a, b) {
  const abs = Math.abs(a - b);

  switch (abs) {
    case 0:
      return 'Perfect unison';
    case 1:
      return 'Minor second';
    case 2:
      return 'Major second';
    case 3:
      return 'Minor third';
    case 4:
      return 'Major third';
    case 5:
      return 'Perfect fourth';
    case 6:
      return 'Tritone 👿';
    case 7:
      return 'Perfect fifth';
    case 8:
      return 'Minor sixth';
    case 9:
      return 'Major sixth';
    case 10:
      return 'Minor seventh';
    case 11:
      return 'Major seventh';
    case 12:
      return 'Perfect octave';
  }
}
