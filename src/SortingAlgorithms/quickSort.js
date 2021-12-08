export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  quickSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function quickSortHelper(
  mainArray,
  startIdx, // left
  endIdx, // right
  auxiliaryArray,
  animations,
) {
  let i = startIdx;
  let j = endIdx - 1;
  let size = endIdx - startIdx;

  if (size > 1) {
    let pivot = mainArray[Math.floor(Math.random() % size + 1)];
    while (i < j) {
      while (mainArray[i] > pivot && j > 1) {
        j--;
      }
      while(mainArray[i] < pivot && i <= j) {
        i++;
      }
      if (i < j) {
        swap(mainArray[i], mainArray[j]);
        i++;
      }
      if (i < j) {
        swap(mainArray[i], mainArray[j]);
        j++;
      }
    }
    quickSortHelper(mainArray, startIdx, i);
    quickSortHelper(mainArray, j, right);
  }
}