async function testKeyboardNavigation(
    page
) {

    const issues = [];

    // TAB navigation
    for (let i = 0; i < 10; i++) {

        await page.keyboard.press(
            'Tab'
        );

        const focused =
        await page.evaluate(() => {

            return document
            .activeElement
            ?.outerHTML;

        });

        if (!focused) {

            issues.push({
                type:
                'Keyboard Navigation',

                issue:
                'No focusable element'
            });

        }

    }

    return issues;

}

module.exports = {
    testKeyboardNavigation
};