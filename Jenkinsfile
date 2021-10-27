pipeline {
    agent any
    stages {
        stage ("NPM Audit Analysis") {
            steps {
                sh 'npm install'
                sh 'npm-audit --json > /home/sreekanth/devsecops/reports/npm-audit-report'
            }
        }
    }
}