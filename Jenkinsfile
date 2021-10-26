pipeline {
    agent any
    stages {
        stage ("NPM Audit Analysis") {
            step {
                sh 'npm install'
                sh '/home/sreekanth/devsecops/scripts/npm-audit.sh'
            }
        }
    }
}