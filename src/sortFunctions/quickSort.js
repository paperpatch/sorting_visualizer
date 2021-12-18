export async function* quickSort(
  array,
  swap,
  highlight,
  markSort,
  low = 0,
  high = array.length - 1
) {

  if (low <= high) {
    let pivot = yield* await partition(array, low, high);
    yield* await quickSort(array, swap, highlight, markSort, low, pivot - 1);
    yield* await quickSort(array, swap, highlight, markSort, pivot + 1, high);
  }

  async function* partition(array, low, high) {
    let pivot = low;
    let i = low;
    let j = high + 1;

    while (i < j) {

      while (--j > low) {
        yield await highlight([i, j], pivot);
        if (array[j] < array[pivot]) {
          break;
        }
      }

      while (i <= high && i < j) {
        yield await highlight([i], pivot);
        if (array[++i] > array[pivot]) {
          break;
        }
      }

      if (i < j) {
        yield await swap(i, j);
      }
    }

    if (pivot !== j) {
      yield await swap(pivot, j);
    }

    markSort(j);
    yield;
    return j;
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