# Loan Payment Calculator

## Overview
The Loan Payment Calculator is a Node.js application that calculates monthly payments and total repayable amounts for study loans. Users can input loan details interactively or use predefined values in CI/CD environments.

## Features
- Calculates monthly payments based on the loan amount, annual interest rate, and loan duration.
- Computes the total repayable amount.
- Handles edge cases such as zero interest rate and zero loan amount.
- Interactive user input through the console.
- Predefined input values for CI/CD environments.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/mustafa-ayyub/Loan-Payment-Calculator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Loan-Payment-Calculator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Application
To run the calculator:
```bash
npm run build
```
Follow the prompts in the console to input loan details. The application will display the monthly payment, loan duration, and total repayable amount.

### Testing
The project includes unit tests using Jest. To run the tests:
```bash
npm test
```

### Linting
To lint the project using ESLint:
```bash
npm run lint
```
### Mutation Testing
The project uses Stryker for mutation testing, which evaluates the quality of the test suite by introducing small code changes and ensuring the tests catch these mutations.
![alt text](image.png)
To run mutation tests:
```bash
npm run metrics
```

### Code Quality Metrics
To generate code quality reports:
```bash
npm run metrics
```

### CI Pipeline
The project includes a CI pipeline script:
```bash
npm run ci
```
This script performs the following steps:
- Lints the code.
- Runs unit tests.
- Performs mutation testing using Stryker.
- Generates code quality metrics.
- Builds the project.

## Scripts
- `npm run build`: Builds and runs the project.
- `npm run test`: Executes unit tests using Jest.
- `npm run lint`: Lints the codebase with ESLint.
- `npm run metrics`: Generates code quality metrics.
- `npm run ci`: Runs the full CI pipeline (linting, testing, mutation testing, metrics generation, and building).

## Technologies Used
- **Node.js**: Runtime environment for the application.
- **Jest**: Testing framework for unit tests.
- **Stryker**: Mutation testing framework.
- **ESLint**: JavaScript linter.
- **es6-plato**: Code quality metrics generator.
- **readline-sync**: Library for interactive console input.

## Edge Cases Handled
- **Zero Loan Amount**: Returns zero for monthly payments and total repayable amount.
- **Zero Interest Rate**: Calculates monthly payments based on the principal only.
- **Non-Interactive Environments**: Uses predefined values in CI/CD pipelines.

## License
This project is licensed under the ISC License. See the LICENSE file for details.

## Contact
For any questions or issues, please contact:
- **Email**: mustafaayyub.dev@gmail.com
- **GitHub**: https://github.com/mustafa-ayyub
