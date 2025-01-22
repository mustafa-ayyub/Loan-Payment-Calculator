const readlineSync = require("readline-sync");

const calculateMonthlyPayment = (loanAmount, annualInterestRate, loanDuration) => {
  if (annualInterestRate === 0) {
    return loanAmount / loanDuration;
  }
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  return (
    (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -loanDuration))
  );
};

const calculateTotalDebt = (monthlyPayment, termInMonths) =>
  monthlyPayment * termInMonths;


const getInput = (promptMessage) => {
  // Detect if running in a non-interactive environment
  const isCI = process.env.CI === "true" || !process.stdout.isTTY;
  
  if (isCI) {
    // Use default values for CI/CD environments
    const defaults = {
      "Enter the loan amount (in euros): ": 10000,
      "Enter the annual interest rate (in percentage): ": 5,
      "Enter the loan duration (in months): ": 24,
    };
    console.log(`${promptMessage} ${defaults[promptMessage]}`);
    return defaults[promptMessage];
  }
  
  return readlineSync.questionFloat(promptMessage);
};
  
const displayResults = (monthlyPayment, termInMonths, totalDebt) => {
  console.log("Repayment Details:\n");
  console.log(`Monthly Payment: ${monthlyPayment.toFixed(2)}`);
  console.log(`Loan Duration: ${termInMonths} months`);
  console.log(`Total Repayable Amount: ${totalDebt.toFixed(2)}`);
};

module.exports = {
  calculateMonthlyPayment,
  calculateTotalDebt,
  getInput,
  displayResults
};
