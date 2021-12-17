export function convertInputToArrayString(string) {
  string = string.replaceAll(/\s/g, ""); // replace any whitespace character
  string = string.replaceAll(/\d{4}/g, ""); // replace a digit that repeats 4 times
  string = string.replaceAll(/\s\s/g, " "); // replace 2 or more white space characters with 1 space
  string = string.replaceAll(/\s,/g, ","); // replace whitespace character and character ',' with comma.
  string = string.replaceAll(/,,/g, ","); // replace double commas or more with one comma.
  string = string.replaceAll(/[^0-9,\s]/g, ""); // replaces any single character not present in the list
  return string;
}

export function convertArrayStringToArray(string) {
  return string
    .split(",")
    .filter(x => x !== "")
    .map(x => +x);
}

export function getRandomArray(length = generateRandomNumberInRange(5, 30)) {
  return Array.from(new Array(length), () => generateRandomNumberInRange());
}

export function getScreenWidth() {
  return window.innerWidth;
}

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function generateRandomNumberInRange(lowerLimit = 0, upperLimit = 999) {
  return lowerLimit + Math.floor(Math.random() * upperLimit);
}