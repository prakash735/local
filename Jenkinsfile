pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nextjs-demo:local"
        CONTAINER_NAME = "nextjs-demo"
        PORT_MAPPING = "3000:3000"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/prakash735/local.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Stop and Remove Old Container') {
            steps {
                echo "Stopping and removing old container if exists..."
                // Stop old container if running
                bat """
                docker ps -q --filter "name=%CONTAINER_NAME%" | findstr . > nul
                if %ERRORLEVEL%==0 (
                    docker stop %CONTAINER_NAME%
                    docker rm %CONTAINER_NAME%
                ) else (
                    echo Container %CONTAINER_NAME% not running
                )
                """
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "Starting new container..."
                bat 'docker run -d -p %PORT_MAPPING% --name %CONTAINER_NAME% %DOCKER_IMAGE%'
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
