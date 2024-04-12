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

// convert Text To Anchor & tags
function convertTextToAnchor(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  let formattedText = text.replace(urlRegex, (match) => {
    return `<div><a href="${match}"><div style="color: inherit">/${match}</div></a></div>`;
  });
  const tagRegex = /#(\w+)/g;
  formattedText = formattedText.replace(tagRegex, `<span class="tags">#$1</span>`);

  return formattedText;
}

export { findDuplicates, convertTextToAnchor };
