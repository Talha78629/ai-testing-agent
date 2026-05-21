const { test } =
require('@playwright/test')

test.setTimeout(60000)
const {
  updateAnalytics
} = require('./analytics-engine')
const {
  addLog
} = require('./logger')

const {
  aiHealSelector
} = require('./ai-healing-engine')

test(
  'AI Healing Test',

  async ({ page }) => {

    await addLog(
      'Starting AI Healing Test'
    )

await page.goto(
  'https://practicetestautomation.com/practice-test-login/',
  {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  }
)

await page.waitForTimeout(3000)

    await addLog(
      'Opened Login Page'
    )

    const failedSelector =
      '#wrong-submit'

    try {

      await addLog(
        `Trying selector: ${failedSelector}`
      )

      // Intentional failure
      await page.locator(
        failedSelector
      ).click({
        timeout: 2000
      })

    } catch (error) {

      console.log(
        '\n❌ Selector failed'
      )
await page.screenshot({
    path:
      './qa-dashboard/public/screenshots/login-failure.png',
    fullPage: true
  })

      await addLog(
        'Primary selector failed'
      )

      // Capture DOM
      const html =
        await page.content()

      await addLog(
        'Captured page DOM'
      )

      // AI healing
      const healed =
        await aiHealSelector(
          failedSelector,
          html
        )

      console.log(
        '\n🤖 AI Suggested:',
        healed
      )

      await addLog(
        `AI suggested selector: ${healed.selector}`
      )

      // Retry using healed selector
      await page.locator(
        healed.selector
      ).click({
        timeout: 5000
      })

      console.log(
        '\n✅ AI healing successful'
      )

      await addLog(
        'AI healing successful'
      )
      await updateAnalytics({
  status: 'passed',
  healed: true,
  failureType: 'Broken Selector'
})

    }

  }
)