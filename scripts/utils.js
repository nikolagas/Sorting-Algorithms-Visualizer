import { bubbleSort } from './bubbleSort.js';
import { countingSort } from './countingSort.js';
import { heapSort } from './heapSort.js';
import { generateArrayButton,
  startButton,
  pauseButton,
  stopButton,
  resumeButton,
  speedSlider,
  arraySizeSlider,
  algorithmDropdown } from './index.js';

export let pauseFlag = { paused: false, promise: null, stopped: false };
let randomArray = [];
let isSorting = false;

const sortingFunctions = {
  'bubble-sort': bubbleSort,
  'counting-sort': countingSort,
  'heap-sort': heapSort,
};

export function generateRandomArray(size) {
    randomArray = [];
    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      randomArray.push(randomNumber);
    }
    return randomArray;
  }
    
export function clearGraph() {
    const graph = document.getElementById('graph');
    graph.innerHTML = '';
  }
  
export function visualizeArray(array) {
    const graph = document.getElementById('graph');
    clearGraph();
  
    array.forEach(height => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${height}%`;
      graph.appendChild(bar);
    });
  }

export function handleGenerateArray() {
    startButton.disabled = false;
    const size = arraySizeSlider.value;
    randomArray = generateRandomArray(size);
    visualizeArray(randomArray);
    
    console.log('Generated Array:', randomArray);
  }
  
export async function startSorting() {
    const selectedAlgorithm = algorithmDropdown.value;
    
    if (isSorting) {
      return; // Return early if sorting is already in progress
    }
  
    isSorting = true;
  
    const delayDuration = 10 * (11 - speedSlider.value);
  
    pauseFlag = { paused: false, promise: null, stopped: false };
  
    disableControls();
  
    try {
      const sortingFunction = sortingFunctions[selectedAlgorithm];
      await sortingFunction(randomArray, delayDuration, pauseFlag);
      console.log('Successful sorting');
    } catch (error) {
      console.error('Error occurred during sorting:', error);
    } finally {
      enableControls();
      startButton.disabled = true;
      isSorting = false; // Set isSorting to false after sorting is finished
    }
  }
  
export function pauseSorting() {
    if (!pauseFlag.paused) {
      pauseFlag.paused = true;
      pauseFlag.promise = new Promise(resolve => (pauseFlag.resolve = resolve));
      pauseButton.disabled = true;
      resumeButton.disabled = false;
    }
  }
  
export function resumeSorting() {
    pauseFlag.paused = false;
    pauseButton.disabled = false;
    resumeButton.disabled = true;
    pauseFlag.resolve();
  }

export function emptyArray() {
  randomArray.length = 0;
}
  
export function stopSorting() {
    pauseFlag.stopped = true;
    isSorting = false;
    clearGraph();
    emptyArray();
    enableControls();
    startButton.disabled = true;
  }
  
export function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
  }

export function disableControls() {
  generateArrayButton.disabled = true;
  startButton.disabled = true;
  pauseButton.disabled = false;
  resumeButton.disabled = true;
  stopButton.disabled = false;
  speedSlider.disabled = true;
  arraySizeSlider.disabled = true;
  algorithmDropdown.disabled = true;
}

export function enableControls() {
  generateArrayButton.disabled = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  resumeButton.disabled = true;
  stopButton.disabled = true;
  speedSlider.disabled = false;
  arraySizeSlider.disabled = false;
  algorithmDropdown.disabled = false;
}
