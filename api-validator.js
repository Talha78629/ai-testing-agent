async function validateApi(
    response
) {

    const issues = [];

    // Status validation
    if (
        response.status >= 400
    ) {

        issues.push({
            type: 'Status Code',
            issue:
            `Bad status: ${response.status}`
        });

    }

    // Performance validation
    if (
        response.duration > 3000
    ) {

        issues.push({
            type: 'Performance',
            issue:
            'Slow API response'
        });

    }

    // Empty body validation
    if (
        !response.body
    ) {

        issues.push({
            type: 'Body',
            issue:
            'Empty response body'
        });

    }

    return issues;

}

module.exports = {
    validateApi
};