pipeline {
    agent any

    stages {
        stage ("Restore packages") {
            steps {
                sh "yarn"
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