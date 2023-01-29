export const timeElapsed = (createdAt) => {
  const diffInMillis = Date.now() - createdAt * 1000;
  const years = diffInMillis / 31536000000;
  if (Math.floor(years)) {
    return `${Math.floor(years)} year${Math.floor(years) > 1 ? "s" : ""} ago |`;
  }
  const months = years * 12;
  if (Math.floor(months)) {
    return `${Math.floor(months)} month${
      Math.floor(months) > 1 ? "s" : ""
    } ago |`;
  }
  const days = months * 30;
  if (Math.floor(days)) {
    return `${Math.floor(days)} day${Math.floor(days) > 1 ? "s" : ""} ago |`;
  }
  const hours = days * 24;
  if (Math.floor(hours)) {
    return `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? "s" : ""} ago |`;
  }
  const minutes = hours * 60;
  if (Math.floor(minutes)) {
    return `${Math.floor(minutes)} minute${
      Math.floor(minutes) > 1 ? "s" : ""
    } ago |`;
  }
  const seconds = minutes * 60;
  if (Math.floor(seconds)) {
    return `${Math.floor(seconds)} second${
      Math.floor(seconds) > 1 ? "s" : ""
    } ago |`;
  }
};

export const parseComments = (data) => {
  return data.map((comment) => {
    return {
      author: comment.author,
      createdAt: new Date(comment.created_at_i * 1000),
      text: comment.text,
      replies: parseComments(comment.children),
    };
  });
};
