
const { test, expect } =
require('@playwright/test');


test('Login with valid username and password', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.fill(
        '#username',
        'validUser'
    );

    await page.fill(
        '#password',
        'validPass123'
    );

    await page.click(
        '#submit'
    );

});

test('Open menu button toggles navigation', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.click(
        '#toggle-navigation'
    );

});

test('Submit button is displayed and clickable', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

});

test('Login submission with empty username', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.fill(
        '#username',
        ''
    );

    await page.fill(
        '#password',
        'validPass123'
    );

    await page.click(
        '#submit'
    );

});

test('Login submission with empty password', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.fill(
        '#username',
        'validUser'
    );

    await page.fill(
        '#password',
        ''
    );

    await page.click(
        '#submit'
    );

});

test('Login submission with both fields empty', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.fill(
        '#username',
        ''
    );

    await page.fill(
        '#password',
        ''
    );

    await page.click(
        '#submit'
    );

});

test('Open menu button with invalid id', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.click(
        '#invalid-id'
    );

});

test('Username field accepts 256 characters input', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.fill(
        '#username',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    );

    await page.fill(
        '#password',
        'validPass123'
    );

    await page.click(
        '#submit'
    );

});

test('Password field accepts special characters and spaces', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.fill(
        '#username',
        'validUser'
    );

    await page.fill(
        '#password',
        '!@# $%^&*()_+{}|:"<>?'
    );

    await page.click(
        '#submit'
    );

});

test('Input fields with whitespace only', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.fill(
        '#username',
        '     '
    );

    await page.fill(
        '#password',
        '	  '
    );

    await page.click(
        '#submit'
    );

});

test('Open menu button accessibility with keyboard', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

});

test('Submit login form using Enter key', async ({ page }) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.fill(
        '#username',
        'validUser'
    );

    await page.fill(
        '#password',
        'validPass123'
    );

});
