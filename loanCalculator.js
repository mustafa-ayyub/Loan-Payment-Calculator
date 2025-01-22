const readlineSync = require("readline-sync");

const calculateMonthlyPayment = (
    loanAmount,
    annualInterestRate,
    loanDuration
) => {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    return (
        (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -loanDuration))
    );
};

const calculateTotalDebt = (monthlyPayment, termInMonths) =>
    monthlyPayment * termInMonths;

const getInput = (promptMessage) => readlineSync.questionFloat(promptMessage);

const displayResults = (monthlyPayment, termInMonths, totalDebt) => {
    console.log("Repayment Details:\n");
    console.log(`Monthly Payment: ${monthlyPayment.toFixed(2)}`);
    console.log(`Loan Duration: ${termInMonths} months`);
    console.log(`Total Repayable Amount: ${totalDebt.toFixed(2)}`);
};

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
