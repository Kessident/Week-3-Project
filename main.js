// TODO: Operators chosen immediately after another
// TODO: Operators on Finihsed Numbers

const nineButton = document.getElementById("9");
const eightButton = document.getElementById("8");
const sevenButton = document.getElementById("7");
const sixButton = document.getElementById("6");
const fiveButton = document.getElementById("5");
const fourButton = document.getElementById("4");
const threeButton = document.getElementById("3");
const twoButton = document.getElementById("2");
const oneButton = document.getElementById("1");
const zeroButton = document.getElementById("0");
const decimalButton = document.getElementById(".");
const equalsButton = document.getElementById("=");
const divideButton = document.getElementById("?");
const multiplyButton = document.getElementById("/");
const subtractionButton = document.getElementById("-");
const additionButton = document.getElementById("+");
const clearButton = document.getElementById("clear");
const numbersDisplay = document.getElementById("numbersDisplay");

let allowOperator = false;
let finished = false;
let buttonList = document.querySelectorAll(".square");
let numbersList = [];
let operatorsList = [];
let currentNum = "";

for (let i = 0; i < buttonList.length; i++) {
  buttonList[i].addEventListener("click",function(event){
    onClick(event);
  });
}


function onClick(event) {
  let btn = event.target;
  if (finished && btn.id !== "="){
    numbersDisplay.innerHTML = "";
    numbersList = [];
    operatorsList = [];
    currentNum = "";
    finished = false;
  }

  //
  if (!btn.classList.contains("operator")){
    allowOperator = true;
  }


  //Clear Button
  if (btn.id === "clear"){
    numbersDisplay.innerHTML = "";
    numbersList = [];
    operatorsList = [];
    currentNum = "";
  }


  //Equals Button
  else if (btn.id === "=" && numbersList.length >0){
    numbersList.push(currentNum);


    for (let i = 0; i < numbersList.length; i++){
      numbersList[i] = parseFloat(numbersList[i]);
    }

    while (operatorsList.indexOf("*") > -1 || operatorsList.indexOf("/") > -1){
      let indexMul = operatorsList.indexOf("*");
      let indexDiv = operatorsList.indexOf("/");
      let mulExist = indexMul > -1;
      let divExist = indexDiv > -1


      if (indexMul > -1 && (indexMul <= indexDiv || indexDiv)){
        console.log("First If");
        let i = indexMul;
        numbersList[i] *= numbersList[i+1];


        if (numbersList[i].toString().length > 5){
          numbersList[i] = numbersList[i].toFixed(5);
        }
        numbersList.splice(i+1,1);
        operatorsList.splice(i,1);
        console.log("operatorsList: " + operatorsList);
      }
      else if (indexDiv > -1 && (indexDiv <= indexMul || indexMul)){
        console.log("Second If");
        let i = indexDiv;
        numbersList[i] /= numbersList[i+1];
        if (numbersList[i].toString().length > 5){
          numbersList[i] = numbersList[i].toFixed(5);
        }
        numbersList.splice(i+1,1);
        operatorsList.splice(i,1);
        console.log("operatorsList: " + operatorsList);
      }
    }


    for (let i = 0; i < operatorsList.length; i++){
      if (operatorsList[i] === "+"){
        numbersList[i] += numbersList[i+1];
        numbersList.splice(i+1,1);
        operatorsList.splice(i,1);
        i--;
      }
      else if (operatorsList[i] === "-") {
        numbersList[i] -= numbersList[i+1];
        numbersList.splice(i+1,1);
        operatorsList.splice(i,1);
        i--;
      }
    }
    numbersDisplay.innerHTML = numbersList[0];
    finished = true;
    currentNum = "";
  }


  //Operator Button
  else if (btn.classList.contains("operator")){
    if (allowOperator){
      numbersList.push(currentNum);
      currentNum = "";
      operatorsList.push(btn.id);
      numbersDisplay.innerHTML += btn.id;
      allowOperator = false;
    }
  }


  else if (btn.id === "numbersDisplay") {}

  //Number Button
  else if (btn.id !== "="){
    currentNum += btn.id;
    numbersDisplay.innerHTML += btn.id;
  }
}
