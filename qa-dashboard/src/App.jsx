import './App.css'

import {
  BrowserRouter,
  Link,
  Route,
  Routes
} from 'react-router-dom'

import Accessibility from './pages/Accessibility'
import AIRCA from './pages/AIRCA'
import Analytics from './pages/Analytics'
import Dashboard from './pages/Dashboard'
import ExecutionLogs from './pages/ExecutionLogs'
import Reports from './pages/Reports'
import VisualTesting from './pages/VisualTesting'
function App() {

  return (

    <BrowserRouter>

      <div className="dashboard">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <h2>🤖 AI QA</h2>

          <ul>

            <li>
              <Link to="/">Dashboard</Link>
            </li>

            <li>
              <Link to="/ai-rca">AI RCA</Link>
            </li>
<li>
  <Link to="/logs">
    📜 Execution Logs
  </Link>
</li>
            <li>
              <Link to="/visual-testing">
                Visual Testing
              </Link>
            </li>
<li>
  <Link to="/analytics">
    Analytics
  </Link>
</li>
            <li>
              <Link to="/accessibility">
                Accessibility
              </Link>
            </li>

            <li>
              <Link to="/reports">
                Reports
              </Link>
            </li>

          </ul>

        </aside>

        {/* MAIN */}

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />
<Route
  path="/logs"
  element={<ExecutionLogs />}
/>
            <Route
              path="/ai-rca"
              element={<AIRCA />}
            />

            <Route
              path="/visual-testing"
              element={<VisualTesting />}
            />

            <Route
              path="/accessibility"
              element={<Accessibility />}
            />
<Route
  path="/analytics"
  element={<Analytics />}
/>
            <Route
              path="/reports"
              element={<Reports />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>

  )
}

export default App