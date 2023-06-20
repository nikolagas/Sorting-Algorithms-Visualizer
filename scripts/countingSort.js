import { delay, pauseFlag, updateGraph } from './utils.js';

export async function countingSort(array, delayDuration) {
    const min = Math.min(...array);
    const max = Math.max(...array);
    const count = new Array(max - min + 1).fill(0);

    for (let i = 0; i < array.length; i++) {
        count[array[i] - min]++;
    }

    let sortedIndex = 0;

    for (let i = min; i <= max; i++) {
        while (count[i - min] > 0) {
        if (pauseFlag.paused) {
            await pauseFlag.promise;
        }
        
    array[sortedIndex] = i;
    sortedIndex++;
    count[i - min]--;

    updateGraph(array);

    await delay(delayDuration);

    if (pauseFlag.stopped) {
        return;
        }
    }
}
    return array;
}
