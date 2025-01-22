pipeline {
  agent any

  environment {
      CI = 'true'
  }

 tools {
      nodejs "NodeJS"  
  }

  stages {

      stage('Checkout Code') {
          steps {
              echo "Checking out code from source repository"
              checkout scm
          }
      }

      stage('Install Dependencies') {
          steps {
              echo "Installing project dependencies"
              sh 'npm install'
          }
      }

      stage('Linting') {
          steps {
              echo "Running ESLint to check code quality"
              sh 'npm run lint'
          }
      }

      stage('Run Tests') {
          steps {
              echo "Running Jest tests and generating coverage report"
              sh 'npm test -- --coverage'
          }
      }

      stage('Mutation Testing') {
          steps {
              echo "Running mutation testing with Stryker"
              sh 'npm run mutation'
          }
      }

      stage('Code Metrics') {
          steps {
              echo "Generating code metrics with Plato"
              sh 'npm run metrics'
          }
          post {
              always {
                  archiveArtifacts artifacts: 'report/**', fingerprint: true
              }
          }
      }

      stage('Build') {
          steps {
              echo "Building the project"
              sh 'npm run build'
          }
      }
  }

  post {
      success {
          echo '🎉 Pipeline completed successfully!'
      }
      failure {
          echo '❌ Pipeline failed. Check the logs for errors.'
      }
  }
}

