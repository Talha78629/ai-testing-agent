const fs =
require('fs-extra');

const MEMORY_FILE =
'agent-memory.json';

// Load memory
async function loadMemory() {

    const exists =
    await fs.pathExists(
        MEMORY_FILE
    );

    if (!exists) {

        return {
            selectors: [],
            failures: [],
            flows: []
        };

    }

    return await fs.readJson(
        MEMORY_FILE
    );

}

// Save memory
async function saveMemory(
    memory
) {

    await fs.writeJson(
        MEMORY_FILE,
        memory,
        { spaces: 2 }
    );

}

// Store healed selector
async function rememberSelector(
    failedSelector,
    healedSelector
) {

    const memory =
    await loadMemory();

    const existing =
    memory.selectors.find(
        s =>
        s.failedSelector ===
        failedSelector
    );

    if (existing) {

        existing.healedSelector =
        healedSelector;

        existing.successCount += 1;

    } else {

        memory.selectors.push({

            failedSelector,

            healedSelector,

            successCount: 1

        });

    }

    await saveMemory(memory);

}

// Retrieve learned selector
async function getLearnedSelector(
    failedSelector
) {

    const memory =
    await loadMemory();

    return memory.selectors.find(
        s =>
        s.failedSelector ===
        failedSelector
    );

}

// Store failures
async function rememberFailure(
    error
) {

    const memory =
    await loadMemory();

    memory.failures.push({

        timestamp:
        new Date(),

        error

    });

    await saveMemory(memory);

}

module.exports = {

    rememberSelector,

    getLearnedSelector,

    rememberFailure,

    loadMemory

};