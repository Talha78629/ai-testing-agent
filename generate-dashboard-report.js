const fs = require('fs-extra');

async function generateReport() {

    const accessibilityIssues =
        Math.floor(Math.random() * 20);

    const rcaFailures =
        Math.floor(Math.random() * 10);

    const rootCauses = [

        "Submit button selector changed after deployment.",

        "Login API returned 500 error intermittently.",

        "DOM structure changed causing Playwright locator failure.",

        "Accessibility violation due to missing aria-label.",

        "Navigation menu animation causing flaky timing issue."

    ];

    const randomCause =
        rootCauses[
            Math.floor(Math.random() * rootCauses.length)
        ];

    const report = {

        accessibilityIssues,

        rcaFailures,

        aiSummary:
            `Failures increased due to: ${randomCause}`,

        history: [
            { day: "Mon", failures: 2 },
            { day: "Tue", failures: 5 },
            { day: "Wed", failures: 3 },
            { day: "Thu", failures: 8 },
            { day: "Fri", failures: 4 }
        ]

    };

    await fs.writeJson(
        './qa-dashboard/public/report.json',
        report,
        { spaces: 2 }
    );

    console.log('✅ AI Dashboard Report Generated');

}

generateReport();