let current = '0';
let previous = '';
let operator = null;
let shouldReset = false;

const currentEl = document.getElementById('current');
const previousEl = document.getElementById('previous');

function updateDisplay() {
  currentEl.textContent = current;
  previousEl.textContent = previous;
}

function appendNumber(num) {
  if (current === '0' && num !== '.') current = '';
  if (num === '.' && current.includes('.')) return;
  if (shouldReset) { current = ''; shouldReset = false; }
  if (current.length > 10) return;
  current += num;
  if (current === '') current = '0';
  updateDisplay();
}

function appendOperator(op) {
  if (operator && !shouldReset) calculate();
  previous = current + ' ' + op;
  operator = op;
  shouldReset = true;
  updateDisplay();
}

function calculate() {
  if (!operator || shouldReset) return;
  let a = parseFloat(previous);
  let b = parseFloat(current);
  let result;
  if (operator === '+') result = a + b;
  if (operator === '-') result = a - b;
  if (operator === '*') result = a * b;
  if (operator === '/') {
    if (b === 0) { current = 'Error'; previous = ''; operator = null; updateDisplay(); return; }
    result = a / b;
  }
  if (operator === '%') result = a % b;
  current = String(Math.round(result * 1000000) / 1000000);
  previous = '';
  operator = null;
  shouldReset = true;
  updateDisplay();
}

function clearAll() {
  current = '0'; previous = ''; operator = null; updateDisplay();
}

function deleteLast() {
  if (shouldReset) return;
  current = current.slice(0, -1) || '0';
  updateDisplay();
}

document.addEventListener('keydown', e => {
  if (!isNaN(e.key)) appendNumber(e.key);
  if (e.key === '.') appendNumber('.');
  if (['+','-','*','/','%'].includes(e.key)) appendOperator(e.key);
  if (e.key === 'Enter' || e.key === '=') calculate();
  if (e.key === 'Backspace') deleteLast();
  if (e.key === 'Escape') clearAll();
});

updateDisplay();
