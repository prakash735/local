pipeline {
    agent {
        docker {
            image 'docker:24-dind'
            args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/prakash735/local.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t nextjs-demo:local .'
            }
        }
        stage('Stop Old Container') {
            steps {
                sh '''
                if [ "$(docker ps -q -f name=nextjs-demo)" ]; then
                    docker stop nextjs-demo || true
                    docker rm nextjs-demo || true
                fi
                '''
            }
        }
        stage('Run Container') {
            steps {
                sh 'docker run -d -p 80:3000 --name nextjs-demo nextjs-demo:local'
            }
        }
    }
}
