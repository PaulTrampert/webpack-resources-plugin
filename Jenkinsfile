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
}