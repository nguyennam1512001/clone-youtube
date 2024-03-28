const text = 'Review Phim Cảm Ơn Vì Đã Để Anh Gặp Được Em 1-28 | Tóm Tắt Phim Meeting You | REVIEW PHIM HAY';

const findDuplicates = (text) => {
  const words = text.toLowerCase().split(' ');
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

const repeatedWordsString = findDuplicates(text);

export { findDuplicates };
