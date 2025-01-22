jest.mock("readline-sync", () => ({
    questionFloat: jest.fn(),
  }));
  
  const readlineSync = require("readline-sync");
  const {
    calculateMonthlyPayment,
    calculateTotalDebt,
    getInput,
    displayResults,
  } = require("../src/loanUtils");
  
  describe("loanUtils", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe("calculateMonthlyPayment", () => {
      it("should calculate the monthly payment with a non-zero interest rate", () => {
        const loanAmount = 10000;
        const annualInterestRate = 5;
        const loanDuration = 24;
  
        const result = calculateMonthlyPayment(
          loanAmount,
          annualInterestRate,
          loanDuration
        );
  
        expect(result).toBeCloseTo(438.71, 2);
      });
  
      it("should calculate the monthly payment with zero interest rate", () => {
        const loanAmount = 10000;
        const annualInterestRate = 0;
        const loanDuration = 24;
  
        const result = calculateMonthlyPayment(
          loanAmount,
          annualInterestRate,
          loanDuration
        );
  
        expect(result).toBeCloseTo(416.67, 2);
      });
    });
  
    describe("calculateTotalDebt", () => {
      it("should calculate the total repayable amount", () => {
        const monthlyPayment = 438.71;
        const loanDuration = 24;
  
        const result = calculateTotalDebt(monthlyPayment, loanDuration);
  
        expect(result).toBeCloseTo(10529.04, 2);
      });
    });
  
    describe("getInput", () => {
      it("should return user input as a float in interactive mode", () => {
        delete process.env.CI;
  
        const originalIsTTY = process.stdout.isTTY;
        process.stdout.isTTY = true;
  
        readlineSync.questionFloat.mockReturnValue(10000);
  
        const result = getInput("Enter the loan amount (in euros): ");
  
        expect(result).toBe(10000);
  
        expect(readlineSync.questionFloat).toHaveBeenCalledTimes(1);
        expect(readlineSync.questionFloat).toHaveBeenCalledWith(
          "Enter the loan amount (in euros): "
        );
  
        process.stdout.isTTY = originalIsTTY;
      });
  
  
      it("should return predefined values in CI environment", () => {
        process.env.CI = "true";
        const result = getInput("Enter the loan amount (in euros): ");
  
        expect(result).toBe(10000);
  
        delete process.env.CI;
      });
  
      it("should log the predefined value when running in CI", () => {
        process.env.CI = "true";
        const mockConsole = jest.spyOn(console, "log").mockImplementation();
  
        getInput("Enter the annual interest rate (in percentage): ");
  
        expect(mockConsole).toHaveBeenCalledWith(
          "Enter the annual interest rate (in percentage):  5"
        );
  
        mockConsole.mockRestore();
        delete process.env.CI;
      });
    });
  
    describe("displayResults", () => {
      it("should display repayment details correctly", () => {
        const mockConsole = jest.spyOn(console, "log").mockImplementation();
  
        const monthlyPayment = 438.71;
        const termInMonths = 24;
        const totalDebt = 10529.04;
  
        displayResults(monthlyPayment, termInMonths, totalDebt);
  
        expect(mockConsole).toHaveBeenCalledWith("Repayment Details:\n");
        expect(mockConsole).toHaveBeenCalledWith("Monthly Payment: 438.71");
        expect(mockConsole).toHaveBeenCalledWith("Loan Duration: 24 months");
        expect(mockConsole).toHaveBeenCalledWith(
          "Total Repayable Amount: 10529.04"
        );
  
        mockConsole.mockRestore();
      });
    });
  });
  