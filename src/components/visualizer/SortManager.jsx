import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ArrayContainer } from "./ArrayContainer";
import { MergeContainer } from "./MergeContainer";
import { InfoFooter } from "./InfoFooter";
import { Timer } from "./Timer";
import Card from "@material-ui/core/Card";
import { delay } from "../../common/helper";
import shallow from "zustand/shallow";
import { useControls, useData } from "../../common/store";

let compareTime = useControls.getState().compareTime;
let swapTime = useControls.getState().swapTime;

useControls.subscribe(
  ([cTime, sTime]) => {
    compareTime = cTime;
    swapTime = sTime;
  },
  (state) => [state.compareTime, state.swapTime],
  shallow
);

const Container = styled(Card)`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

const AlgoHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
`;

const TimerDiv = styled.div`
  display: flex;
  column-gap: 5px;
  min-width: 8rem;
  justify-content: flex-end;
`;

export const SortManager = React.memo(function ({
  array,
  sortFunction,
  sortingAlgorithmName,
}) {
  const [swapIndices, setSwapIndices] = useState([-1, -1]);
  const [highlightedIndices, setHighlightedIndices] = useState([-1, -1]);

  const algoArray = useRef([]);
  const sortedIndices = useRef([]);
  const pivot = useRef(-1);
  const swapCount = useRef(0);
  const comparisonCount = useRef(0);
  const isAlgorithmOver = useRef(false);
  const isComponentUnMounted = useRef(false);

  const markSortingDone = useControls((state) => state.markSortingDone);
  const progress = useRef("");
  const sortProgressIterator = useRef(null);

  async function reset() {
    algoArray.current = [...useData.getState().sortingArray];
    sortedIndices.current = [];
    pivot.current = -1;
    swapCount.current = 0;
    comparisonCount.current = 0;
    isAlgorithmOver.current = false;
    setSwapIndices([-1, -1]);
    setHighlightedIndices([-1, -1]);

    sortProgressIterator.current =
      sortingAlgorithmName === "Merge Sort"
        ? await sortFunction(algoArray.current, combine, highlight, markSort)
        : await sortFunction(algoArray.current, swap, highlight, markSort);
  }

  useEffect(() => {
    progress.current = useControls.getState().progress;
    useControls.subscribe(
      (value) => {
        progress.current = value;
        
        if (progress.current === "start") runAlgo();
        if (progress.current === "reset") reset();
      },
      (state) => state.progress,
    );

    return () => {
      isComponentUnMounted.current = true;
    };
  }, []);

  useEffect(() => {
    reset();
  }, [array]);

  async function runAlgo() {
    let completion = { done: false };
    while (
      !completion?.done &&
      progress.current === "start" &&
      !isComponentUnMounted.current
    ) {
      completion = await sortProgressIterator.current?.next();
    }

    if (isComponentUnMounted.current) {
      return;
    }

    if (!isAlgorithmOver.current && completion?.done) {
      isAlgorithmOver.current = true;
      pivot.current = -1;
      setSwapIndices([-1, -1]);
      setHighlightedIndices([-1, -1]);
      markSortingDone();
    }
  }

  async function swap(i, j) {
    let temp = algoArray.current[i];
    algoArray.current[i] = algoArray.current[j];
    algoArray.current[j] = temp;
    setSwapIndices([i, j]);

    pivot.current = -1;
    swapCount.current += 1;
    await delay(swapTime);
  }

  async function combine(source, destination) {
    if (source !== destination) {
      swapCount.current += 1;
      setHighlightedIndices([-1, -1]);
      setSwapIndices([source, destination]);
      await delay(swapTime);
    }
  }

  async function highlight(indices, p) {
    setSwapIndices([-1, -1]);
    comparisonCount.current += 1;
    pivot.current = p;
    setHighlightedIndices(indices);
    await delay(compareTime);
  }

  function markSort(...indices) {
    sortedIndices.current.push(...indices);
  }

  const mergeContainer = (
    <MergeContainer 
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      highlightedIndices={highlightedIndices}
      sortedIndices={sortedIndices.current}
    />
  );
  const arrayContainer = (
    <ArrayContainer
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      pivot={pivot.current}
      highlightIndices={highlightedIndices}
      sortedIndices={sortedIndices.current}
    />
  );

  return (
    <Container>
      <AlgoHeaderBar>
        <strong>{sortingAlgorithmName}</strong>
        <TimerDiv>
          <span>Time:</span>
          <strong>
            <Timer 
              isAlgorithmOver={isAlgorithmOver.current}
            />
          </strong>
        </TimerDiv>
      </AlgoHeaderBar>
      {sortingAlgorithmName === "Merge Sort" ? mergeContainer : arrayContainer}
      <InfoFooter
        swapCount={swapCount.current}
        comparisonCount={comparisonCount.current}
      ></InfoFooter>
    </Container>
  );
});