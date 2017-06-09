// TODO: Operators chosen immediately after another

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

  if (btn.id === "clear"){
    numbersDisplay.innerHTML = "";
    numbersList = [];
    operatorsList = [];
    currentNum = "";
  }

  else if (btn.id === "=" && numbersList.length >0){
    numbersList.push(currentNum);
    console.log("operatorsList: " + operatorsList);


    for (let i = 0; i < numbersList.length; i++){
      numbersList[i] = parseFloat(numbersList[i]);
    }

    while (operatorsList.indexOf("*") > -1 || operatorsList.indexOf("/") > -1){
      console.log("while");

      if (operatorsList.indexOf("*") > -1){
        let i = operatorsList.indexOf("*");
        numbersList[i] *= numbersList[i+1];
        numbersList[i] = numbersList[i].toFixed(5);
        numbersList.splice(i+1,1);
        console.log("operatorsList: " + operatorsList);
        operatorsList.splice(i,1);
        console.log("spliced operatorsList " + operatorsList);
      }
      else if (operatorsList.indexOf("/") > -1){
        let i = operatorsList.indexOf("/");
        numbersList[i] /= numbersList[i+1];
        numbersList[i] = numbersList[i].toFixed(5);
        numbersList.splice(i+1,1);
        console.log("operatorsList: " + operatorsList);
        operatorsList.splice(i,1);
        console.log("spliced operatorsList " + operatorsList);
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




    // for (let i = 0; i < operatorsList.length; i++){
    //   //sum += parseInt(numbersList[i]);
    //
    //   if (oper === "+"){
    //     sum += parseInt(numbersList[i+1]);
    //     console.log(sum);
    //   }
    //   else if (oper === "-") {
    //     sum -= parseInt(numbersList[i+1]);
    //   }
    //   else if (oper === "/") {
    //     sum /= parseInt(numbersList[i+1]);
    //   }
    //   else if (oper === "*") {
    //     sum *= parseInt(numbersList[i+1]);
    //   }
    // }
    // console.log("Final sum: " + numbersList[0]);
    numbersDisplay.innerHTML = numbersList[0];
    finished = true;
    currentNum = "";
  }

  else if (btn.classList.contains("operator")){
    numbersList.push(currentNum);
    currentNum = "";
    operatorsList.push(btn.id);
    numbersDisplay.innerHTML += btn.id;
  }

  else if (btn.id !== "="){
    currentNum += btn.id;
    numbersDisplay.innerHTML += btn.id;
  }
  console.log("\n");
  console.log("NumbersList: " + numbersList);
  console.log("OperatorsList: " + operatorsList);
}
