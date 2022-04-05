const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    calculatorDisplay.textContent === "0" ? calculatorDisplay.textContent = number : calculatorDisplay.textContent += number;
  }
}

function addDecimal() {
  if(awaitingNextValue) return;
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
  }
}

// Calculate first and Seoncd Values depending on operator 
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => firstNumber = secondNumber,
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent Multiple Operators 
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return 
  }
  // Assign firstVal if no value
  if (!firstValue) {
    firstValue = currentValue
  } else {
    const calculaton = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculaton
    firstValue = calculaton
  }
  // Ready for next value, store operator
  awaitingNextValue = true
  operatorValue = operator;
  
}

// add event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// Reset Display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click', resetAll)