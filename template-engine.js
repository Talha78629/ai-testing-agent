const fs = require('fs-extra');

async function generatePlaywrightFromPlan() {

    const plan =
        await fs.readJson(
            'automation-plan.json'
        );

    let finalCode = `
const { test, expect } =
require('@playwright/test');

`;

    for (const testCase of plan) {

        finalCode += `
test('${testCase.testName}', async ({ page }) => {
`;

        for (const step of testCase.steps) {

            switch (step.action) {

                case 'goto':

                    finalCode += `
    await page.goto('${step.url}');
`;

                    break;

                case 'fill':

                    finalCode += `
    await page.fill(
        '${step.selector}',
        '${step.value}'
    );
`;

                    break;

                case 'click':

                    finalCode += `
    await page.click(
        '${step.selector}'
    );
`;

                    break;

                case 'assertUrl':

                    finalCode += `
    await expect(page)
        .toHaveURL(
            '${step.value}'
        );
`;

                    break;

                case 'assertText':

                    finalCode += `
    await expect(
        page.locator('${step.selector}')
    ).toContainText(
        '${step.value}'
    );
`;

                    break;

                default:

                    console.log(
                        'Unknown action:',
                        step.action
                    );

            }

        }

        finalCode += `
});
`;

    }

    await fs.ensureDir('template-tests');

    await fs.writeFile(
        'template-tests/generated.spec.js',
        finalCode
    );

    console.log(
        '\n✅ Template Playwright test generated'
    );

}

generatePlaywrightFromPlan();