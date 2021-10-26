pipeline {
    agent any
    stages {
        stage ("NPM Audit Analysis") {
            steps {
                sh 'npm install'
                sh '/home/sreekanth/devsecops/scripts/npm-audit.sh'
            }
        }
    }
}