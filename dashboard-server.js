const express =
require('express');

const cors =
require('cors');

const fs =
require('fs-extra');

const app =
express();

app.use(cors());

app.use(
    '/screenshots',
    express.static('screenshots')
);

app.get(
    '/reports',
    async (req, res) => {

        const reports = {};

        const files = [

            'accessibility-report.json',
            'rca-report.json'

        ];

        for (const file of files) {

            const exists =
            await fs.pathExists(file);

            if (exists) {

                reports[file] =
                await fs.readJson(file);

            }

        }

        res.json(reports);

    }
);

app.listen(
    5000,
    () => {

        console.log(
            '🚀 Dashboard API running on port 5000'
        );

    }
);
