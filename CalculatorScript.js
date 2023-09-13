const prevOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const resetBtn = document.querySelector("[data-reset]");
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");
let prevOperand = prevOperandText.innerText;
let currentOperand = currentOperandText.innerText;
let operation;

function reset() {
  prevOperand = "";
  currentOperand = "";
  prevOperandText.innerText = "";
  currentOperandText.innerText = "";
  operation = undefined;
}

function deleteOperand() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

function addNumber(number) {
if (number === "." && currentOperand.includes(".")) return;
currentOperand = currentOperand.toString() + number.toString();
}     

function operationSelection(operate) {
  if (currentOperand === "") return;
  if (prevOperand !== "") {
    calculationOperation();
  }
  operation = operate;
  prevOperand = currentOperand;
  currentOperand = "";
}

function calculationOperation() {
  let result;
  let prev = parseFloat(prevOperand);
  let curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
    default:
      return;
  }

  currentOperand = result;
  operation = undefined;
  prevOperand = "";
  prevOperandText.innerText = "";
}

function displayNum() {
  currentOperandText.innerText = currentOperand.toLocaleString("en");
  if (operation !== undefined) {
    prevOperandText.innerText = `${prevOperand} ${operation}`;
  } else {
    prevOperandText.innerText = prevOperand;
  }
}

resetBtn.addEventListener("click", () => {
  reset();
  displayNum();
});

deleteBtn.addEventListener("click", () => {
  deleteOperand();
  displayNum();
});

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    addNumber(operand.getAttribute("data-num"));
    displayNum();
  });
});

operatorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    operationSelection(btn.getAttribute("data-operator"));
    displayNum();
  });
});

resultBtn.addEventListener("click", () => {
  calculationOperation();
  displayNum();
});
