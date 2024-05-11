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

function extractHashtags(text) {
  // Tìm tất cả các từ bắt đầu bằng #
  const hashtagPattern = /#(\w+)/g;
  const hashtags = [];

  let match;
  if (text) {
    while ((match = hashtagPattern.exec(text)) !== null) {
      hashtags.push(match[1]); // Thêm từ vào danh sách và bỏ ký tự #
    }
    return hashtags.join(' '); // Nối các từ thành một chuỗi
  } else {
    return '';
  }
}

function extractTextAfterPipe(text) {
  // Tách chuỗi tại ký tự '|'
  const parts = text.split('|');
  if (parts.length > 1) {
    return parts[1].trim();
  } else {
    return '';
  }
}

function extractTextAfterDash(text) {
  // Tách chuỗi tại ký tự '-'
  const parts = text.split('-');

  if (parts.length > 1) {
    return parts[1].trim();
  } else {
    return '';
  }
}

function extractFirstThreeWords(str) {
  const words = str.trim().split(/\s+/);
  // Nếu chuỗi có ít hơn 3 từ, lấy toàn bộ mảng; nếu không, lấy ba từ đầu tiên.
  const firstFewWords = words.length <= 3 ? words : words.slice(0, 3);
  return firstFewWords.join(' ');
}

function getFileNameWithoutExtension(fileName) {
  // Tìm vị trí của dấu chấm cuối cùng
  const lastDotIndex = fileName.lastIndexOf('.');
  // Nếu không có dấu chấm, trả về tên gốc
  if (lastDotIndex === -1) return fileName;
  // Lấy chuỗi từ đầu đến ngay trước dấu chấm cuối cùng
  return fileName.substring(0, lastDotIndex);
}

function formatDate(String) {
  const date = new Date(String);

  // Lấy ngày, tháng, năm
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Chuyển sang định dạng ngày tháng năm (dd-mm-yyyy)
  const formattedDate = `${day.toString().padStart(2, '0')} thg ${month.toString().padStart(2, '0')}, ${year}`;

  return formattedDate;
}

export {
  findDuplicates,
  convertTextToAnchor,
  extractHashtags,
  extractTextAfterPipe,
  extractTextAfterDash,
  extractFirstThreeWords,
  getFileNameWithoutExtension,
  formatDate,
};
