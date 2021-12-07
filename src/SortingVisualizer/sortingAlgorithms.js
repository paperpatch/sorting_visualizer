import React from 'react';

const NUMBER_OF_ARRY_BARS = 100;

const PRIMARY_COLOR = 'blue';
const SECONDARY_COLOR = 'red';

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
    for (let i = 0; i < NUMBER_OF_ARRY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {}

  quickSort() {}

  heapSort() {}

  bubbleSort() {}

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, index) => (
          <div
            className="array-bar"
            key={index}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
      </div>
    )
  }
}



// generate random number between 2 numbers in javascript
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}