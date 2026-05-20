const { chromium } =
require('playwright');

const {

    rememberSelector,

    getLearnedSelector,

    rememberFailure

} = require(
    './memory-agent'
);
const fs =
require('fs-extra');

// Agents
const {
    aiHealSelector
} = require(
    './agents/ai-healing-engine'
);

const {
    debugFailure
} = require(
    './agents/ai-debugger'
);

const {
    analyzeScreenshot
} = require(
    './agents/vision-ai-agent'
);

const {
    compareScreenshots
} = require(
    './agents/visual-regression-agent'
);

async function runAutonomousQA() {

    const browser =
        await chromium.launch({
            headless: false
        });

    const page =
        await browser.newPage();

    try {

        console.log(
            '\n🚀 Starting Autonomous QA'
        );

        // STEP 1
        await page.goto(
'https://practicetestautomation.com/practice-test-login/'
        );

        // STEP 2
        console.log(
            '\n📸 Capturing baseline'
        );

        await page.screenshot({
            path: 'baseline.png',
            fullPage: true
        });

        // STEP 3
        console.log(
            '\n🧪 Running failing action'
        );

        try {

            const failedSelector =
'#wrong-submit';

// Check memory first
const learned =
await getLearnedSelector(
    failedSelector
);

if (learned) {

    console.log(
        '\n🧠 Memory found:',
        learned
    );

    await page.click(
        learned.healedSelector
    );

} else {

    try {

        await page.click(
            failedSelector,
            {
                timeout: 2000
            }
        );

    } catch (error) {

        console.log(
            '\n❌ Action failed'
        );

        const html =
        await page.content();

        // AI healing
        const healed =
        await aiHealSelector(
            failedSelector,
            html
        );

        console.log(
            '\n🤖 AI Healed:',
            healed
        );

        // SAVE LEARNING
        await rememberSelector(
            failedSelector,
            healed.selector
        );

        console.log(
            '\n🧠 Memory updated'
        );

        // Retry
        await page.click(
            healed.selector
        );

    }

}

        } catch (error) {

            await rememberFailure(
    error.message
);
            console.log(
                '\n❌ Action failed'
            );

            // STEP 4
            console.log(
                '\n🤖 Triggering AI Healing'
            );

            const html =
                await page.content();

            const healed =
                await aiHealSelector(
                    '#wrong-submit',
                    html
                );

            console.log(
                '\n✅ Healed Selector:',
                healed
            );

            // STEP 5
            console.log(
                '\n🔁 Retrying with healed selector'
            );

            await page.click(
                healed.selector
            );

        }

        // STEP 6
        console.log(
            '\n📸 Capturing updated UI'
        );

        await page.screenshot({
            path: 'updated.png',
            fullPage: true
        });

        // STEP 7
        console.log(
            '\n👁️ Running Vision AI'
        );

        const visionResult =
            await analyzeScreenshot(
                'updated.png'
            );

        console.log(
            '\n🤖 Vision Result:',
            visionResult
        );

        // STEP 8
        console.log(
            '\n🔍 Running Visual Regression'
        );

        const regressionResult =
            await compareScreenshots(
                'baseline.png',
                'updated.png'
            );

        console.log(
            '\n🤖 Regression Result:',
            regressionResult
        );

        // STEP 9
        console.log(
            '\n💾 Saving report'
        );

        const finalReport = {

            timestamp:
                new Date(),

            visionResult,

            regressionResult

        };

        await fs.writeJson(
            'final-report.json',
            finalReport,
            { spaces: 2 }
        );

        console.log(
            '\n✅ final-report.json saved'
        );

    } catch (error) {

        console.log(
            '\n❌ SYSTEM FAILURE'
        );

        console.log(error);

        // AI debugging
        const debugResult =
            await debugFailure(
                error.message,
                'Autonomous QA Flow'
            );

        console.log(
            '\n🤖 AI DEBUG:',
            debugResult
        );

    }

    await browser.close();

}

runAutonomousQA();