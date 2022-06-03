const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null; // ilk girilen deger
let operator = null; // operator bilgisi
let waitingForSecondValue = false; // ikinci bilgiyi kontrol eder

// sayfa acildiginda ekran sifir gozukmesi lazim. asagidaki fonksiyon bunu yapiyor.
updateDisplay();

function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", function (e) {
  const element = e.target;

  if (!element.matches("button")) return; // eger tiklanan yer button degilse bu satirdan sonraki kodlari calistirma. return bunu sagliyor

  if (element.classList.contains("operator")) {
    console.log("operator", element.value);
    handelOperator(element.value);
    updateDisplay();
    return;
  }

  if (element.classList.contains("decimal")) {
    console.log("decimal", element.value);
    inputDecimal();
    updateDisplay();
    return;
  }

  if (element.classList.contains("clear")) {
    console.log("clear", element.value);
    clear();
    updateDisplay();
    return;
  }

  //   console.log("number", element.value);

  // elementlerin value degeri display kismina yazdirilacak
  inputNumber(element.value);
  updateDisplay();
});

function handelOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue == null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
  }
  waitingForSecondValue = true;
  operator = nextOperator;

  console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
  return second;
}

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }

  console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function clear() {
  displayValue = "0";
}
