const { test } =
require('@playwright/test');

const fs = require('fs-extra');

const {
    debugFailure
} = require('./ai-debugger');

test.setTimeout(60000);

test(
    'AI Debugging Test',
    async ({ page }) => {

        const testCode =
`
await page.goto(
'https://practicetestautomation.com/practice-test-login/'
);

await page.click('#wrong-button');
`;

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
                '\n❌ Test Failed'
            );

            // Screenshot
            await page.screenshot({
                path: 'failure.png'
            });

            console.log(
                '\n📸 Screenshot saved'
            );

            // AI debugging
            const debugResult =
                await debugFailure(
                    error.message,
                    testCode
                );

            console.log(
                '\n🤖 AI DEBUG RESULT:\n'
            );

            console.log(debugResult);

            // Save AI analysis
            await fs.writeJson(
                'debug-report.json',
                debugResult,
                { spaces: 2 }
            );

            console.log(
                '\n✅ debug-report.json saved'
            );

        }

    }
);