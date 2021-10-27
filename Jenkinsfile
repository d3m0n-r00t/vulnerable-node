pipeline {
    agent any
    stages {
        stage ("NPM Audit Analysis") {
            steps {
                script {
                    def config = io.jenkins.plugins.analysis.warnings.groovy.ParserConfiguration.getInstance()
                    def newParser = new io.jenkins.plugins.analysis.warnings.groovy.GroovyParser(
                        'npm-audit',
                        'NPM Audit Parser',
                        '\w+\t(\S+)\t(\w+)\t(\S| )+\t((\S| )+)\t(\S+)\t(\S+)',
                        """
                        import edu.hm.hafner.analysis.Severity
                        Severity severity
                        switch(matcher.group(2)) {
                            case 'low':
                                severity = Severity.WARNING_LOW;
                                break;
                            case 'moderate':
                                severity = Severity.WARNING_NORMAL;
                                break;
                            case 'high':
                                severity = Severity.WARNING_HIGH;
                                break;
                            case 'critical':
                                severity = Severity.ERROR;
                                break;
                            default:
                                severity = Severity.WARNING_NORMAL;
                                break;
                        }
                        return builder
                            .setFileName(matcher.group(7))
                            .setCategory(matcher.group(4))
                            .setMessage(matcher.group(6))
                            .buildOptional()
                        """,
                        "update\tlodash\tlow\tnpm update lodash --depth 9\tPrototype Pollution\thttps://npmjs.com/advisories/1523\telasticsearch>lodash\tN"
                    )
                    def parsers = config.getParsers().findAll { it.getId() != 'npm-audit' }
                    config.setParsers(config.getParsers().plus(newParser))
}

                }
                sh 'npm install'
                sh 'npm audit --parseable > /tmp/npm/audit || true'
            }
        post {
            always {
                recordIssues {
                    tool: groovyScript(parserId: 'npm-audit', pattern: '/tmp/npm/audit'),
                        qualityGates: [
                            [threshold: 20, type: 'TOTAL', unstable: true],
                            [threshold: 1, type: 'TOTAL_ERROR', unstable: false]
                        ]
                }
            }
        }
        }
    }
}   