"use strict";

//WHAT TO DO NEXT / FIXES
//CHAGNE THE SIGN IF THE USER DECIDES TO!

//MATH SINGS ELEMENTS
const mathSigns = document.querySelectorAll(`#sign`);
//OTHER CALCULATOR ELEMENTS
const clearAllElement = document.getElementById(`clear-all`);
const eraseElement = document.getElementById(`erase`);
const deleteOneElement = document.getElementById(`back`);
const equalElement = document.getElementById(`equal`);
//DISPLAY ELEMENTS
const upperDisplayElement = document.getElementById(`display-operation`);
const outputElement = document.getElementById(`display`);
//CALCULATOR NUMBERS (0-9)
const numbers = document.querySelectorAll(`#number`);

//Calculator values
let actualValue = "";
let lastValue = "";
let operationResult = "";
let lastSignValue = "";

//Checkers
let invalidExpression = false;
let calculationNumber = true; //checks if it is the first calculation

//START OPERATIONS
upperDisplayElement.classList.add(`hidden`);

//crate number
numbers.forEach((number) => {
  number.addEventListener(`click`, function () {
    //check for invalid expresion
    if (invalidExpression) {
      resetValues();
      invalidExpression = false;
    }
    //crate the number
    actualValue += number.value;
    if (actualValue === `0${number.value}`) actualValue = `${number.value}`;
    outputElement.value = actualValue;
  });
});

//Process Signs
mathSigns.forEach((sign) => {
  sign.addEventListener(`click`, function () {
    //Update the value of the calculation BAR
    upperDisplayElement.classList.remove(`hidden`);

    //check for the first calculation
    if (calculationNumber) {
      //make the expression valid so the program can work after equal sign
      invalidExpression = false;
      lastValue = Number(actualValue);
      upperDisplayElement.value = `${actualValue} ${sign.value}`;
      actualValue = "";
      calculationNumber = false;
      lastSignValue = sign.value;
    }
    //check for actual calculus
    else if (actualValue) {
      //calculate values
      operationResult = processCalculus(lastValue, actualValue, lastSignValue);
      lastValue = processCalculus(lastValue, actualValue, lastSignValue);
      console.log(operationResult);
      //check for invalid expression
      if (operationResult == Infinity || operationResult == NaN)
        processInvalidOutput();
      else {
        //display values
        upperDisplayElement.value = `${operationResult} ${sign.value}`;
        outputElement.value = operationResult;
        //reassign values
        actualValue = "";
        lastSignValue = sign.value;
      }
    }
  });
});

//BACK ELEMENT FUNCTIONALITY
deleteOneElement.addEventListener(`click`, function () {
  actualValue = Number(actualValue);
  actualValue = Math.floor(actualValue / 10);
  if (actualValue === 0) {
    outputElement.value = "";
    actualValue = "";
  } else outputElement.value = actualValue;
});

//EQUAL FUNCTIONALITY
equalElement.addEventListener(`click`, function () {
  console.log(actualValue);
  //first check if the value is truthy!
  console.log(`Current Value: ${actualValue}, Last Value: ${lastValue}`);
  if (actualValue !== "" && lastValue !== "") {
    //change to actual value so the sign listener will convert it back in the first part
    actualValue = processCalculus(lastValue, actualValue, lastSignValue);
    //now check if the value is invalid or not
    if (actualValue == Infinity || actualValue == NaN) processInvalidOutput();
    else {
      //Element changing
      outputElement.value = actualValue;
      upperDisplayElement.classList.add(`hidden`);
      //mark true so that the program will convert
      calculationNumber = true;
      //reset the value if a new number is created
      invalidExpression = true;
      //assign the last value so at equal sign press and no operation to show the exact thing!
      lastValue = "";
    }
  }
  //now process the example of 247/ and then press equal
  else {
    outputElement.value = Number(lastValue + actualValue);
    upperDisplayElement.classList.add(`hidden`);
    calculationNumber = true;
    invalidExpression = true;
  }
});

//CALCULATOR CLEAR
clearAllElement.addEventListener(`click`, resetValues);

//delete the actual element
eraseElement.addEventListener(`click`, function () {
  actualValue = "";
  outputElement.value = actualValue;
});

//FUNCTIONS

//return operation calculus
function processCalculus(num1, num2 = 0, sign) {
  console.log(`complete`);
  return eval(`${num1} ${sign} ${num2}`);
}

function resetValues() {
  lastValue = "";
  operationResult = "";
  calculationNumber = true;
  actualValue = "";
  outputElement.value = 0;
  upperDisplayElement.value = "";
  upperDisplayElement.classList.add(`hidden`);
}

function processInvalidOutput() {
  invalidExpression = true;
  outputElement.value = `Invalid expression!`;
}
