export default function CapitalizeTitle({ str }) {
  const smallWords = [
    'a',
    'an',
    'the',
    'and',
    'but',
    'for',
    'nor',
    'or',
    'so',
    'yet',
    'at',
    'by',
    'for',
    'in',
    'of',
    'on',
    'to',
    'up',
    'with',
  ];

  const capitalizedTitle = str
    .split(' ')
    .map((word, index, words) => {
      if (index === 0 || index === words.length - 1 || !smallWords.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      return word.toLowerCase();
    })
    .join(' ');

  return capitalizedTitle;
}
