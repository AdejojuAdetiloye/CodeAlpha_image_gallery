

let expression = '';
let mode = 'deg';
const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');

function setMode(newMode) {
  mode = newMode;
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

function addToExpression(value) {
  expression += value;
  updateDisplay();
}

function addFunction(func) {
  expression += func;
  updateDisplay();
}

function addConstant(constant) {
  if (constant === 'pi') {
    expression += 'π';
  } else if (constant === 'e') {
    expression += 'e';
  }
  updateDisplay();
}

function updateDisplay() {
  expressionDisplay.textContent = expression || '';
  resultDisplay.classList.remove('error');
}

function clearAll() {
  expression = '';
  expressionDisplay.textContent = '';
  resultDisplay.textContent = '0';
  resultDisplay.classList.remove('error');
}

function backspace() {
  expression = expression.slice(0, -1);
  updateDisplay();
  if (!expression) {
    resultDisplay.textContent = '0';
  }
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function calculate() {
  if (!expression) return;

  try {
    let calcExpression = expression
      .replace(/π/g, Math.PI)
      .replace(/e(?!xp)/g, Math.E)
      .replace(/\^/g, '**');

    calcExpression = calcExpression.replace(/(\d+)!/g, (match, num) => {
      return factorial(parseFloat(num));
    });

    calcExpression = calcExpression.replace(/sin\(/g, mode === 'deg' ? 'Math.sin(toRadians(' : 'Math.sin(');
    calcExpression = calcExpression.replace(/cos\(/g, mode === 'deg' ? 'Math.cos(toRadians(' : 'Math.cos(');
    calcExpression = calcExpression.replace(/tan\(/g, mode === 'deg' ? 'Math.tan(toRadians(' : 'Math.tan(');

    calcExpression = calcExpression.replace(/asin\(/g, mode === 'deg' ? 'toDegrees(Math.asin(' : 'Math.asin(');
    calcExpression = calcExpression.replace(/acos\(/g, mode === 'deg' ? 'toDegrees(Math.acos(' : 'Math.acos(');
    calcExpression = calcExpression.replace(/atan\(/g, mode === 'deg' ? 'toDegrees(Math.atan(' : 'Math.atan(');

    calcExpression = calcExpression.replace(/sinh\(/g, 'Math.sinh(');
    calcExpression = calcExpression.replace(/cosh\(/g, 'Math.cosh(');
    calcExpression = calcExpression.replace(/tanh\(/g, 'Math.tanh(');

    calcExpression = calcExpression.replace(/log\(/g, 'Math.log10(');
    calcExpression = calcExpression.replace(/ln\(/g, 'Math.log(');
    calcExpression = calcExpression.replace(/sqrt\(/g, 'Math.sqrt(');
    calcExpression = calcExpression.replace(/abs\(/g, 'Math.abs(');
    calcExpression = calcExpression.replace(/exp\(/g, 'Math.exp(');

    if (mode === 'deg') {
      let openParens = (calcExpression.match(/toRadians\(/g) || []).length;
      let closeParens = (calcExpression.match(/\)/g) || []).length;
      for (let i = 0; i < openParens; i++) {
        calcExpression += ')';
      }
    }

    const result = eval(calcExpression);

    if (isNaN(result) || !isFinite(result)) {
      throw new Error('Invalid calculation');
    }

    const formattedResult = Number(result.toFixed(10)).toString();
    resultDisplay.textContent = formattedResult;
    expression = formattedResult;

  } catch (error) {
    resultDisplay.textContent = 'Error';
    resultDisplay.classList.add('error');
    expression = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9' || e.key === '.') {
    addToExpression(e.key);
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    addToExpression(e.key);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Escape') {
    clearAll();
  } else if (e.key === 'Backspace') {
    backspace();
  }
});
