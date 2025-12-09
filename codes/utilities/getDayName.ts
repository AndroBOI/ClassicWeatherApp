const getDayName = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-us", {
    weekday: "long",
  });
};

export default getDayName;
