const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

app.get('/api/results', (req, res) => {

    try {

        const accessibility =
            JSON.parse(
                fs.readFileSync(
                    './accessibility-report.json',
                    'utf-8'
                )
            );

        const rca =
            JSON.parse(
                fs.readFileSync(
                    './rca-report.json',
                    'utf-8'
                )
            );

        res.json({
            accessibilityIssues:
                accessibility.violations?.length || 0,

            rcaFailures:
                rca.failures?.length || 0
        });

    } catch (error) {

        res.json({
            accessibilityIssues: 0,
            rcaFailures: 0
        });

    }

});

app.listen(5000, () => {
    console.log('✅ Backend running on port 5000');
});