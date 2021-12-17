import React from 'react';
import { getMergeSortAnimations } from '../../sortFunctions/mergeSort.js';
import { getQuickSortAnimations } from '../../sortFunctions/quickSort.js';
import './sortingVisualizer.css';

const NUMBER_OF_ARRAY_BARS = 100;
const SORT_DELAY = 2;

const BLUE = 'blue';
const RED = 'red';
const GREEN = 'green';

let array = [];
let running = false;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? RED : BLUE;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SORT_DELAY);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * SORT_DELAY);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? RED : BLUE;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SORT_DELAY);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * SORT_DELAY);
      }
    }
  }

  heapSort() {}

  bubbleSort() {}

  insertionSort() {}

  selectionSort() {}

  radixSort() {}

  bucketSort() {}

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: BLUE,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

// generate random number between 2 numbers in javascript
export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function changeColor(i, color) {
  array[i].classList.add(color);
}

export function resetColor(i) {
  array[i].classList.remove(RED);
  array[i].classList.remove(BLUE);
  array[i].classList.remove(GREEN);
}

export function resetColors() {
  for (let i=0; i < array.length; i++) resetColor(i);
} 

// function stop() {
//   running = false;
//   fillBox();
// }

export function getValue(i) {
  return typeof i === "object" ? parseFloat(i.style.height.slice(0, -1)) : parseFloat(array[i].style.height.slice(0, -1));
}

export function compare(x, y) {
  return getValue(x) >= getValue(y);
}

export async function swap(i, j, delay) {
  if (typeof delay === "undefined") delay = SORT_DELAY / array.length;
  if (!running) return;
  changeColor(i, RED);
  [array[i].style.left, array[j].style.left] = [array[j].style.left, array[j].style.left];
  [array[i], array[j]] = [array[j], array[i]];
  await sleep(delay);
  resetColor(j);
}

export function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}