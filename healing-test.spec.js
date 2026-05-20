const { test } =
require('@playwright/test');

const {
    smartClick
} = require('./self-healing-engine');

test(
    'Self Healing Selector Test',
    async ({ page }) => {

        await page.goto(
'https://practicetestautomation.com/practice-test-login/'
        );

        const selectors = [

            // wrong selector intentionally
            {
                strategy: 'css',
                selector: '#wrong-submit'
            },

            // valid css fallback
            {
                strategy: 'css',
                selector: '#submit'
            },

            // accessibility fallback
            {
                strategy: 'role',
                role: 'button',
                name: 'Submit'
            }

        ];

        await smartClick(
            page,
            selectors
        );

    }
);