pipeline {
    agent any
    stages {
        stage("NPM Audit Analysis") {
            steps {
                sh 'npm install'
                sh 'mkdir -p .tmp'
                sh 'npm audit --json | node bin/transform-audit.js > .tmp/npm-audit.json || true'
            }
            post {
                always {
                    recordIssues(
                        tool: issues(name:'NPM Audit Analysis', pattern:'.tmp/npm-audit.json'),
                        qualityGates: [
                            [threshold: 20, type: 'TOTAL', unstable: true],
                            [threshold: 1, type: 'TOTAL_ERROR', unstable: false]
                        ]
                    )
                }
            }
        }
        stage("OWASP Dependecy Check") {
            steps {
                sh '/var/lib/jenkins/dependency-check/bin/dependency-check.sh --scan `pwd` --format JSON --out .tmp/owasp-report --prettyPrint'
            }
        }
        stage("NodeJsScan") {
            steps {
                sh 'nodejsscan --directory `pwd` --output .tmp/nodejsscan-report'
            }
        }
        stage("Run app for DAST") {
            steps {
                sh 'docker-compose build && docker-compose up'
            }
        }
        stage("Run ZAP for DAST") {
            steps {
                sh '/var/lib/jenkins/scripts/baseline-scan.sh'
            }
        }
        stage("Stop app") {
            steps {
                sh 'docker-compose down'
                sh 'mv baseline-report.html .tmp/zap-report.html'
            }
        }
    }
}    