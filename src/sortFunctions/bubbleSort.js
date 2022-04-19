export async function* bubbleSort(array, swap, highlight, marksort) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      yield await highlight([j, j + 1]);

      if (array[j] > array[j + 1]) {
        yield await swap(j, j + 1);
      }
    }

    marksort(i);
    yield;
  }
}

/*
// Understanding Bubble Sort

const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      // compare arr[j] to arr[j+1]
      // swap places if needed
    }
  }

  return arr;
};

// Alternative Approach

const bubbleSort = (arr) => {
  let sorted = false;

  while (!sorted) {
    sorted = true;

    for (let i = 0; i < arr.length - 1; i++) {
      // compare arr[i] to arr[i+1]
      // swap places if needed
      // if swapped, set sorted = false to run while loop again
    }
  }

  return arr;
};

*/