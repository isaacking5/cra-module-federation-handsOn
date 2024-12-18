import React from "react"
import { createBrowserHistory } from "history"
import { Router, Switch, Route } from "react-router"
// import RemoteApp from "firstRemoteEntry/App"
import NxtmockApp from "NxtmockPlatform/EnhancedApp"

const history = createBrowserHistory()
function App() {
  return (
    <>
      <h1>Host App</h1>
      {/* <RemoteApp /> */}
      <Router history={history}>
        <Switch>
          <Route exact path="/interview/:interview_id" component={NxtmockApp} />
          <Route path="/" component={NxtmockApp} />
        </Switch>
      </Router>
    </>
  )
}

export default App
