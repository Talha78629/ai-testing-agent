const { chromium } =
require('playwright');

const fs =
require('fs-extra');

const {
    generateApiTests
} = require('./api-agent');

async function runApiAgent() {

    const browser =
    await chromium.launch({
        headless: false
    });

    const page =
    await browser.newPage();

    const capturedApis = [];

    // Capture API traffic
    page.on(
        'response',
        async response => {

            const url =
            response.url();

            const status =
            response.status();

            const method =
            response.request().method();

            // Filter API calls
            if (
                url.includes('/api') ||
                url.includes('json')
            ) {

                let body = '';

                try {

                    body =
                    await response.text();

                } catch {}

                capturedApis.push({

                    url,

                    method,

                    status,

                    body:
                    body.slice(0, 500)

                });

            }

        }
    );

    // Open site
    await page.goto(
'https://jsonplaceholder.typicode.com/'
    );

    // Trigger API request
    const apiResponse =
    await page.evaluate(async () => {

        const response =
        await fetch(
'https://jsonplaceholder.typicode.com/posts/1'
        );

        return await response.json();

    });

    console.log(
        '\n✅ API Triggered'
    );

    console.log(apiResponse);

    // Wait for network capture
    await page.waitForTimeout(
        3000
    );

    console.log(
        '\n📡 CAPTURED APIs:\n'
    );

    console.log(capturedApis);

    // Generate AI API tests
    const aiTests =
    await generateApiTests(
        capturedApis
    );

    console.log(
        '\n🤖 AI GENERATED API TESTS:\n'
    );

    console.log(aiTests);

    // Save report
    await fs.writeJson(
        'api-test-report.json',
        aiTests,
        { spaces: 2 }
    );

    console.log(
        '\n✅ api-test-report.json saved'
    );

    await browser.close();

}

runApiAgent();