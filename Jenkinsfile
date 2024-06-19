pipeline {
    agent any
    stages {
        stage('Git Checkout') {
            steps {
                script {
                    git branch: 'jenkins',
                        credentialsId: '',
                        url: 'https://github.com/Rushil1274/quater.git'
                }
            }
        }
        stage('delpoy') {
            steps {
                sh 'docker-compose up'
            }
        }
    }
    post {
        always {
            sh 'docker-compose down'
        }
    }
}