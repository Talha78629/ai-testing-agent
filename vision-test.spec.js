const { test } =
require('@playwright/test');

const fs = require('fs-extra');

const {
    analyzeScreenshot
} = require('./vision-ai-agent');

test.setTimeout(60000);

test(
    'Vision AI Test',
    async ({ page }) => {

        await page.goto(
'https://practicetestautomation.com/practice-test-login/'
        );

        // Take screenshot
        await page.screenshot({
            path: 'ui-screenshot.png',
            fullPage: true
        });

        console.log(
            '\n📸 Screenshot captured'
        );

        // Analyze screenshot
        const result =
            await analyzeScreenshot(
                'ui-screenshot.png'
            );

        console.log(
            '\n🤖 Vision AI Result:\n'
        );

        console.log(result);

        // Save report
        await fs.writeJson(
            'vision-report.json',
            result,
            { spaces: 2 }
        );

        console.log(
            '\n✅ vision-report.json saved'
        );

    }
);