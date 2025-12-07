const formattedTime = (timeZone: string) => {
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });
};

export default formattedTime;
