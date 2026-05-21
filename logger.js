const fs = require('fs-extra')

async function addLog(message) {

  const logPath =
    './qa-dashboard/public/logs.json'

  let logs = []

  try {

    logs =
      await fs.readJson(logPath)

  } catch {

    logs = []

  }

  logs.push({
    time: new Date().toLocaleTimeString(),
    message
  })

  await fs.writeJson(
    logPath,
    logs,
    { spaces: 2 }
  )

}

module.exports = {
  addLog
}