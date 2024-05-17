// app.ts

// Helper function to generate a random binary number
function getRandomBinary(length: number): string {
  let binary = '';
  for (let i = 0; i < length; i++) {
      binary += Math.round(Math.random()).toString();
  }
  return binary;
}

// Helper function to convert binary to decimal
function binaryToDecimal(binary: string): number {
  return parseInt(binary, 2);
}

// Render binary circles
function renderBinaryCircles(binary: string) {
  const binaryContainer = document.getElementById('binary-container')!;
  binaryContainer.innerHTML = ''; // Clear previous circles

  for (const bit of binary) {
      const circle = document.createElement('div');
      circle.className = 'circle';
      if (bit === '1') {
          circle.classList.add('active');
      }
      binaryContainer.appendChild(circle);
  }
}

// Update slider value display
function updateSliderValue(value: number) {
  const decimalValueSpan = document.getElementById('decimal-value')!;
  decimalValueSpan.textContent = value.toString();
}

// Check the user's answer
function checkAnswer(binary: string, userDecimal: number) {
  const correctDecimal = binaryToDecimal(binary);
  const result = document.getElementById('result')!;

  if (userDecimal === correctDecimal) {
      result.textContent = 'Correct!';
      result.style.color = 'green';
  } else {
      result.textContent = `Incorrect. The correct answer was ${correctDecimal}.`;
      result.style.color = 'red';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const binaryLength = 6; // Length of the binary number
  let binary = getRandomBinary(binaryLength);
  renderBinaryCircles(binary);

  const slider = document.getElementById('decimal-slider') as HTMLInputElement;
  slider.addEventListener('input', () => {
      updateSliderValue(Number(slider.value));
  });

  // Add keyboard control for the slider
  document.addEventListener('keydown', (event) => {
      let currentValue = Number(slider.value);
      if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
          if (currentValue < 63) {
              slider.value = (currentValue + 1).toString();
              updateSliderValue(currentValue + 1);
          }
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
          if (currentValue > 0) {
              slider.value = (currentValue - 1).toString();
              updateSliderValue(currentValue - 1);
          }
      } else if (event.key === "Enter"){
        checkAnswer(binary, Number(slider.value));
        // Generate a new binary number for the next round
        binary = getRandomBinary(binaryLength);
        renderBinaryCircles(binary);
      }
  });

  const checkButton = document.getElementById('check-answer')!;
  checkButton.addEventListener('click', () => {
      checkAnswer(binary, Number(slider.value));
      // Generate a new binary number for the next round
      binary = getRandomBinary(binaryLength);
      renderBinaryCircles(binary);
  });
});
