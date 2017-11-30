export function CalculateTax(grossIncome, joint) {
  return joint ? calculateJointFiling(grossIncome) : calculateFilingSingle(grossIncome)
}

var calculateFilingSingle = function (grossIncome) {
  if(grossIncome <= 9325) {
    return grossIncome * .10
  } else if (grossIncome <= 37950) {
    return 932.50 + ((grossIncome - 9325) * .15)
  } else if (grossIncome <= 91900) {
    return 5226.25 + ((grossIncome - 37950) * .25)
  } else if (grossIncome <= 191650) {
    return 18713.75 + ((grossIncome - 91900) * .28)
  } else if (grossIncome <= 416700) {
    return 46643.75 + ((grossIncome - 191650) * .33)
  } else if (grossIncome <= 418400) {
    return 120910.25 + ((grossIncome - 416700) * .35)
  } else {
    return 121505.25 + ((grossIncome - 418400) * .396)
  }
}

var calculateJointFiling = function (grossIncome) {
  if(grossIncome <= 18650) {
    return grossIncome * .10
  } else if (grossIncome <= 75900) {
    return 1865 + ((grossIncome - 18650) * .15)
  } else if (grossIncome <= 153100) {
    return 10452.50 + ((grossIncome - 75900) * .25)
  } else if (grossIncome <= 233350) {
    return 29752.50 + ((grossIncome - 153100) * .28)
  } else if (grossIncome <= 416700) {
    return 52222.50 + ((grossIncome - 233350) * .33)
  } else if (grossIncome <= 470700) {
    return 112728 + ((grossIncome - 416700) * .35)
  } else {
    return 131628 + ((grossIncome - 470700) * .396)
  }
}
