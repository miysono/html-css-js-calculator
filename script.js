"use strict";

//cleaner code

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
let calculationNumber = true; //checks if it is the first calculation (beginning/after operation)
let isDisabled = false;
//START OPERATIONS
upperDisplayElement.classList.add(`hidden`);

//crate number
numbers.forEach((number) => {
  number.addEventListener(`click`, function () {
    if (isDisabled == true) buttonActivate(mathSigns);
    //check for invalid expresion - like(NaN)
    if (invalidExpression) {
      resetValues();
      invalidExpression = false;
    }
    //crate the number
    actualValue += number.value;
    //check for 00-number like exceptions and display
    if (actualValue === `0${number.value}`) actualValue = `${number.value}`;
    outputElement.value = actualValue;
  });
});

//Process Signs
mathSigns.forEach((sign) => {
  sign.addEventListener(`click`, function () {
    //Update the value of the upper calculation BAR
    upperDisplayElement.classList.remove(`hidden`);
    //check for the FIRST calculation
    if (calculationNumber) {
      //make the expression valid so the program can work after equal sign - like math signs
      invalidExpression = false;
      lastValue = Number(actualValue);
      upperDisplayElement.value = `${actualValue} ${sign.value}`;
      actualValue = "";
      calculationNumber = false;
      lastSignValue = sign.value;
      outputElement.value = "";
    }
    //check for actual calculus
    else if (actualValue) {
      //calculate values
      operationResult = processCalculus(lastValue, actualValue, lastSignValue);
      lastValue = processCalculus(lastValue, actualValue, lastSignValue);
      console.log(operationResult);
      //check for invalid expression
      if (operationResult == Infinity || isNaN(operationResult)) {
        processInvalidOutput();
        buttonDeactivate(mathSigns);
      } else {
        //display values
        upperDisplayElement.value = `${operationResult} ${sign.value}`;
        outputElement.value = "";
        //reassign values
        actualValue = "";
        lastSignValue = sign.value;
      }
    } //if user wants to change the sign!
    else {
      lastSignValue = sign.value;
      upperDisplayElement.value = `${lastValue} ${lastSignValue}`;
    }
  });
});

//BACK ELEMENT FUNCTIONALITY
deleteOneElement.addEventListener(`click`, function () {
  if (isDisabled) buttonActivate(mathSigns);
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
    console.log(actualValue);
    //now check if the value is invalid or not
    if (Math.abs(actualValue) == Infinity || isNaN(actualValue)) {
      processInvalidOutput();
      buttonDeactivate(mathSigns);
    } else {
      //Element changing
      processExceptions();
    }
  }
  //now process the example of 247/ and then press equal
  else {
    //reasign the actual value -> it will become last value in sign event list
    actualValue = lastValue + actualValue;
    //same as else statement
    processExceptions();
  }
});

//CALCULATOR CLEAR
clearAllElement.addEventListener(`click`, resetValues);

//delete the actual element
eraseElement.addEventListener(`click`, function () {
  if (isDisabled) buttonActivate(mathSigns);
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
  if (isDisabled) buttonActivate(mathSigns);
  lastValue = "";
  operationResult = "";
  calculationNumber = true;
  actualValue = "";
  outputElement.value = "";
  upperDisplayElement.value = "";
  upperDisplayElement.classList.add(`hidden`);
}

function processInvalidOutput() {
  invalidExpression = true;
  outputElement.value = `Invalid expression!`;
  upperDisplayElement.classList.add(`hidden`);
}

function processExceptions() {
  outputElement.value = actualValue;
  upperDisplayElement.classList.add(`hidden`);
  //mark true so that the program will convert => in sign event listener -> wait for the next number
  calculationNumber = true;
  //also mark true to make sure if the user wants a new operation to reset -> number event listner
  invalidExpression = true;
  //assign the last value so -> else statement -> actual value = calculus -> always return that -> actual value will be last value in sign listener
  lastValue = "";
}

function buttonDeactivate(buttons) {
  buttons.forEach(function (elem) {
    elem.disabled = true;
    elem.classList.add(`deactivated`);
  });
  isDisabled = true;
}
function buttonActivate(buttons) {
  console.log(isDisabled);
  buttons.forEach(function (elem) {
    elem.disabled = false;
    elem.classList.remove(`deactivated`);
  });
  isDisabled = false;
  resetValues();
}
