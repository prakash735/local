pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nextjs-demo:local"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/prakash735/local.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Use bat for Windows
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Stop Old Container') {
            steps {
                // Stop and remove old container if exists
                bat 'docker stop nextjs-demo || echo Container not running'
                bat 'docker rm nextjs-demo || echo Container not found'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker run -d -p 3000:3000 --name nextjs-demo %DOCKER_IMAGE%'
            }
        }
    }

    post {
        success {
            echo "Next.js app deployed successfully on http://localhost:3000"
        }
        failure {
            echo "Deployment failed. Check console output."
        }
    }
}
