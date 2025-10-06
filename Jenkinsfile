pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nextjs-demo:local"
        CONTAINER_NAME = "nextjs-demo"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out code..."
                git branch: 'main', url: 'https://github.com/prakash735/local.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                bat "docker build -t %DOCKER_IMAGE% ."
            }
        }

        stage('Stop and Remove Old Container') {
            steps {
                echo "Stopping and removing old container if exists..."
                bat '''
                @echo off
                docker ps -q --filter "name=%CONTAINER_NAME%" | findstr . >nul 2>&1
                if %ERRORLEVEL%==0 (
                    docker stop %CONTAINER_NAME%
                    docker rm %CONTAINER_NAME%
                ) else (
                    echo Container %CONTAINER_NAME% not running
                )
                exit 0
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "Running new container..."
                bat '''
                docker run -d -p 3000:3000 --name %CONTAINER_NAME% %DOCKER_IMAGE%
                exit 0
                '''
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
