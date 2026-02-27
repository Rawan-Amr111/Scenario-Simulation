const buttonStyle =
  " px-6 py-2 rounded-full text-gray-600 text-sm font-medium hover:text-gray-900 transition cursor-pointer";
const getBarColor = (val: number) => {
  if (val >= 70) return "#ef4444"; // Red
  if (val >= 40) return "#f59e0b"; // Yellow
  return "#10b981"; // Green
};
export { buttonStyle, getBarColor };
