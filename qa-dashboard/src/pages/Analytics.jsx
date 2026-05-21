import {
  useEffect,
  useState
} from 'react'

function Analytics() {

  const [data, setData] =
    useState(null)

  useEffect(() => {

    const loadAnalytics = () => {

      fetch(
        '/analytics.json?t='
        + Date.now()
      )
        .then(res => res.json())
        .then(setData)

    }

    loadAnalytics()

    const interval =
      setInterval(
        loadAnalytics,
        2000
      )

    return () =>
      clearInterval(interval)

  }, [])

  if (!data) {
    return <h2>Loading...</h2>
  }

  return (

    <div>

      <h1 className="page-title">
        📊 AI Analytics
      </h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>Total Tests</h2>
          <p>{data.totalTests}</p>
        </div>

        <div className="stat-card">
          <h2>Passed</h2>
          <p>{data.passed}</p>
        </div>

        <div className="stat-card">
          <h2>Failed</h2>
          <p>{data.failed}</p>
        </div>

        <div className="stat-card">
          <h2>AI Healed</h2>
          <p>{data.healed}</p>
        </div>

      </div>

      <div className="table-card">

        <h2>Failure Types</h2>

        <table>

          <thead>
            <tr>
              <th>Type</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>

            {
              data.failureTypes.map(
                (item, index) => (

                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.time}</td>
                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Analytics