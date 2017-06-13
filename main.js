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
const sqrtButton = document.getElementById("√");
const modButton = document.getElementById("mod");

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


  //Resets calculator state
  if (finished && btn.id !== "="){
    numbersDisplay.innerHTML = "";
    numbersList = [];
    operatorsList = [];
    currentNum = "";
    finished = false;
  }

  if (!btn.classList.contains("operator")){
    allowOperator = true;
  }

  //Caps entered numbers at max of 14
  if (numbersDisplay.innerHTML.length > 13 && (btn.id !="clear" && btn.id !="="))
  {return event;}


  //Clear Button
  if (btn.id === "clear"){
    numbersDisplay.innerHTML = "";
    numbersList = [];
    operatorsList = [];
    currentNum = "";
    allowOperator = false;
  }

  //Equals Button
  else if ((btn.id === "=" || btn.id === "√")){

    if (currentNum !== ""){
      numbersList.push(currentNum);
    }


    if (numbersList.length === operatorsList.length ){
      numbersDisplay.innerHTML = "Invalid Input ";
      numbersList = [];
      operatorsList = [];
      currentNum = "";
      allowOperator = false;
      finished = true;
      return event;
    }

    if (btn.id === "√"){
      operatorsList.push("√");
    }

    for (let i = 0; i < numbersList.length; i++){
      if (numbersList[i] === "."){
        numbersList[i] = 0;
      }
      numbersList[i] = parseFloat(numbersList[i]);
    }

    //Calculate Multiplication, Division, Modulo
    for (let i = 0; i < operatorsList.length; i++){
      if (operatorsList[i] === "*"){
        numbersList[i] *= numbersList[i+1];
        numbersList.splice(i+1,1);
        operatorsList.splice(i,1);
        if (numbersList[i].toString().length > 5){
          numbersList[i] = parseFloat(numbersList[i].toFixed(5));
        }
        i--;
      }
      else if (operatorsList[i] === "/") {
        numbersList[i] /= numbersList[i+1];
        numbersList.splice(i+1,1);
        operatorsList.splice(i,1);
        if (numbersList[i].toString().length > 5){
          numbersList[i] = parseFloat(numbersList[i].toFixed(5));
        }
        i--;
      }
      else if (operatorsList[i] === "%"){
        numbersList[i] %= numbersList[i+1];
        numbersList.splice(i+1,1);
        operatorsList.splice(i,1);
        if (numbersList[i].toString().length > 5){
          numbersList[i] = parseFloat(numbersList[i].toFixed(5));
        }
        i--;
      }
    }

    //Calculate addition + subtraction
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


    if (operatorsList.indexOf("√") > -1){
      numbersList[0] = Math.sqrt(numbersList[0]);
      if (numbersList[0].toString().length > 5){
        numbersList[0] = parseFloat(numbersList[0].toFixed(5));
      }
    }

    numbersDisplay.innerHTML = numbersList[0];
    finished = true;
    currentNum = "";
    allowOperator = false;
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
    else if(operatorsList.length > 0){
      operatorsList[operatorsList.length-1] = btn.id;
      numbersDisplay.innerHTML = numbersDisplay.innerHTML.slice(0,-1) + btn.id;
    }
  }


  else if (btn.id === "numbersDisplay") {}

  //Number Button
  else if (btn.id !== "="){
    currentNum += btn.id;
    numbersDisplay.innerHTML += btn.id;
  }
}
