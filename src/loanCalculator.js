
const { calculateMonthlyPayment, calculateTotalDebt, getInput , displayResults} = require("./loanUtils");
const main = () => {
  console.log("Study Loan Repayment Calculator\n");
  const loanAmount = getInput("Enter the loan amount (in euros): ");
  const annualInterestRate = getInput(
    "Enter the annual interest rate (in percentage): "
  );
  const loanDuration = getInput("Enter the loan duration (in months): ");
  const monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    annualInterestRate,
    loanDuration
  );
  const totalDebt = calculateTotalDebt(monthlyPayment, loanDuration);
  displayResults(monthlyPayment, loanDuration, totalDebt);
};
main();
module.exports = { main };