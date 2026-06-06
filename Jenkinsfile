pipeline {
    agent any

    stages {

        stage('Checkout Source Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Vandya12/food-delivery-app.git'
            }
        }

        stage('Verify Repository Structure') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                sh 'ls -la backend'
                sh 'ls -la frontend'
            }
        }

        stage('Verify Git') {
            steps {
                sh 'git --version'
            }
        }

        stage('Verify Java') {
            steps {
                sh 'java -version'
            }
        }

        stage('Build Validation') {
            steps {
                sh 'echo "Food Delivery Application CI Pipeline Executed Successfully"'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully.'
        }

        failure {
            echo 'Pipeline execution failed.'
        }
    }
}

