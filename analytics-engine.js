const fs = require('fs-extra')

const analyticsPath =
  './qa-dashboard/public/analytics.json'

async function updateAnalytics(data) {

  let analytics = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    healed: 0,
    failureTypes: []
  }

  try {

    analytics =
      await fs.readJson(
        analyticsPath
      )

  } catch {}

  analytics.totalTests += 1

  if (data.status === 'passed') {
    analytics.passed += 1
  }

  if (data.status === 'failed') {
    analytics.failed += 1
  }

  if (data.healed) {
    analytics.healed += 1
  }

  analytics.failureTypes.push({
    type: data.failureType,
    time: new Date()
      .toLocaleTimeString()
  })

  await fs.writeJson(
    analyticsPath,
    analytics,
    { spaces: 2 }
  )

}

module.exports = {
  updateAnalytics
}