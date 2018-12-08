def releaseInfo

pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr:'5'))
    }

    stages {
        stage('Build Release Info') {
            steps {
                script {
                    releaseInfo = generateGithubReleaseInfo(
						'PaulTrampert',
						'webpack-resources-plugin',
						'v',
						'Github User/Pass'
					)

					echo releaseInfo.nextVersion().toString()
					echo releaseInfo.changelogToMarkdown()
                }
            }
        }

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

        stage('Publish') {
			when {
				expression {env.BRANCH_NAME == 'master'}
			}

			steps {
				script {
					def packageJson = readJSON file: 'package.json'
					packageJson.version = releaseInfo.nextVersion().toString()
					writeJSON file: 'package.json', json: packageJson, pretty: 2
				}
				sh 'npm publish'
				publishGithubRelease(
					'PaulTrampert',
					'webpack-resources-plugin',
					releaseInfo,
					'v',
					'Github User/Pass'
				)
			}
		}
    }
    post {
        always {
            junit 'testResults/*.xml'
        }
    }
}