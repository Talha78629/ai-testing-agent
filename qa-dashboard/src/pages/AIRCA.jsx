import {
    useState
} from 'react'

import {
    getRCA
} from '../api/aiApi'

function AIRCA() {

  const [loading, setLoading] =
    useState(false)

  const [analysis, setAnalysis] =
    useState('')

  async function analyzeFailure() {

    try {

      setLoading(true)

      const response =
        await getRCA(
          'Login button selector not found after deployment'
        )

      setAnalysis(
        response.analysis
      )

    } catch (err) {

      setAnalysis(
        'AI analysis failed'
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div>

      <h1 className="page-title">
        🤖 AI Root Cause Analysis
      </h1>

      <button
        className="analyze-btn"
        onClick={analyzeFailure}
      >

        {
          loading
            ? 'Analyzing...'
            : 'Run AI RCA'
        }

      </button>

      {

        analysis && (

          <div className="analysis-box">

            <pre>
              {analysis}
            </pre>

          </div>

        )

      }

    </div>

  )
}

export default AIRCA