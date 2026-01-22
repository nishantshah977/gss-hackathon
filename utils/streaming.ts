export const simulateStreaming = (
  text: string,
  callback: (s: string | null) => void,
  delay = 35,
) => {
  let index = 0;
  const chunks = text.split(" ");
  const interval = setInterval(() => {
    if (index < chunks.length) {
      callback(chunks.slice(0, index + 1).join(" "));
      index++;
    } else {
      clearInterval(interval);
      callback(null);
    }
  }, delay);
};
