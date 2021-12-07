export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIndex,
  endIndex,
  auxiliaryArray,
  animations,
) {
  if (startIndex === endIndex) return;
  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSortHelper(auxiliaryArray, startIndex, middleIndex, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIndex + 1, endIndex, mainArray, animations);
  doMerge(mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIndex,
  middleIndex,
  endIndex,
  auxiliaryArray,
  animations,
) {
  let i = startIndex;
  let j = middleIndex + 1;
  let k = startIndex;
  while (startIndex <= middleIndex && j <= endIndex) {
    // compare values. push once to change color
    animations.push([i, j]);
    // push second time to revert colors
    animations.push([i, j]);

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // overwrite value at index k in original array i
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // overwrite value at index k in original array with index j in auxiliary array
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIndex) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}