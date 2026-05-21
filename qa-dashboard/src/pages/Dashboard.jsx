import {
    useEffect,
    useState
} from 'react'

import {
    Activity,
    Bug,
    CheckCircle,
    ShieldAlert
} from 'lucide-react'

import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

function Dashboard() {

  const [analytics, setAnalytics] =
    useState({
      totalTests: 0,
      passed: 0,
      failed: 0,
      healed: 0,
      failureTypes: []
    })

  const [chartData, setChartData] =
    useState([])

  useEffect(() => {

    const loadDashboard = () => {

      fetch(
        '/analytics.json?t='
        + Date.now()
      )
        .then(res => res.json())
        .then(data => {

          setAnalytics(data)

          // Generate chart data dynamically
          const transformed =
            data.failureTypes.map(
              (item, index) => ({
                run: index + 1,
                failures: index + 1
              })
            )

          setChartData(transformed)

        })

    }

    loadDashboard()

    const interval =
      setInterval(
        loadDashboard,
        2000
      )

    return () =>
      clearInterval(interval)

  }, [])

  // Automation health %
  const health =
    analytics.totalTests > 0
      ? Math.round(
          (analytics.passed
            / analytics.totalTests)
          * 100
        )
      : 100

  return (

    <div>

      <h1 className="page-title">
        📊 AI QA Dashboard
      </h1>

      <div className="stats-grid">

        <div className="stat-card">
          <Bug size={40} />
          <h2>{analytics.failed}</h2>
          <p>Total Failures</p>
        </div>

        <div className="stat-card">
          <ShieldAlert size={40} />
          <h2>{analytics.healed}</h2>
          <p>AI Healed Tests</p>
        </div>

        <div className="stat-card">
          <Activity size={40} />
          <h2>{health}%</h2>
          <p>Automation Health</p>
        </div>

        <div className="stat-card">
          <CheckCircle size={40} />
          <h2>{analytics.passed}</h2>
          <p>Passed Tests</p>
        </div>

      </div>

      <div className="chart-container">

        <h2>📈 Failure Trends</h2>

        <LineChart
          width={900}
          height={350}
          data={chartData}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="run" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="failures"
            stroke="#00ff99"
            strokeWidth={4}
          />

        </LineChart>

      </div>

    </div>

  )

}

export default Dashboard