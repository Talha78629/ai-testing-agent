import { useEffect, useState } from 'react'

function ExecutionLogs() {

  const [logs, setLogs] = useState([])

  useEffect(() => {

    const loadLogs = () => {

      fetch('/logs.json?t=' + Date.now())

        .then(res => res.json())

        .then(data => {

          setLogs(data)

        })

    }

    loadLogs()

    const interval =
      setInterval(loadLogs, 2000)

    return () =>
      clearInterval(interval)

  }, [])

  return (

    <div>

      <h1 className="page-title">
        📜 Live Execution Logs
      </h1>

      <div className="logs-container">

        {
          logs.map((log, index) => (

            <div
              key={index}
              className="log-line"
            >

              [{log.time}] {log.message}

            </div>

          ))
        }

      </div>

    </div>

  )
}

export default ExecutionLogs