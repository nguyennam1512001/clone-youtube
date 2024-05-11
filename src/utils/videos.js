export function convertDuration(duration) {
  // Loại bỏ các ký tự không cần thiết
  if (duration) {
    duration = duration.replace('PT', '');

    // Tách phần giờ, phút và giây
    const hours = parseInt(duration.match(/\d+H/) || 0);
    const minutes = parseInt(duration.match(/\d+M/) || 0);
    const seconds = parseInt(duration.match(/\d+S/) || 0);

    // Chuyển đổi thành dạng hh:mm:ss
    let formattedDuration;
    if (hours > 0) {
      formattedDuration = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      formattedDuration = `${pad(minutes)}:${pad(seconds)}`;
    }

    return formattedDuration;
  }
}
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

export function convertViewCount(viewCount) {
  if (viewCount && viewCount >= 1000000000) {
    return (viewCount / 1000000000).toFixed(1) + ' Tỉ';
  } else if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + ' Tr';
  } else if (viewCount >= 10000) {
    return (viewCount / 1000).toFixed(0) + ' N';
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + 'N';
  } else {
    return viewCount;
  }
}

export function calculateTimeDifference(isoDateString) {
  const currentTime = new Date();
  const pastTime = new Date(isoDateString);

  const timeDifference = currentTime - pastTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Ước lượng số tháng
  const years = Math.floor(months / 12); // Ước lượng số năm

  if (years > 0) {
    return years + ' năm trước';
  } else if (months > 0) {
    return months + ' tháng trước';
  } else if (days > 0) {
    return days + ' ngày trước';
  } else if (hours > 0) {
    return hours + ' giờ trước';
  } else if (minutes > 0) {
    return minutes + ' phút trước';
  } else {
    return seconds + ' giây trước';
  }
}

// Danh sách các loại MIME được chấp nhận cho video
const videoMimeTypes = [
  'video/mp4',
  'video/quicktime', // MOV
  'video/ogg',
  'video/webm',
  'video/avi',
  'video/x-msvideo',
  'video/x-matroska', // MKV
  'video/mpeg',
  // Thêm các loại MIME video khác nếu cần
];

// Hàm tiện ích để kiểm tra xem tệp có phải là video không
export function isVideoFile(file) {
  if (!file) {
    return false; // Nếu không có tệp, trả về false
  }
  // Kiểm tra xem loại MIME có nằm trong danh sách video hay không
  return videoMimeTypes.includes(file.type);
}
