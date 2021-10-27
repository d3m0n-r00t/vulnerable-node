pipeline {
    agent any
    stages {
        stage ("NPM Audit Analysis") {
            steps {
                sh 'npm install'
                sh 'mkdir -p .tmp'
                sh 'npm audit --json | bin/transorm-audit.js > .tmp/npm-audit.json || true'
            }
            post {
                always {
                    recordIssues(
                        tool: groovyScript(name:'NPM Audit Analysis', pattern:'.tmp/npm-audit.json'),
                        qualityGates: [
                            [threshold: 20, type: 'TOTAL', unstable: true],
                            [threshold: 1, type: 'TOTAL_ERROR', unstable: false]
                        ]
                    )
                }
            }
        }
    }
}    