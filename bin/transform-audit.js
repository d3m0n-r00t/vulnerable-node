let data = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let chunk = process.stdin.read();
    if (chunk !== null) {
        data += chunk;
    }
});

process.stdin.on('end', () => {
    const audit = JSON.parse(data);
    const actions = audit.actions;
    const advisories = audit.advisories;
    const issues = actions.flatMap((action) => 
        action.resolves.map((resolve) => {
            const advisory = advisories[resolve.id];
            return {
                fileName: resolve.path,
                category: advisory.title,
                message: advisory.url,
                severity: warningNGSeverity(advisory.severity)
            };
        }));
    console.log(JSON.stringify({ issues: issues}));
});

function warningNGSeverity(string) {
    switch (string) {
        case 'low': return 'LOW';
        case 'moderate': return 'NORMAL';
        case 'high': return 'HIGH';
        case 'critical': return 'ERROR';
        default: return 'NORMAL';
    }
}