// tìm từ lặp lại trong 1 câu
const findDuplicates = (string) => {
  const words = string.toLowerCase().split(' ');
  const duplicates = {};

  words.forEach((word) => {
    if (!duplicates[word]) {
      duplicates[word] = 1;
    } else {
      duplicates[word]++;
    }
  });

  const repeatedWords = Object.keys(duplicates).filter((word) => duplicates[word] > 1);
  return repeatedWords.join(' ');
};

export { findDuplicates };
