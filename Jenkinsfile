pipeline {
    agent any
    stages {
        stage ("NPM Audit Analysis") {
            steps {
                sh 'npm install'
                sh 'npm install -g npm@latest'
                sh 'npm-audit --json > /var/lib/jenkins/reports/npm-audit-report'
            }
        }
    }
}   