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
                // Build Docker image
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Stop Old Container') {
            steps {
                // Stop and remove old container if exists
                sh 'docker stop nextjs-demo || true'
                sh 'docker rm nextjs-demo || true'
            }
        }

        stage('Run Docker Container') {
            steps {
                // Run new container
                sh 'docker run -d -p 3000:3000 --name nextjs-demo $DOCKER_IMAGE'
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
