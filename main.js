const nineButton = document.querySelector("#nine");
const eightButton = document.querySelector("#eight");
const sevenButton = document.querySelector("#seven");
const sixButton = document.querySelector("#six");
const fiveButton = document.querySelector("#five");
const fourButton = document.querySelector("#fout");
const threeButton = document.querySelector("#three");
const twoButton = document.querySelector("#two");
const oneButton = document.querySelector("#one");
const zeroButton = document.querySelector("#zero");
const decimalButton = document.querySelector("#decimal");
const equalsButton = document.querySelector("#equals");
const divideButton = document.querySelector("#divide");
const multiplyButton = document.querySelector("#multiply");
const subtractionButton = document.querySelector("#subtraction");
const additionButton = document.querySelector("#addition");
const clearButton = document.querySelector("#clear");

let buttonList = document.querySelectorAll(".square");

for (let i = 0; i < buttonList.length; i++) {
  buttonList[i].addEventListener("click",funtion(event){});
}
