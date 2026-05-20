const { test } =
require('@playwright/test');

const fs = require('fs-extra');

const {
    compareScreenshots
} = require('./visual-regression-agent');

test.setTimeout(60000);

test(
    'Visual Regression AI Test',
    async ({ page }) => {

        // BASELINE
        await page.goto(
'https://practicetestautomation.com/practice-test-login/'
        );

        await page.screenshot({
            path: 'baseline.png',
            fullPage: true
        });

        console.log(
            '\n📸 Baseline screenshot captured'
        );

        // Simulate UI change
        await page.evaluate(() => {

            const button =
                document.querySelector(
                    '#submit'
                );

            if (button) {

                button.style.display =
                    'none';

            }

        });

        // NEW screenshot
        await page.screenshot({
            path: 'updated.png',
            fullPage: true
        });

        console.log(
            '\n📸 Updated screenshot captured'
        );

        // AI comparison
        const result =
            await compareScreenshots(
                'baseline.png',
                'updated.png'
            );

        console.log(
            '\n🤖 Regression Analysis:\n'
        );

        console.log(result);

        // Save report
        await fs.writeJson(
            'visual-regression-report.json',
            result,
            { spaces: 2 }
        );

        console.log(
            '\n✅ visual-regression-report.json saved'
        );

    }
);