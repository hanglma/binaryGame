// main.ts
import './style.css';

var decimalSlider = document.getElementById('decimal-slider') as HTMLInputElement;
decimalSlider.step = "1";
var sliderValueElement = document.getElementById('slider-value');
sliderValueElement!.innerHTML = decimalSlider.value;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize tab functionality
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      openTab(event, (event.currentTarget as HTMLElement).getAttribute('data-tab') || '');
    });
  });

  // Initialize the binary-to-decimal game
  const binaryDecimalButton = document.getElementById('check-binary-decimal-answer');
  if (binaryDecimalButton) {
    binaryDecimalButton.addEventListener('click', checkBinaryToDecimalAnswer);
  }

  // Initialize the decimal-to-binary game
  const decimalGameButton = document.getElementById('check-answer-button');
  if (decimalGameButton) {
    decimalGameButton.addEventListener('click', checkBinaryAnswer);
  }

  // Global event listener for arrow keys to control slider
  document.addEventListener('keydown', (event) => {
    if (decimalSlider && sliderValueElement) {
      if (event.key === 'ArrowLeft') {
        decimalSlider.stepDown();
        sliderValueElement.textContent = decimalSlider.value;
      } else if (event.key === 'ArrowRight') {
        decimalSlider.stepUp();
        sliderValueElement.textContent = decimalSlider.value;
      } else if (event.key === 'Enter'){
        checkBinaryAnswer();
        checkBinaryToDecimalAnswer();
      }
    }
  });
});

decimalSlider.oninput = function() {
  sliderValueElement!.innerHTML = decimalSlider.value;
}



function openTab(evt: Event, tabName: string) {
  const tabcontent = document.getElementsByClassName("tab-content") as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }
  const tablinks = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  document.getElementById(tabName)?.classList.add("active");
  (evt.currentTarget as HTMLElement).classList.add("active");

  if (tabName === 'game1') {
    generateBinaryToDecimalQuestion();
  } else if (tabName === 'game2') {
    generateDecimalToBinaryQuestion();
  }
}

let decimalNumber = 0;
let selectedCircles: number[] = [];

function generateDecimalToBinaryQuestion() {
  decimalNumber = Math.floor(Math.random() * 32); // Random number between 0 and 31
  const questionElement = document.getElementById('decimal-question');
  const circlesContainer = document.getElementById('binary-circles');
  const feedbackElement = document.getElementById('decimal-binary-feedback');

  if (questionElement && circlesContainer && feedbackElement) {
    questionElement.textContent = 'Convert ' + decimalNumber + ' to binary:';
    // feedbackElement.textContent = '';
    selectedCircles = Array(5).fill(0);
    circlesContainer.innerHTML = '';

    for (let i = 4; i >= 0; i--) {
      const circle = document.createElement('div');
      circle.className = 'circle';
      circle.setAttribute('data-index', i.toString());
      circle.addEventListener('click', () => toggleCircle(circle));
      circlesContainer.appendChild(circle);
    }
  }
}

function toggleCircle(circle: HTMLElement) {
  const index = circle.getAttribute('data-index');
  if (index !== null) {
    selectedCircles[+index] = 1 - selectedCircles[+index]; // Toggle between 0 and 1
    circle.classList.toggle('selected');
  }
}

function checkBinaryAnswer() {
  const feedbackElement = document.getElementById('decimal-binary-feedback');
  const binaryString = selectedCircles.reverse().join('');
  const binaryValue = parseInt(binaryString, 2);
  if (binaryValue === decimalNumber) {
    if (feedbackElement) {
      feedbackElement.textContent = 'Correct!';
      feedbackElement.className = 'correct';
    }
  } else {
    if (feedbackElement) {
      feedbackElement.textContent = `Incorrect. The correct answer is ${decimalNumber.toString(2)}`;
      feedbackElement.className = 'incorrect';
    }
  }
  generateDecimalToBinaryQuestion();
}

let binaryValueToConvert = '';

// function generateBinaryToDecimalQuestion() {
//   const binaryCirclesSvg = document.getElementById('binary-circles-svg');
//   const feedbackElement = document.getElementById('binary-decimal-feedback');
//   if (binaryCirclesSvg && feedbackElement) {
//     // feedbackElement.textContent = '';
//     binaryCirclesSvg.innerHTML = '';
//     binaryValueToConvert = (Math.floor(Math.random() * 32)).toString(2).padStart(5, '0');
//     binaryValueToConvert.split('').forEach((bit, index) => {
//       const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
//       circle.setAttribute('cx', (50 + index * 60).toString());
//       circle.setAttribute('cy', '50');
//       circle.setAttribute('r', '25');
//       circle.setAttribute('fill', bit === '1' ? 'green' : 'lightgrey');
//       binaryCirclesSvg.appendChild(circle);
//     });

//     const decimalSlider = document.getElementById('decimal-slider') as HTMLInputElement;
//     const sliderValueElement = document.getElementById('slider-value');
//     if (decimalSlider && sliderValueElement) {
//       decimalSlider.value = '0';
//       sliderValueElement.textContent = decimalSlider.value;
//     }
//   }
// }

function generateBinaryToDecimalQuestion() {
  const binaryCirclesSvg = document.getElementById('binary-circles-svg');
  const feedbackElement = document.getElementById('binary-decimal-feedback');
  if (binaryCirclesSvg && feedbackElement) {
    binaryCirclesSvg.innerHTML = '';
    binaryValueToConvert = (Math.floor(Math.random() * 32)).toString(2).padStart(5, '0');
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const svgWidth = 60 * binaryValueToConvert.length; // Calculate the width based on the number of circles
    binaryCirclesSvg.setAttribute('width', svgWidth.toString());
    binaryCirclesSvg.setAttribute('height', '100'); // Set the height of the SVG container

    binaryValueToConvert.split('').forEach((bit, index) => {
      const circle = document.createElementNS(svgNamespace, 'circle');
      circle.setAttribute('cx', (30 + index * 60).toString());
      circle.setAttribute('cy', '50');
      circle.setAttribute('r', '25');
      circle.setAttribute('fill', bit === '1' ? 'green' : 'lightgrey');
      binaryCirclesSvg.appendChild(circle);
    });

    const decimalSlider = document.getElementById('decimal-slider') as HTMLInputElement;
    const sliderValueElement = document.getElementById('slider-value');
    if (decimalSlider && sliderValueElement) {
      decimalSlider.value = '0';
      sliderValueElement.textContent = decimalSlider.value;
    }
  }
}

function checkBinaryToDecimalAnswer() {
  const decimalSlider = document.getElementById('decimal-slider') as HTMLInputElement;
  const feedbackElement = document.getElementById('binary-decimal-feedback');
  if (decimalSlider && feedbackElement) {
    const binaryValue = parseInt(binaryValueToConvert, 2);
    const sliderValue = parseInt(decimalSlider.value, 10);
    if (binaryValue === sliderValue) {
      feedbackElement.textContent = 'Correct!';
      feedbackElement.className = 'correct';
    } else {
      feedbackElement.textContent = `Incorrect. The correct answer is ${binaryValue}`;
      feedbackElement.className = 'incorrect';
    }
  }
  generateBinaryToDecimalQuestion();
}

