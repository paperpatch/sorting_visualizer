export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, animations);
  return animations;
}

function quickSortHelper (
  array,
  animations
) {
  if (array.length === 1) {
    return array;
  }

  const pivot = array[array.length - 1] // selects the last element of array for pivot
  const leftArray = [];
  const rightArray = [];

  for (let i =0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      animations.push(pivot, array[i]);
      animations.push(pivot, array[i]);
      leftArray.push(array[i]);
    } else {
      animations.push(pivot, array[i]);
      animations.push(pivot, array[i]);
      rightArray.push(array[i]);
    }
  }

  if (leftArray.length > 0 && rightArray.length > 0) {
    return [...quickSortHelper(leftArray), pivot, ...quickSortHelper(rightArray)];
  } else if (leftArray.length > 0 ) {
    return [...quickSortHelper(leftArray), pivot];
  } else { // the last condition being 'else if (rightArray.length > 0 )'
    return [pivot, ...quickSortHelper(rightArray)];
  }
}


/* Understanding quicksort

function quickSort (array) {
  if (array.length === 1) {
    return array;
  }

  const pivot = array[array.length - 1] // select the last one or whichever you choose from the array
  const leftArray = [];
  const rightArray = [];

  for (let i =0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      leftArray.push(array[i]);
    } else {
      rightArray.push(array[i]);
    }
  }

  if (leftArray.length > 0 && rightArray.length > 0) {
    return [...quickSort(leftArray), pivot, ...quickSort(rightArray)];
  } else if (leftArray.length > 0 ) {
    return [...quickSort(leftArray), pivot];
  } else { // the last condition being 'else if (rightArray.length > 0 )'
    return [pivot, ...quickSort(rightArray)];
  }
}
 */

