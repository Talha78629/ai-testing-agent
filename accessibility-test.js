const { chromium } =
require('playwright');

const fs =
require('fs-extra');

const axeSource =
require('axe-core').source;

const {
    analyzeAccessibility
} = require(
    './accessibility-agent'
);

async function runAccessibilityTest() {

    const browser =
    await chromium.launch({
        headless: false
    });

    const page =
    await browser.newPage();

    await page.goto(
'https://practicetestautomation.com/practice-test-login/'
    );

    // Inject axe-core
    await page.addScriptTag({
        content: axeSource
    });

    // Run accessibility scan
    const results =
    await page.evaluate(async () => {

        return await axe.run();

    });

    console.log(
        '\n♿ ACCESSIBILITY VIOLATIONS:\n'
    );

    console.log(
        results.violations
    );

    // AI analysis
    const aiAnalysis =
    await analyzeAccessibility(
        results.violations
    );

    console.log(
        '\n🤖 AI ACCESSIBILITY REPORT:\n'
    );

    console.log(aiAnalysis);

    // Save report
    await fs.writeJson(
        'accessibility-report.json',
        aiAnalysis,
        { spaces: 2 }
    );

    console.log(
        '\n✅ accessibility-report.json saved'
    );

    await browser.close();

}

runAccessibilityTest();