import { delay, pauseFlag, displayGraph, updateGraph } from './utils.js';

export async function quickSort(array, delayDuration) {
    await quickSortHelper(array, 0, array.length - 1, delayDuration);

    displayGraph(array);
  
    return array;
  }

  async function quickSortHelper(array, low, high, delayDuration) {
    if (low < high && !pauseFlag.stopped) {
      const pivotIndex = await partition(array, low, high, delayDuration);
      await quickSortHelper(array, low, pivotIndex - 1, delayDuration);
      await quickSortHelper(array, pivotIndex + 1, high, delayDuration);
    }
  }
  
  async function partition(array, low, high, delayDuration) {
    const pivot = array[high];
    let i = low - 1;
  
    for (let j = low; j <= high - 1; j++) {
      if (pauseFlag.paused) {
        await pauseFlag.promise;
      }
  
      if (array[j] < pivot) {
        i++;
        swap(array, i, j);
        updateGraph(array);
        await delay(delayDuration);
      }
    }
  
    swap(array, i + 1, high);
    updateGraph(array);
    await delay(delayDuration);
  
    return i + 1;
  }
  
  function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }