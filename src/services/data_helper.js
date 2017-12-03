import { CalculateTax } from '../services/tax_calculator'

export function CalculateCombinedIncome (cashflow, joint) {
  if(joint){
    return parseFloat(cashflow.sources.user_work) + parseFloat(cashflow.sources.asset_income) + parseFloat(cashflow.sources.user_social_security) + parseFloat(cashflow.sources.spouse_work) +parseFloat(cashflow.sources.spouse_social_security);
  } else {
      return parseFloat(cashflow.sources.user_work) + parseFloat(cashflow.sources.asset_income) + parseFloat(cashflow.sources.user_social_security);
  }
}

export function FormatMoney (amount) {
  let roundedAmount = parseFloat(amount).toFixed(2);
  return `$ ${parseFloat(roundedAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

export function CalculateNetIncome (cashFlow, joint) {
  return CalculateCombinedIncome(cashFlow, joint) - CalculateTax(CalculateCombinedIncome(cashFlow), joint);
}
