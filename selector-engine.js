const fs = require('fs-extra');

async function generateSmartSelectors() {

    const domMap =
        await fs.readJson('dom-map.json');

    const smartSelectors = {
        buttons: [],
        inputs: []
    };

    // Generate button selectors
    for (const button of domMap.buttons) {

        let selector = null;

        // BEST: getByRole
        if (button.text) {

            selector = {
                strategy: 'getByRole',
                locator:
`page.getByRole('button', { name: '${button.text}' })`
            };

        }
        // FALLBACK: id
        else if (button.id) {

            selector = {
                strategy: 'id',
                locator:
`page.locator('#${button.id}')`
            };

        }

        smartSelectors.buttons.push({
            original: button,
            smartLocator: selector
        });

    }

    // Generate input selectors
    for (const input of domMap.inputs) {

        let selector = null;

        // BEST: placeholder
        if (input.placeholder) {

            selector = {
                strategy: 'placeholder',
                locator:
`page.getByPlaceholder('${input.placeholder}')`
            };

        }
        // SECOND: label/name
        else if (input.name) {

            selector = {
                strategy: 'name',
                locator:
`page.locator('[name="${input.name}"]')`
            };

        }
        // FALLBACK: id
        else if (input.id) {

            selector = {
                strategy: 'id',
                locator:
`page.locator('#${input.id}')`
            };

        }

        smartSelectors.inputs.push({
            original: input,
            smartLocator: selector
        });

    }

    await fs.writeJson(
        'smart-selectors.json',
        smartSelectors,
        { spaces: 2 }
    );

    console.log(
        '\n✅ smart-selectors.json generated'
    );

}

generateSmartSelectors();