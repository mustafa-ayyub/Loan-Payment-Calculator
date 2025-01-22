const { main } = require("../src/loanCalculator");
const loanUtils = require("../src/loanUtils");

jest.mock("readline-sync", () => ({
  questionFloat: jest.fn(),
}));

jest.mock("../src/loanUtils.js", () => ({
  calculateMonthlyPayment: jest.fn(),
  calculateTotalDebt: jest.fn(),
  displayResults: jest.fn(),
  getInput: jest.fn(),
}));

describe("loanCalculator", () => {
  let consoleSpy;
  
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });
  
  it("should call necessary functions and display correct results with correct prompts", () => {
    loanUtils.getInput
      .mockReturnValueOnce(10000)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(24);  
  
    loanUtils.calculateMonthlyPayment.mockReturnValue(438.71);
    loanUtils.calculateTotalDebt.mockReturnValue(10529.04);
  
    main();
  
    expect(console.log).toHaveBeenCalledWith("Study Loan Repayment Calculator\n");
  
    expect(loanUtils.getInput).toHaveBeenCalledWith("Enter the loan amount (in euros): ");
    expect(loanUtils.getInput).toHaveBeenCalledWith("Enter the annual interest rate (in percentage): ");
    expect(loanUtils.getInput).toHaveBeenCalledWith("Enter the loan duration (in months): ");
  
    expect(loanUtils.calculateMonthlyPayment).toHaveBeenCalledWith(10000, 5, 24);
    expect(loanUtils.calculateTotalDebt).toHaveBeenCalledWith(438.71, 24);
    expect(loanUtils.displayResults).toHaveBeenCalledWith(438.71, 24, 10529.04);
  });
  
  it("should handle edge cases with zero loan amount", () => {
    loanUtils.getInput
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(24);
  
    loanUtils.calculateMonthlyPayment.mockReturnValue(0);
    loanUtils.calculateTotalDebt.mockReturnValue(0);
  
    main();
  
    expect(loanUtils.getInput).toHaveBeenCalledWith("Enter the loan amount (in euros): ");
    expect(loanUtils.getInput).toHaveBeenCalledWith("Enter the annual interest rate (in percentage): ");
    expect(loanUtils.getInput).toHaveBeenCalledWith("Enter the loan duration (in months): ");
  
    expect(loanUtils.calculateMonthlyPayment).toHaveBeenCalledWith(0, 5, 24);
    expect(loanUtils.calculateTotalDebt).toHaveBeenCalledWith(0, 24);
    expect(loanUtils.displayResults).toHaveBeenCalledWith(0, 24, 0);
  });
  
  it("should handle edge cases with zero interest rate", () => {
    loanUtils.getInput
      .mockReturnValueOnce(10000) 
      .mockReturnValueOnce(0)     
      .mockReturnValueOnce(24);
  
    loanUtils.calculateMonthlyPayment.mockReturnValue(416.67);
    loanUtils.calculateTotalDebt.mockReturnValue(10000);
  
    main();
  
    expect(loanUtils.getInput).toHaveBeenCalledWith("Enter the loan amount (in euros): ");
    expect(loanUtils.getInput).toHaveBeenCalledWith("Enter the annual interest rate (in percentage): ");
    expect(loanUtils.getInput).toHaveBeenCalledWith("Enter the loan duration (in months): ");
  
    expect(loanUtils.calculateMonthlyPayment).toHaveBeenCalledWith(10000, 0, 24);
    expect(loanUtils.calculateTotalDebt).toHaveBeenCalledWith(416.67, 24);
    expect(loanUtils.displayResults).toHaveBeenCalledWith(416.67, 24, 10000);
  });
});
