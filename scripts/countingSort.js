import { delay, pauseFlag } from './utils.js';


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
            // Wait until sorting is unpaused
            await pauseFlag.promise;
        }
        
    array[sortedIndex] = i;
    sortedIndex++;
    count[i - min]--;

    updateGraph(array);

    await delay(delayDuration);

    if (pauseFlag.stopped) {
        return; // Exit the function if sorting is stopped
        }
    }
}
    return Promise.resolve();
}

function updateGraph(array) {
    const graph = document.getElementById('graph');
    graph.innerHTML = '';
  
    if (pauseFlag.stopped) {
      return;
    }
  
    array.forEach(height => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${height}%`;
      graph.appendChild(bar);
    });
  }
  