const SMALL_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "for",
  "nor",
  "or",
  "so",
  "yet",
  "as",
  "if",
  "than",
  "that",
  "till",
  "when",
  "once",
  "lest",
  "aboard",
  "about",
  "above",
  "across",
  "after",
  "against",
  "along",
  "amid",
  "among",
  "around",
  "as",
  "at",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "besides",
  "between",
  "beyond",
  "by",
  "despite",
  "down",
  "during",
  "except",
  "for",
  "from",
  "in",
  "inside",
  "into",
  "like",
  "near",
  "of",
  "off",
  "on",
  "onto",
  "out",
  "outside",
  "over",
  "past",
  "per",
  "plus",
  "round",
  "since",
  "than",
  "through",
  "throughout",
  "till",
  "to",
  "toward",
  "towards",
  "under",
  "underneath",
  "until",
  "unto",
  "up",
  "upon",
  "via",
  "with",
  "within",
  "without",
  "en",
  "et",
  "v",
  "v.",
  "vs",
  "vs.",
  "de",
  "da",
  "del",
  "della",
  "der",
  "di",
  "du",
  "la",
  "le",
  "van",
  "von",
]);

export function capitalizeTitle(title) {
  if (!title) return "";
  title = title.trim();
  if (title.length === 0) return "";

  const words = title.split(/\s+/);
  const lastIndex = words.length - 1;

  const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  return words
    .map((word, index) => {
      if (/[A-Z]/.test(word.slice(1))) {
        return word;
      }

      const normalized = word.toLowerCase();
      if (index !== 0 && index !== lastIndex && SMALL_WORDS.has(normalized)) {
        return normalized;
      }
      return capitalizeWord(word);
    })
    .join(" ");
}
