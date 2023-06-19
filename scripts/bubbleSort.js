import { delay, pauseFlag } from './utils.js';
  
  export async function bubbleSort(array, delayDuration) {
    const length = array.length;
  
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (pauseFlag.paused) {
          // Wait until sorting is unpaused
          await pauseFlag.promise;
        }
  
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
  
          updateGraph(array);
  
          await delay(delayDuration);
  
          if (pauseFlag.stopped) {
            return; // Exit the function if sorting is stopped
          }
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
  
  