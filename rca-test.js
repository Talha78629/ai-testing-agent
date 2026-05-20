const { chromium } =
require('playwright');

const fs =
require('fs-extra');

const {
    analyzeRootCause
} = require('./rca-agent');

async function runRCA() {

    const browser =
    await chromium.launch({
        headless: false
    });

    const page =
    await browser.newPage();

    const consoleLogs = [];

    const networkFailures = [];

    // Capture console logs
    page.on(
        'console',
        msg => {

            consoleLogs.push({
                type: msg.type(),
                text: msg.text()
            });

        }
    );

    // Capture failed APIs
    page.on(
        'response',
        async response => {

            if (
                response.status() >= 400
            ) {

                networkFailures.push({

                    url:
                    response.url(),

                    status:
                    response.status()

                });

            }

        }
    );

    try {

        await page.goto(
'https://practicetestautomation.com/practice-test-login/'
        );

        // Intentional failure
        await page.click(
            '#wrong-button',
            {
                timeout: 2000
            }
        );

    } catch (error) {

        console.log(
            '\n❌ Failure captured'
        );

        // Screenshot
        await page.screenshot({
            path: 'rca-failure.png'
        });

        // Simulated screenshot AI
        const screenshotAnalysis = {

            issue:
            'Submit button not visible'

        };

        // Previous failures
        const previousFailures = [

            'Selector timeout',
            'Login button missing'
        ];

        // RCA AI
        const result =
        await analyzeRootCause({

            error:
            error.message,

            consoleLogs,

            networkFailures,

            screenshotAnalysis,

            previousFailures

        });

        console.log(
            '\n🤖 ROOT CAUSE ANALYSIS:\n'
        );

        console.log(result);

        // Save report
        await fs.writeJson(
            'rca-report.json',
            result,
            { spaces: 2 }
        );

        console.log(
            '\n✅ rca-report.json saved'
        );

    }

    await browser.close();

}

runRCA();