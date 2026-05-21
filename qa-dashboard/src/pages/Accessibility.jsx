function Accessibility() {

  return (

    <div>

      <h1 className="page-title">
        ♿ Accessibility Monitoring
      </h1>

      <table className="issue-table">

        <thead>

          <tr>
            <th>Issue</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          <tr>
            <td>Missing alt text</td>
            <td>High</td>
            <td>Open</td>
          </tr>

          <tr>
            <td>Low contrast ratio</td>
            <td>Medium</td>
            <td>Open</td>
          </tr>

          <tr>
            <td>Missing form label</td>
            <td>Critical</td>
            <td>Open</td>
          </tr>

        </tbody>

      </table>

    </div>

  )
}

export default Accessibility