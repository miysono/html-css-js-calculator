"use strict";

//WHAT TO DO NEXT / FIXES
//Check for the 0 division -> it will return NaN, and you can create a number on top of that!
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
let calculationNumber = true; //checks if it is the first calculation

//START OPERATIONS
upperDisplayElement.classList.add(`hidden`);

//crate number
numbers.forEach((number) => {
  number.addEventListener(`click`, function () {
    //crate the number
    actualValue += number.value;
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
      lastValue = Number(actualValue);
      upperDisplayElement.value = `${actualValue} ${sign.value}`;
      actualValue = "";
      calculationNumber = false;
      lastSignValue = sign.value;
    }
    //check for actual calculus
    else {
      console.log(
        `Last value: ${lastValue}, Current value: ${actualValue}, sign: ${lastSignValue}`
      );
      operationResult = processCalculus(lastValue, actualValue, lastSignValue);
      outputElement.value = operationResult;
      lastValue = processCalculus(lastValue, actualValue, lastSignValue);
      actualValue = "";
      upperDisplayElement.value = `${operationResult} ${sign.value}`;
      lastSignValue = sign.value;
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
  //first check if the value is truthy!
  if (actualValue) {
    //change to actual value so the sign listener will convert it back in the first part
    actualValue = processCalculus(lastValue, actualValue, lastSignValue);
    //Element changing
    outputElement.value = actualValue;
    upperDisplayElement.classList.add(`hidden`);
    //mark true so that the program will convert
    calculationNumber = true;
  }
});

//CALCULATOR CLEAR
clearAllElement.addEventListener(`click`, function () {
  lastValue = "";
  operationResult = "";
  calculationNumber = true;
  actualValue = "";
  outputElement.value = 0;
  upperDisplayElement.value = "";
  upperDisplayElement.classList.add(`hidden`);
});

//delete the actual element
eraseElement.addEventListener(`click`, function () {
  actualValue = "";
  outputElement.value = actualValue;
});

//FUNCTIONS

//return operation calculus
function processCalculus(num1, num2, sign) {
  console.log(`complete`);
  return eval(`${num1} ${sign} ${num2}`);
}
