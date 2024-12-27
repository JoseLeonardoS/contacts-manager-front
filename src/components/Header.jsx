import { Link } from "react-router-dom"
import LoginConponent from "./LoginConponent"
import { useState } from "react"

function Header() {

  const [warning, setWarning] = useState(true)

  return (
    <header>
      {
        warning ? <div className="warning">
          <div>Warning: This site's data will be deleted after a few minutes of inactivity.</div>
          <i className="bx bx-x close" onClick={() => setWarning(false)}></i>
        </div>
          : null
      }
      <LoginConponent />
    </header>
  )
}

export default Header
