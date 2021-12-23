import { getScreenWidth } from "./helper";
import { mergeSort } from "../sortFunctions/mergeSort";
import { quickSort } from "../sortFunctions/quickSort";
import { selectionSort } from "../sortFunctions/selectionSort";
import { heapSort } from "../sortFunctions/heapSort.js";
import { insertionSort } from "../sortFunctions/insertionSort";
import { bubbleSort } from "../sortFunctions/bubbleSort";

// colors setting
export const comparisonColor = "pink";
export const swapColor = "yellow";
export const sortedColor = "springgreen";
export const pivotColor = "sandybrown";

// time setting
export let swapTime = 1000;
export let compareTime = 500;

// init array
export let sortingArray = initArrayForScreenSize();

export const sortingAlgorithms = [
  { component: mergeSort, title: "Merge", name: "Merge Sort" },
  { component: quickSort, title: "Quick", name: "Quick Sort" },
  { component: selectionSort, title: "Selection", name: "Selection Sort" },
  { component: heapSort, title: "Heap", name: "Heap Sort" },
  { component: insertionSort, title: "Insertion", name: "Insertion Sort" },
  { component: bubbleSort, title: "Bubble", name: "Bubble Sort" },
];

function initArrayForScreenSize() {
  const screenSize = getScreenWidth();
  if (screenSize < 460) return [4, 3, 2, 1];
  else if (screenSize < 720) return [8, 7, 6, 5, 4, 3, 2, 1];
  return [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
}