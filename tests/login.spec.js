const { test, expect } = require('@playwright/test');

const LoginPage =
    require('../pages/LoginPage');

test('Valid Login Test', async ({ page }) => {

    const loginPage =
        new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        'student',
        'Password123'
    );

    await expect(page)
        .toHaveURL(
            'https://practicetestautomation.com/logged-in-successfully/'
        );

});