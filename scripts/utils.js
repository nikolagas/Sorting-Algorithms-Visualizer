import { bubbleSort } from './bubbleSort.js';
import { countingSort } from './countingSort.js';

let randomArray = [];
let pauseFlag = { paused: false, promise: null, stopped: false };
let isSorting = false; // Flag to track sorting state

export function generateRandomArray(size) {
    randomArray = [];
    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
      randomArray.push(randomNumber);
    }
    return randomArray;
  }
    
  // Clear the graph before sorting
export function clearGraph() {
    const graph = document.getElementById('graph');
    graph.innerHTML = '';
  }
  
  // Visualize the array on the graph
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

  // Function to handle the "Generate New Array" button click
export function handleGenerateArray() {
    const arraySizeSlider = document.getElementById('array-size-slider');
    const size = arraySizeSlider.value;
    randomArray = generateRandomArray(size);
    visualizeArray(randomArray);
    
    console.log('Generated Array:', randomArray);
  }
  
export async function startSorting() {
    const algorithmDropdown = document.getElementById('algorithm-select');
    const selectedAlgorithm = algorithmDropdown.value;
    
    if (isSorting) {
      return; // Return early if sorting is already in progress
    }
  
    isSorting = true;
  
    const speedSlider = document.getElementById('speed-slider');
    const delayDuration = 10 * (11 - speedSlider.value);
  
    pauseFlag = { paused: false, promise: null, stopped: false };
  
    switch (selectedAlgorithm) {
      case 'bubble-sort':
        bubbleSort(randomArray, delayDuration, pauseFlag)
          .then(sortedArray => {
            visualizeArray(sortedArray);
          })
          .catch(error => {
            console.error('Error occurred during sorting:', error);
          });
        break;
      case 'counting-sort':
        countingSort(randomArray, delayDuration, pauseFlag)
          .then(sortedArray => {
            visualizeArray(sortedArray);
          })
          .catch(error => {
            console.error('Error occurred during sorting:', error);
          });
        break;
      // Add cases for other sorting algorithms as needed
      default:
        console.error('Invalid sorting algorithm');
        break;
    }
  }
  
export function pauseSorting() {
    if (!pauseFlag.paused) {
      pauseFlag.paused = true;
      pauseFlag.promise = new Promise(resolve => (pauseFlag.resolve = resolve));
    }
  }
  
export function resumeSorting() {
    pauseFlag.paused = false;
    pauseFlag.resolve();
  }
  
export function stopSorting() {
    pauseFlag.stopped = true;
    isSorting = false;
    clearGraph();
  }
  
export function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
  }
  