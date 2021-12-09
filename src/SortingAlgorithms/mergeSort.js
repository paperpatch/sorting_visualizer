export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let i = startIdx;
  let j = middleIdx + 1;
  let k = startIdx;
  while (i <= middleIdx && j <= endIdx) {
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
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

/* 
// Understanding Merge Sort

const mergeSort = array => {
  if (array.length === 1) return array;

  const middleIdx = Math.floor(array.length / 2);
  const firstHalf = mergeSort(array.slice(0, middleIdx));
  const secondHalf = mergeSort(array.slice(middleIdx));
  
  const sortedArray = [];

  let i = 0;
  let j = 0;

  // compare and check which number is bigger. push smaller number.
  while (i < firstHalf.length && j < secondHalf.length) {
    if (firstHalf[i] < secondHalf[j]) {
      sortedArray.push(firstHalf[i++])
    } else {
      sortedArray.push(secondHalf[j++]);
    }
  }
  // checks if all numbers in array were sorted. This happens when comparing odd number arrays. Ex: Compare [3, 5] and [4].
  // The leftover number tends to be the highest number pushed.
  while (i < firstHalf.length) {
    sortedArray.push(firstHalf[i]);
    i++;
    };
  while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);

  return sortedArray;
}

 */