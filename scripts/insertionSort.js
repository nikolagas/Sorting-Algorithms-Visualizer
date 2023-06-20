import { delay, pauseFlag, updateGraph } from './utils.js';

export async function insertionSort(array, delayDuration) {
  const length = array.length;

  for (let i = 1; i < length; i++) {
    if (pauseFlag.paused) {
      await pauseFlag.promise;
    }

    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = key;

    updateGraph(array);

    await delay(delayDuration);

    if (pauseFlag.stopped) {
      return;
    }
  }

  return array;
}
