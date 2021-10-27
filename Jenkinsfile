pipeline {
    agent any
    stages {
        stage ("NPM Audit Analysis") {
            steps {
                sh 'npm install'
                sh 'npm audit > /var/lib/jenkins/reports/npm-audit-report'
            }
        }
    }
}   