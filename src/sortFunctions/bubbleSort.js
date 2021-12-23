export async function* bubbleSort(array, swap, highlight, marksort) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      yield await highlight([j, j + 1]);

      if (array[j] > array[j + 1]) {
        yield await swap(j, j + 1);
      }
    }

    marksort(j);
    yield;
  }
}