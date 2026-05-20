const { test } =
require('@playwright/test');
test.setTimeout(60000);

const {
    aiHealSelector
} = require('./ai-healing-engine');

test(
    'AI Healing Test',
    async ({ page }) => {

        await page.goto(
'https://practicetestautomation.com/practice-test-login/'
        );

        const failedSelector =
            '#wrong-submit';

        try {

            // FAST FAILURE
            await page.locator(
                failedSelector
            ).click({
                timeout: 2000
            });

        } catch (error) {

            console.log(
                '\n❌ Selector failed'
            );

            // Capture DOM immediately
            const html =
                await page.content();

            // AI healing
            const healed =
                await aiHealSelector(
                    failedSelector,
                    html
                );

            console.log(
                '\n🤖 AI Suggested:',
                healed
            );

            // Retry using healed selector
            await page.locator(
                healed.selector
            ).click({
                timeout: 5000
            });

            console.log(
                '\n✅ AI healing successful'
            );

        }

    }
);