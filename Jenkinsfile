pipeline {
    agent any

    stages {
        stage ("Restore packages") {
            steps {
                sh "npm install"
            }
        }

        stage ("Test") {
            steps {
                sh "npm test"
            }
        }
    }
    post {
        always {
            junit 'testResults/*.xml'
        }
    }
}