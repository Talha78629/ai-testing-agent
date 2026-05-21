import { useEffect, useState } from 'react'
import './App.css'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

function App() {

  const [report, setReport] = useState({
    accessibilityIssues: 0,
    rcaFailures: 0,
    aiSummary: '',
    history: [],
    screenshots: []
  })

  useEffect(() => {

    const loadData = () => {

      fetch('/report.json?t=' + Date.now())
        .then(res => res.json())
        .then(data => {
          setReport(data)
        })

    }

    loadData()

    const interval = setInterval(loadData, 3000)

    return () => clearInterval(interval)

  }, [])

  const downloadPDF = async () => {

    const input = document.body

    const canvas =
      await html2canvas(input)

    const imgData =
      canvas.toDataURL('image/png')

    const pdf =
      new jsPDF('p', 'mm', 'a4')

    const pdfWidth =
      pdf.internal.pageSize.getWidth()

    const pdfHeight =
      (canvas.height * pdfWidth)
      / canvas.width

    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      pdfWidth,
      pdfHeight
    )

    pdf.save('AI-QA-Report.pdf')

  }

  return (

    <div className="container">

      <h1>🚀 AI QA Dashboard</h1>

      <button
        className="download-btn"
        onClick={downloadPDF}
      >
        📄 Download PDF Report
      </button>

      <div className="cards">

        <div className="card">
          <h2>Accessibility Issues</h2>
          <p>{report.accessibilityIssues}</p>
        </div>

        <div className="card">
          <h2>RCA Failures</h2>
          <p>{report.rcaFailures}</p>
        </div>

      </div>

      <div className="ai-card">

        <h2>🤖 AI Root Cause Analysis</h2>

        <p>{report.aiSummary}</p>

      </div>

      <div className="gallery-card">

        <h2>📸 Failed Test Screenshots</h2>

        <div className="gallery">

          {
            report.screenshots.map((img, index) => (

              <img
                key={index}
                src={img}
                alt="failure"
              />

            ))
          }

        </div>

      </div>

      <div className="chart-card">

        <h2>📊 Failure Trend</h2>

        <LineChart
          width={700}
          height={300}
          data={report.history}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="failures"
            stroke="#00ff99"
            strokeWidth={3}
          />

        </LineChart>

      </div>

    </div>

  )
}

export default App