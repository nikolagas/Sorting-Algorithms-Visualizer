import { delay, pauseFlag } from './utils.js';

export async function heapSort(array, delayDuration) {
  const length = array.length;

  // Build the max heap
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    await heapify(array, length, i, delayDuration);
  }

  // Extract elements from the heap one by one
  for (let i = length - 1; i > 0; i--) {
    if (pauseFlag.paused) {
      await pauseFlag.promise;
    }

    // Move the current root (max element) to the end
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    updateGraph(array);

    await delay(delayDuration);

    if (pauseFlag.stopped) {
      return;
    }

    // Heapify the reduced heap
    await heapify(array, i, 0, delayDuration);
  }

  return Promise.resolve();
}

async function heapify(array, length, root, delayDuration) {
  let largest = root;
  const left = 2 * root + 1;
  const right = 2 * root + 2;

  if (left < length && array[left] > array[largest]) {
    largest = left;
  }

  if (right < length && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== root) {
    // Swap the largest element with the root
    const temp = array[root];
    array[root] = array[largest];
    array[largest] = temp;

    updateGraph(array);

    await delay(delayDuration);

    if (pauseFlag.stopped) {
      return;
    }

    // Recursively heapify the affected sub-tree
    await heapify(array, length, largest, delayDuration);
  }
}

function updateGraph(array) {
    const graph = document.getElementById('graph');
    graph.innerHTML = '';
  
    if (pauseFlag.stopped) {
      return; // Skip creating bars if we clear the graph
    }
  
    array.forEach(height => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${height}%`;
      graph.appendChild(bar);
    });
  }
  
