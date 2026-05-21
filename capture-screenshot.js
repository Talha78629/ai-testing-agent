const { chromium } =
require('playwright');

(async() => {

    const browser =
    await chromium.launch();

    const page =
    await browser.newPage();

    await page.goto(
        'https://practicetestautomation.com/practice-test-login/'
    );

    await page.screenshot({

        path:
        'screenshots/login-page.png',

        fullPage: true

    });

    console.log(
        '📸 Screenshot captured'
    );

    await browser.close();

})();