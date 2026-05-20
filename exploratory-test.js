const { chromium } =
require('playwright');

const fs =
require('fs-extra');

const {
    planNextAction
} = require('./exploratory-agent');

async function runExploration() {

    const browser =
    await chromium.launch({
        headless: false
    });

    const page =
    await browser.newPage();

    const history = [];

    await page.goto(
'https://practicetestautomation.com/practice-test-login/'
    );

    console.log(
        '\n🚀 AI Exploration Started'
    );

    for (let step = 1; step <= 5; step++) {

        console.log(
            `\n====================`
        );

        console.log(
            `STEP ${step}`
        );

        const html =
        await page.content();

        // AI decides next action
        const nextAction =
        await planNextAction(
            html,
            history
        );

        console.log(
            '\n🤖 AI Decision:',
            nextAction
        );

        try {

            // CLICK
            if (
                nextAction.action ===
                'click'
            ) {

                await page.click(
                    nextAction.target,
                    {
                        timeout: 3000
                    }
                );

            }

            // TYPE
            if (
                nextAction.action ===
                'type'
            ) {

                await page.fill(
                    nextAction.target,
                    'testdata'
                );

            }

            // SCREENSHOT
            await page.screenshot({
                path:
`explore-step-${step}.png`
            });

            history.push({
                step,
                success: true,
                action: nextAction
            });

            console.log(
                '\n✅ Action success'
            );

        } catch (error) {

            console.log(
                '\n❌ Action failed'
            );

            console.log(error.message);

            history.push({
                step,
                success: false,
                action: nextAction,
                error: error.message
            });

        }

    }

    // Save exploration history
    await fs.writeJson(
        'exploration-report.json',
        history,
        { spaces: 2 }
    );

    console.log(
        '\n✅ exploration-report.json saved'
    );

    await browser.close();

}

runExploration();