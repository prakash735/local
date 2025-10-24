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
                echo 'Building Docker image...'
                // Remove sudo after giving jenkins docker permission
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }

        stage('Stop and Remove Old Container') {
            steps {
                echo "Stopping and removing old container if exists..."
                sh '''
                if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                else
                    echo "No old container found."
                fi
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "Running new container..."
                sh '''
                docker run -d -p 80:3000 --name $CONTAINER_NAME $DOCKER_IMAGE
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Next.js app deployed successfully! Visit your EC2 public IP."
        }
        failure {
            echo "❌ Deployment failed. Check console output."
        }
    }
}
