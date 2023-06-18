
export const colorfulPrint = (color, message) => {
  const reset = "\x1b[0m";
  console.log(color, message)
  console.log(reset);
}