const {
  askOpenAI
} = require('../services/openaiService')

async function generateRCA(req, res) {

  try {

    const { error } = req.body

    const prompt = `
You are an expert QA engineer.

Analyze this automation failure:

${error}

Provide:
1. Root cause
2. Fix suggestion
3. Severity
`

    const result =
      await askOpenAI(prompt)

    res.json({
      success: true,
      analysis: result
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

}

module.exports = {
  generateRCA
}