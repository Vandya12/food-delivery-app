pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Vandya12/food-delivery-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t food-backend ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t food-frontend ./frontend'
            }
        }
    }
}

