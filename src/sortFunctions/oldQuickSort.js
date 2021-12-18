import { changeColor, resetColor, swap, compare } from '../components/visualizer/sortingVisualizer'

const BLUE = 'blue';
const RED = 'red';
const GREEN = 'green';
let running = false;

export function getQuickSortAnimations(array) {
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1);
}

function quickSortHelper(
  array,
  left,
  right,
) {
  if (left < right) {
    let pivot = left;
    changeColor(pivot, RED);
    let i = left;
    let j = right;
    changeColor(j, BLUE);

    while (i < j) {
      if (!running) return;
      while (compare(pivot, i) && i< j) {
        resetColor(i);
        i++;
        changeColor(i, GREEN);
      }
      while (!compare(pivot, j)) {
        resetColor(j);
        j--;
        changeColor(j, BLUE);
      }
      changeColor(pivot, RED);
      if (i < j) {
        swap(i, j);
      }
    }
    swap(pivot, j);
    resetColor(i);
    resetColor(j);
    resetColor(pivot);
    getQuickSortAnimations(array, left, j-1);
    getQuickSortAnimations(array, j + 1, right);
  };
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

