async function smartClick(page, selectors) {

    for (const item of selectors) {

        try {

            console.log(
                `Trying selector:`,
                item
            );

            // ROLE SELECTOR
            if (item.strategy === 'role') {

                const locator =
                    page.getByRole(
                        item.role,
                        {
                            name: item.name
                        }
                    );

                await locator.waitFor({
                    state: 'visible',
                    timeout: 5000
                });

                await locator.click();

                console.log(
                    `✅ Success with role selector`
                );

                return;
            }

            // CSS SELECTOR
            if (item.strategy === 'css') {

                const locator =
                    page.locator(item.selector);

                await locator.waitFor({
                    state: 'visible',
                    timeout: 5000
                });

                await locator.click();

                console.log(
                    `✅ Success with css selector`
                );

                return;
            }

        } catch (error) {

            console.log(
                `❌ Failed`,
                error.message
            );

        }

    }

    throw new Error(
        'All selectors failed'
    );

}

module.exports = {
    smartClick
};