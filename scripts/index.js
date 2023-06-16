import { handleGenerateArray, startSorting, pauseSorting, resumeSorting, stopSorting } from './utils.js';


const generateArrayButton = document.getElementById('generate-array-btn');
generateArrayButton.addEventListener('click', handleGenerateArray);

const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startSorting);
  
const pauseButton = document.getElementById('pause-btn');
pauseButton.addEventListener('click', pauseSorting);

const resumeButton = document.getElementById('resume-btn');
resumeButton.addEventListener('click', resumeSorting);

const stopButton = document.getElementById('stop-btn');
stopButton.addEventListener('click', stopSorting);
