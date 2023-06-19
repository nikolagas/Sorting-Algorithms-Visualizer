import { handleGenerateArray, 
    startSorting, 
    pauseSorting, 
    resumeSorting, 
    stopSorting,
    enableControls
        } from './utils.js';


export const generateArrayButton = document.getElementById('generate-array-btn');
generateArrayButton.addEventListener('click', handleGenerateArray);

export const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startSorting);
  
export const pauseButton = document.getElementById('pause-btn');
pauseButton.addEventListener('click', pauseSorting);

export const resumeButton = document.getElementById('resume-btn');
resumeButton.addEventListener('click', resumeSorting);

export const stopButton = document.getElementById('stop-btn');
stopButton.addEventListener('click', stopSorting);

export const speedSlider = document.getElementById('speed-slider');
export const arraySizeSlider = document.getElementById('array-size-slider');
export const algorithmDropdown = document.getElementById('algorithm-select');


document.addEventListener('DOMContentLoaded', () => {
    handleGenerateArray();
    enableControls();
    });

